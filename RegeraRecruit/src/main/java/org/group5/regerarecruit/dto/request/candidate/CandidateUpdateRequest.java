package org.group5.regerarecruit.dto.request.candidate;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class CandidateUpdateRequest {
    String name;
    LocalDate birthDate;
    String address;
    String email;
    String avatar;
    String phoneNumber;
}
