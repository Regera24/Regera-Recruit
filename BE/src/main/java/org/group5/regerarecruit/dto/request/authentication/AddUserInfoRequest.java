package org.group5.regerarecruit.dto.request.authentication;

import jakarta.validation.constraints.NotNull;

import org.group5.regerarecruit.dto.request.candidate.CandidateCreationRequest;
import org.group5.regerarecruit.dto.request.company.CompanyCreationRequest;
import org.group5.regerarecruit.utils.custom_constraint.PhoneNumberConstraint;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddUserInfoRequest {
    @NotNull
    String password;

    @NotNull
    @PhoneNumberConstraint
    String phoneNumber;

    @NotNull
    String role;

    CandidateCreationRequest candidate;

    CompanyCreationRequest company;
}
