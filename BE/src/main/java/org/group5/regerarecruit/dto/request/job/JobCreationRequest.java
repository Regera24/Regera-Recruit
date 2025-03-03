package org.group5.regerarecruit.dto.request.job;

import java.util.List;

import jakarta.validation.constraints.NotNull;

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
public class JobCreationRequest {
    @NotNull
    String title;

    @NotNull
    Double fromSalary;

    @NotNull
    Double toSalary;

    @NotNull
    JobType jobType;

    String description;

    @NotNull
    String openStatus;

    String jobImage;

    @NotNull
    List<Long> cities;

    @NotNull
    List<Long> tags;
}
