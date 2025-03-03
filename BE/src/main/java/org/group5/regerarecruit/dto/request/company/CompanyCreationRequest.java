package org.group5.regerarecruit.dto.request.company;

import jakarta.validation.constraints.NotNull;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyCreationRequest {
    @NotNull
    String companyName;

    @NotNull
    String address;

    String detail;

    String description;

    String img;

    String workTime;

    String website;
}
