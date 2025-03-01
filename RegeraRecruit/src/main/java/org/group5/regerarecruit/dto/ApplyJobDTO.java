package org.group5.regerarecruit.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.group5.regerarecruit.enums.JobType;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApplyJobDTO {
    Long id;
    LocalDateTime createdAt;
    Long cvId;
    Long candidateId;
    String candidateName;
    String candidateAddress;
    String candidateDescription;
    String candidateEmail;
    String candidateExp;
    LocalDate candidateBirthDate;
    String candidatePhoneNumber;
    String candidateStudy;
    String candidateLinkProject;
    String candidateTitle;
    String candidateImg;
    String candidateSkills;
    String jobTitle;
    Double fromSalary;
    Double toSalary;
    JobType jobType;
    String jobDescription;
    Long companyId;
    String tags;
    String cities;
    String jobImage;
    Long jobId;

    public ApplyJobDTO(Long id, String candidateTitle, String jobTitle, String jobImage, LocalDateTime createdAt) {
        this.id = id;
        this.candidateTitle = candidateTitle;
        this.jobTitle = jobTitle;
        this.jobImage = jobImage;
        this.createdAt = createdAt;
    }

    public ApplyJobDTO(
            Long id,
            LocalDateTime createdAt,
            Long cvId,
            Long candidateId,
            String candidateName,
            String candidateAddress,
            String candidateDescription,
            String candidateEmail,
            String candidateExp,
            LocalDate candidateBirthDate,
            String candidatePhoneNumber,
            String candidateStudy,
            String candidateLinkProject,
            String candidateTitle,
            String candidateImg,
            String candidateSkills) {
        this.id = id;
        this.createdAt = createdAt;
        this.cvId = cvId;
        this.candidateId = candidateId;
        this.candidateName = candidateName;
        this.candidateAddress = candidateAddress;
        this.candidateDescription = candidateDescription;
        this.candidateEmail = candidateEmail;
        this.candidateExp = candidateExp;
        this.candidateBirthDate = candidateBirthDate;
        this.candidatePhoneNumber = candidatePhoneNumber;
        this.candidateStudy = candidateStudy;
        this.candidateLinkProject = candidateLinkProject;
        this.candidateTitle = candidateTitle;
        this.candidateImg = candidateImg;
        this.candidateSkills = candidateSkills;
    }

    public ApplyJobDTO(
            Long id,
            String jobTitle,
            Double fromSalary,
            Double toSalary,
            JobType jobType,
            String jobDescription,
            Long companyId,
            String tags,
            String cities,
            String jobImage,
            Long jobId) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.fromSalary = fromSalary;
        this.toSalary = toSalary;
        this.jobType = jobType;
        this.jobDescription = jobDescription;
        this.companyId = companyId;
        this.tags = tags;
        this.cities = cities;
        this.jobImage = jobImage;
        this.jobId = jobId;
    }
}
