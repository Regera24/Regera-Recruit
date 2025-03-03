package org.group5.regerarecruit.dto.request.authentication;

import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OTPCheckRequest {
    @NotNull
    String OTP;

    @NotNull
    String username;
}
