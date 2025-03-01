package org.group5.regerarecruit.dto.response;

import java.util.List;

import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.ReviewDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyResponse {
    private Integer id;
    private String companyName;
    private String phone;
    private String address;
    private String email;
    private String password;
    private String detail;
    private String description;
    private String img;
    private String workTime;
    private String website;
    private List<ReviewDTO> reviews;
    private int numberOfCv;
    private List<JobDTO> jobDTOList;
}
