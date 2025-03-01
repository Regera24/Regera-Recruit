package org.group5.regerarecruit.dto.request.cv;

import java.time.LocalDate;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CvUpdateRequest {
    String name;

    LocalDate birthDate;

    String address;

    String phone;

    String email;

    String exp;

    String description;

    String study;

    String linkProject;

    String title;

    String img;

    String skills;
}
