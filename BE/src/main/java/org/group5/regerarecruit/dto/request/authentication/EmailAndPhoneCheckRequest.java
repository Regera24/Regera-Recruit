package org.group5.regerarecruit.dto.request.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import org.group5.regerarecruit.utils.custom_constraint.PhoneNumberConstraint;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class EmailAndPhoneCheckRequest {
    @NotNull
    @Email
    String email;

    @NotNull
    @PhoneNumberConstraint
    String phone;
}
