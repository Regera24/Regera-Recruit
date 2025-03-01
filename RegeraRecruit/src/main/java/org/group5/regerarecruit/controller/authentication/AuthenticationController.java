package org.group5.regerarecruit.controller.authentication;

import java.text.ParseException;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.group5.regerarecruit.dto.request.authentication.*;
import org.group5.regerarecruit.dto.response.ApiResponse;
import org.group5.regerarecruit.dto.response.authentication.*;
import org.group5.regerarecruit.service.AuthenticationService;
import org.group5.regerarecruit.service.BaseRedisService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.nimbusds.jose.JOSEException;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final BaseRedisService redisService;

    @Operation(summary = "Login", description = "Login with username and password")
    @PostMapping(value = "/login")
    public ApiResponse<AuthenticationResponse> login(
            @RequestBody @Valid AuthenticationRequest authenticationRequest, HttpServletResponse response) {
        AuthenticationResponse authenticationResponse =
                authenticationService.authenticate(authenticationRequest, response);
        return ApiResponse.<AuthenticationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Login successfully")
                .data(authenticationResponse)
                .build();
    }

    @Operation(summary = "Register", description = "Register with user information")
    @PostMapping(value = "/register")
    public ApiResponse<AccountCreationResponse> register(@RequestBody @Valid AccountCreationRequest request) {
        AccountCreationResponse response = authenticationService.createAccount(request);
        return ApiResponse.<AccountCreationResponse>builder()
                .message("Created account successfully")
                .data(response)
                .code(HttpStatus.CREATED.value())
                .build();
    }

    @Operation(summary = "Logout", description = "Log out user from system")
    @PostMapping(value = "/logout")
    public ApiResponse<Void> logout(@RequestBody @Valid LogoutRequest logoutRequest, HttpServletResponse response) {
        authenticationService.logout(logoutRequest, response);
        return ApiResponse.<Void>builder()
                .message("Logout successfully")
                .code(HttpStatus.OK.value())
                .build();
    }

    @Operation(summary = "refresh-token", description = "get new access token from system")
    @PostMapping(value = "/refresh")
    public ApiResponse<AuthenticationResponse> refresh(@CookieValue(name = "refreshToken") String refreshToken) {
        AuthenticationResponse response = authenticationService.refreshToken(refreshToken);
        return ApiResponse.<AuthenticationResponse>builder()
                .code(200)
                .data(response)
                .message("Refresh token successfully")
                .build();
    }

    @Operation(summary = "Introspect", description = "Check valid JWT token ")
    @PostMapping(value = "/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody @Valid IntrospectRequest request)
            throws ParseException, JOSEException {
        IntrospectResponse res = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .code(200)
                .message("Success")
                .data(res)
                .build();
    }

    @Operation(summary = "Check Username", description = "Check if username is valid for register ")
    @GetMapping(value = "/check-username/{username}")
    public ApiResponse<Boolean> checkUsername(@PathVariable String username) {
        boolean res = authenticationService.checkUsername(username);
        return ApiResponse.<Boolean>builder()
                .message("check successfully")
                .code(HttpStatus.OK.value())
                .data(res)
                .build();
    }

    @Operation(
            summary = "Check Email and Phone",
            description = "Check if email and phone number is valid for register ")
    @PostMapping(value = "check-email-phone")
    public ApiResponse<EmailAndPhoneCheckResponse> checkEmailPhone(
            @RequestBody @Valid EmailAndPhoneCheckRequest request) {
        EmailAndPhoneCheckResponse response = authenticationService.checkEmailAndPhone(request);
        return ApiResponse.<EmailAndPhoneCheckResponse>builder()
                .message("check successfully!!")
                .code(HttpStatus.OK.value())
                .data(response)
                .build();
    }

    @Operation(summary = "Send OTP", description = "Send request to system to send OTP email ")
    @GetMapping(value = "/send-otp/{key}")
    public ApiResponse<SendOTPResponse> sendOTP(@PathVariable String key) {
        SendOTPResponse res = authenticationService.sendOTP(key);
        return ApiResponse.<SendOTPResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Send otp successfully")
                .data(res)
                .build();
    }

    @Operation(summary = "Check OTP", description = "Check if OTP is valid ")
    @PostMapping(value = "/check-otp")
    public ApiResponse<?> checkOTP(@RequestBody @Valid OTPCheckRequest request) {
        boolean res = authenticationService.checkOTP(request);
        return ApiResponse.builder()
                .code(HttpStatus.OK.value())
                .message("check successfully")
                .data(res)
                .build();
    }

    @Operation(summary = "Change Password", description = "Change Password after fill OTP ")
    @PostMapping(value = "/change-password")
    public ApiResponse<String> changePassword(@RequestBody @Valid ChangePasswordRequest request) {
        authenticationService.changePassword(request);
        return ApiResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .message("Change password successfully")
                .build();
    }

}
