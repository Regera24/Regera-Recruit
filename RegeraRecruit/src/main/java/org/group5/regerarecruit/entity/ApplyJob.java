package org.group5.regerarecruit.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

import org.group5.regerarecruit.enums.ApplicationStatus;
import org.group5.regerarecruit.enums.JobType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "ApplyJob")
public class ApplyJob extends AbstractEntity {
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @Column(name = "CvId")
    Long cvId;

    @Column(name = "CandidateId")
    Long candidateId;

    @Column(name = "CandidateName")
    String candidateName;

    @Column(name = "CandidateAddress")
    String candidateAddress;

    @Column(name = "CandidateDescription")
    String candidateDescription;

    @Column(name = "CandidateEmail")
    String candidateEmail;

    @Column(name = "CandidateExp")
    String candidateExp;

    @Column(name = "CandidateBirthDate")
    LocalDate candidateBirthDate;

    @Column(name = "CandidatePhoneNumber")
    String candidatePhoneNumber;

    @Column(name = "CandidateStudy")
    String candidateStudy;

    @Column(name = "CandidatelinkProject")
    String candidateLinkProject;

    @Column(name = "CandidateTitle")
    String candidateTitle;

    @Column(name = "CandidateImg")
    String candidateImg;

    @Column(name = "CandidateSkills")
    String candidateSkills;

    @Column(name = "JobTitle")
    String jobTitle;

    @Column(name = "FromSalary")
    Double fromSalary;

    @Column(name = "ToSalary")
    Double toSalary;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Column(name = "JobDescription")
    String jobDescription;

    @Column(name = "JobId")
    Long jobId;

    @Column(name = "CompanyId")
    Long companyId;

    @Column(name = "Tags")
    String tags;

    @Column(name = "Citys")
    String cities;

    @Column(name = "JobImage")
    String jobImage;
}
