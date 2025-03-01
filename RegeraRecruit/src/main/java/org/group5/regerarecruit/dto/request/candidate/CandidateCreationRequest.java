package org.group5.regerarecruit.dto.request.candidate;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CandidateCreationRequest {
    @NotNull
    String name;

    LocalDate birthDate;

    String address;

    String avatar;
}
