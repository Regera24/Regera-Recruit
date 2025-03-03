package org.group5.regerarecruit.dto.request.cv;

import java.time.LocalDate;

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
public class CvCreationRequest {
    @NotNull
    String name;

    LocalDate birthDate;

    String address;

    @NotNull
    String phone;

    @NotNull
    String email;

    String exp;

    String description;

    String study;

    String linkProject;

    @NotNull
    String title;

    String img;

    String skills;
}
