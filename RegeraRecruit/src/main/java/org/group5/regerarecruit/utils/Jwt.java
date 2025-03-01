package org.group5.regerarecruit.utils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.enums.TokenType;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.service.RedisTokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Jwt {
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtRefresh}")
    private String jwtRefresh;

    @Value("${app.jwtExpirationMs}")
    private long jwtExpirations;

    @Value("${app.jwtRefreshExpirationMs}")
    private long jwtRefreshExpirationMs;

    private final RedisTokenService redisTokenService;

    public String generateToken(Account account, TokenType tokenType) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        String secret = tokenType.equals(TokenType.ACCESS_TOKEN) ? jwtSecret : jwtRefresh;
        long expiredTime = tokenType.equals(TokenType.ACCESS_TOKEN) ? jwtExpirations : jwtRefreshExpirationMs;

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getUsername())
                .issuer("regerarecruit.com")
                .issueTime(new Date())
                .claim("scope", account.getRole().getCode())
                .expirationTime(new Date(
                        Instant.now().plus(expiredTime, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(secret.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.UNCATEGORIZED);
        }
    }

    public SignedJWT verifyToken(String token, TokenType tokenType) throws JOSEException, ParseException {
        String secret = tokenType.equals(TokenType.ACCESS_TOKEN) ? jwtSecret : jwtRefresh;
        JWSVerifier verifier = new MACVerifier(secret.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryDate = signedJWT.getJWTClaimsSet().getExpirationTime();

        if (!(signedJWT.verify(verifier)) && expiryDate.after(new Date()))
            throw new AppException(ErrorCode.UNAUTHORIZED);

        if (tokenType.equals(TokenType.ACCESS_TOKEN)) {
            if (redisTokenService.existsByTokenId(signedJWT.getJWTClaimsSet().getJWTID())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        return signedJWT;
    }

    public long extractTokenExpired(String token) {
        try {
            long expirationTime =
                    SignedJWT.parse(token).getJWTClaimsSet().getExpirationTime().getTime();
            long currentTime = System.currentTimeMillis();
            return Math.max(expirationTime - currentTime, 0);
        } catch (ParseException e) {
            throw new AppException(ErrorCode.UNCATEGORIZED);
        }
    }

    public String extractUsername(String token) {
        try {
            return SignedJWT.parse(token).getJWTClaimsSet().getSubject();
        } catch (ParseException e) {
            throw new AppException(ErrorCode.UNCATEGORIZED);
        }
    }
}
