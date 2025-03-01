package org.group5.regerarecruit.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.group5.regerarecruit.enums.JobType;
import org.group5.regerarecruit.enums.OpenStatus;
import org.group5.regerarecruit.enums.PostedStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobDTO {
    private Long id;
    private String title;
    private Double fromSalary;
    private Double toSalary;
    private JobType jobType;
    private String description;
    private OpenStatus openStatus;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private PostedStatus postedStatus;
    private String jobImage;
    private List<TagDTO> tagDTOList;
    private List<CityDTO> cityDTOList;
}
