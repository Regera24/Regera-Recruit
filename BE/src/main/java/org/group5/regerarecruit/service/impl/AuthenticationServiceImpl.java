package org.group5.regerarecruit.service.impl;

import java.security.SecureRandom;
import java.text.ParseException;
import java.time.Instant;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

import org.group5.regerarecruit.converter.AccountConverter;
import org.group5.regerarecruit.converter.CandidateConverter;
import org.group5.regerarecruit.converter.CompanyConverter;
import org.group5.regerarecruit.dto.request.authentication.*;
import org.group5.regerarecruit.dto.response.UserInfoResponse;
import org.group5.regerarecruit.dto.response.authentication.*;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Candidate;
import org.group5.regerarecruit.entity.Company;
import org.group5.regerarecruit.enums.RoleEnum;
import org.group5.regerarecruit.enums.TokenType;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.AccountRepository;
import org.group5.regerarecruit.repository.CandidateRepository;
import org.group5.regerarecruit.repository.CompanyRepository;
import org.group5.regerarecruit.repository.client.OutboundRegeraClient;
import org.group5.regerarecruit.repository.client.UserInfoClient;
import org.group5.regerarecruit.service.AuthenticationService;
import org.group5.regerarecruit.service.RedisTokenService;
import org.group5.regerarecruit.utils.Jwt;
import org.group5.regerarecruit.utils.Mail;
import org.group5.regerarecruit.utils.ObjectUpdater;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AccountRepository accountRepository;
    private final Jwt jwt;
    private final AccountConverter accountConverter;
    private final Mail mail;
    private final ModelMapper modelMapper;
    private final ThreadPoolTaskScheduler taskScheduler;
    private final RedisTokenService redisTokenService;
    private final CompanyRepository companyRepository;
    private final CandidateRepository candidateRepository;
    private final CandidateConverter candidateConverter;
    private final CompanyConverter companyConverter;
    private final OutboundRegeraClient outboundRegeraClient;
    private final UserInfoClient userInfoClient;
    private final ObjectUpdater objectUpdater;

    @Value("${regera.outbound.client_id}")
    protected String clientId;

    @Value("${regera.outbound.client_secret}")
    protected String clientSecret;

    @Value("${regera.outbound.grant_type}")
    protected String grantType;

    @Value("${regera.outbound.redirect_uri}")
    protected String redirectUri;

    @Override
    public AuthenticationResponse authenticate(
            AuthenticationRequest authenticationRequest, HttpServletResponse response) {
        Account account = accountRepository
                .findByUsername(authenticationRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (account == null || !account.getPassword().equals(authenticationRequest.getPassword())) {
            authenticationResponse.setSuccess(false);
        } else {
            String token = jwt.generateToken(account, TokenType.ACCESS_TOKEN);
            String refreshToken = jwt.generateToken(account, TokenType.REFRESH_TOKEN);
            account.setRefreshToken(refreshToken);
            accountRepository.save(account);

            Cookie cookie = new Cookie("refreshToken", refreshToken);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setDomain("localhost");
            cookie.setPath("/");
            cookie.setMaxAge(14 * 24 * 60 * 60);

            response.addCookie(cookie);

            authenticationResponse.setRefreshToken(refreshToken);
            authenticationResponse.setToken(token);
            authenticationResponse.setSuccess(true);
        }
        return authenticationResponse;
    }

    @Transactional
    @Override
    public AccountCreationResponse createAccount(AccountCreationRequest request) {
        Account acc = accountConverter.toAccountEntity(request);

        if (accountRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }
        if (accountRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        if (accountRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new AppException(ErrorCode.PHONENUMBER_EXISTED);
        }

        if (RoleEnum.valueOf(request.getRole()).equals(RoleEnum.CANDIDATE)) {
            Candidate candidate = candidateConverter.toCandidate(request.getCandidate());
            acc.setCandidate(candidateRepository.save(candidate));
        } else {
            if (request.getCompany().getWebsite() != null
                    && companyRepository.existsByWebsite(request.getCompany().getWebsite())) {
                throw new AppException(ErrorCode.WEBSITE_EXISTED);
            } else {
                Company company = companyConverter.toCompany(request.getCompany());
                acc.setCompany(companyRepository.save(company));
            }
        }
        Account a = accountRepository.save(acc);
        return modelMapper.map(a, AccountCreationResponse.class);
    }

    @Override
    public AuthenticationResponse addAccountInfo(AddUserInfoRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Account update = accountConverter.toAccountEntity(request);
        objectUpdater.updateNonNullFields(update, account);
        accountRepository.save(account);
        String accessToken = jwt.generateToken(account, TokenType.ACCESS_TOKEN);
        return AuthenticationResponse.builder().token(accessToken).success(true).build();
    }

    @Override
    public AuthenticationResponse refreshToken(String refreshToken) {
        if (!StringUtils.hasLength(refreshToken)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        try {
            SignedJWT signedJWT = jwt.verifyToken(refreshToken, TokenType.REFRESH_TOKEN);

            String username = signedJWT.getJWTClaimsSet().getSubject();
            Account account = accountRepository
                    .findByUsername(username)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            if (!StringUtils.hasLength(account.getRefreshToken())
                    || !Objects.equals(refreshToken, account.getRefreshToken()))
                throw new AppException(ErrorCode.UNAUTHORIZED);

            String accessToken = jwt.generateToken(account, TokenType.ACCESS_TOKEN);

            return AuthenticationResponse.builder()
                    .refreshToken(refreshToken)
                    .token(accessToken)
                    .success(true)
                    .build();
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }

    @Override
    public AuthenticationResponse outboundAuthenticate(String code) {
        OutboundAuthenticationResponse response = outboundRegeraClient.exchange(OutboundAuthenticationRequest.builder()
                .code(code)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .grantType(grantType)
                .redirectUri(redirectUri)
                .build());

        UserInfoResponse userInfo = userInfoClient.getUserInfo("json", response.getAccessToken());
        Account account = accountRepository
                .findByEmail(userInfo.getEmail())
                .orElseGet(() -> accountRepository.save(Account.builder()
                        .email(userInfo.getEmail())
                        .username(userInfo.getEmail())
                        .build()));

        String token = jwt.generateToken(account, TokenType.ACCESS_TOKEN);

        return AuthenticationResponse.builder().token(token).success(true).build();
    }

    @Override
    public void logout(LogoutRequest logoutRequest, HttpServletResponse response) {
        try {
            long expiredTime = jwt.extractTokenExpired(logoutRequest.getToken());
            SignedJWT signedJWT = jwt.verifyToken(logoutRequest.getToken(), TokenType.ACCESS_TOKEN);
            if (expiredTime > 0) {
                String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
                redisTokenService.setToken(jwtId, logoutRequest.getToken(), expiredTime, TimeUnit.MILLISECONDS);
            }
            String username = signedJWT.getJWTClaimsSet().getSubject();

            Account acc = accountRepository
                    .findByUsername(username)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            acc.setRefreshToken(null);
            deleteRefreshTokenCookie(response);
        } catch (Exception e) {
            log.info(e.getMessage());
        }
    }

    @Override
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        try {
            jwt.verifyToken(request.getToken(), TokenType.ACCESS_TOKEN);
        } catch (AppException e) {
            return IntrospectResponse.builder().valid(false).build();
        }
        return IntrospectResponse.builder().valid(true).build();
    }

    @Override
    public boolean checkUsername(String username) {
        return accountRepository.existsByUsername(username);
    }

    @Override
    public EmailAndPhoneCheckResponse checkEmailAndPhone(EmailAndPhoneCheckRequest request) {
        boolean isEmailValid = !accountRepository.existsByEmail(request.getEmail());
        boolean isPhoneValid = !accountRepository.existsByPhoneNumber(request.getPhone());
        return EmailAndPhoneCheckResponse.builder()
                .isEmailValid(isEmailValid)
                .isPhoneValid(isPhoneValid)
                .build();
    }

    @Override
    public SendOTPResponse sendOTP(String key) {
        boolean checkEmail = accountRepository.existsByEmail(key);
        boolean checkUsername = accountRepository.existsByUsername(key);
        if (checkEmail || checkUsername) {
            String token = generate6DigitCode();
            Account acc = null;
            if (checkEmail) {
                acc = accountRepository
                        .findByEmail(key)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
                mail.sendEmail(key, token);
            } else {
                acc = accountRepository
                        .findByUsername(key)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
                mail.sendEmail(acc.getEmail(), token);
            }
            acc.setOTP(token);
            accountRepository.save(acc);

            scheduleTokenDeletion(acc.getId());

            return SendOTPResponse.builder()
                    .email(acc.getEmail())
                    .username(acc.getUsername())
                    .isValid(true)
                    .build();
        } else {
            return SendOTPResponse.builder().isValid(false).build();
        }
    }

    @Override
    public boolean checkOTP(OTPCheckRequest request) {
        Account account = accountRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return account.getOTP().equals(request.getOTP());
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
        Account account = accountRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (account.getOTP().equals(request.getOTP())) {
            account.setPassword(request.getNewPassword());
        } else {
            throw new AppException(ErrorCode.OTP_INVALID);
        }
        account.setOTP(null);
        accountRepository.save(account);
    }

    private void scheduleTokenDeletion(Long accountID) {
        taskScheduler.schedule(
                () -> accountRepository.clearOTP(accountID), Instant.now().plusSeconds(300));
    }

    private String generate6DigitCode() {
        SecureRandom random = new SecureRandom();
        return String.format("%06d", random.nextInt(1000000));
    }

    private void deleteRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
