package org.group5.regerarecruit.service;

import java.text.ParseException;

import jakarta.servlet.http.HttpServletResponse;

import org.group5.regerarecruit.dto.request.authentication.*;
import org.group5.regerarecruit.dto.response.authentication.*;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;

@Service
public interface AuthenticationService {
    public AuthenticationResponse authenticate(
            AuthenticationRequest authenticationRequest, HttpServletResponse response);

    public AccountCreationResponse createAccount(AccountCreationRequest request);

    public void logout(LogoutRequest logoutRequest, HttpServletResponse response);

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;

    public boolean checkUsername(String username);

    public EmailAndPhoneCheckResponse checkEmailAndPhone(EmailAndPhoneCheckRequest request);

    public SendOTPResponse sendOTP(String key);

    public boolean checkOTP(OTPCheckRequest request);

    public void changePassword(ChangePasswordRequest request);

    public AuthenticationResponse refreshToken(String refreshToken);
}
