package org.group5.regerarecruit.converter;

import java.util.stream.Collectors;

import org.group5.regerarecruit.dto.ApplyJobDTO;
import org.group5.regerarecruit.dto.request.candidate.ApplyRequest;
import org.group5.regerarecruit.entity.*;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.CvRepository;
import org.group5.regerarecruit.repository.JobRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApplyJobConverter {
    private final ModelMapper modelMapper;
    private final OtherConverter otherConverter;
    private final JobRepository jobRepository;
    private final CvRepository cvRepository;

    public ApplyJobDTO toDTO(ApplyJob applyJob) {
        return modelMapper.map(applyJob, ApplyJobDTO.class);
    }

    public ApplyJob toEntity(ApplyRequest request) {
        ApplyJob apply = new ApplyJob();

        Job job = jobRepository
                .findById(request.getJobId())
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        Cv cv = cvRepository
                .findById(request.getCvId())
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));

        apply.setCvId(cv.getId());
        apply.setCandidateAddress(cv.getAddress());
        apply.setCandidateName(cv.getName());
        apply.setCandidateExp(cv.getExp());
        apply.setCandidateEmail(cv.getEmail());
        apply.setCandidateBirthDate(cv.getBirthDate());
        apply.setCandidateDescription(cv.getDescription());
        apply.setCandidateImg(cv.getImg());
        apply.setCandidateLinkProject(cv.getLinkProject());
        apply.setCandidateSkills(cv.getSkills());
        apply.setCandidatePhoneNumber(cv.getPhone());
        apply.setCandidateStudy(cv.getStudy());
        apply.setCandidateTitle(cv.getTitle());
        apply.setCandidateId(cv.getCandidate().getId());

        apply.setJobId(job.getId());
        apply.setJobTitle(job.getTitle());
        apply.setJobDescription(job.getDescription());
        apply.setFromSalary(job.getFromSalary());
        apply.setToSalary(job.getToSalary());
        apply.setJobType(job.getJobType());
        apply.setJobImage(job.getJobImage());
        apply.setCompanyId(job.getCompany().getId());
        String tags = job.getTags().stream().map(Tag::getValue).collect(Collectors.joining(", "));
        String cities = job.getCities().stream().map(City::getValue).collect(Collectors.joining(", "));
        apply.setTags(tags);
        apply.setCities(cities);

        return apply;
    }
}
