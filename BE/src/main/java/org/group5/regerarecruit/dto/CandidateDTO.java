package org.group5.regerarecruit.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CandidateDTO {
    private Integer id;
    private String name;
    private String email;
    private String phoneNumber;
    private String avatar;
    private String address;
    private LocalDate birthDate;
    private List<CvDTO> cvs;
}
