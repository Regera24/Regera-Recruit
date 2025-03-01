package org.group5.regerarecruit.dto.request.job;

import java.util.List;

import org.group5.regerarecruit.enums.JobType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobUpdateRequest {
    String title;
    Double fromSalary;
    Double toSalary;
    JobType jobType;
    String description;
    String openStatus;
    String jobImage;
    List<Long> cities;
    List<Long> tags;
}
