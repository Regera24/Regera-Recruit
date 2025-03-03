package org.group5.regerarecruit.dto.request.authentication;

import jakarta.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePasswordRequest {
    @NotNull
    String username;

    @NotNull
    String OTP;

    @NotNull
    String newPassword;
}
