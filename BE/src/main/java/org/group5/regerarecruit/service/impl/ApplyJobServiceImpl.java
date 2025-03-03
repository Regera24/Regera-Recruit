package org.group5.regerarecruit.service.impl;

import java.util.List;

import org.group5.regerarecruit.converter.ApplyJobConverter;
import org.group5.regerarecruit.dto.ApplyJobDTO;
import org.group5.regerarecruit.dto.request.candidate.ApplyRequest;
import org.group5.regerarecruit.entity.ApplyJob;
import org.group5.regerarecruit.enums.ApplicationStatus;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.ApplyJobRepository;
import org.group5.regerarecruit.service.ApplyJobService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplyJobServiceImpl implements ApplyJobService {
    private final ApplyJobConverter applyJobConverter;
    private final ApplyJobRepository applyJobRepository;

    @Override
    public List<ApplyJobDTO> getAPByCandidateId(Long id) {
        return applyJobRepository.getListApplyJobByCandidateId(id);
    }

    @Override
    public List<ApplyJobDTO> getAPByJobId(Long id) {
        return applyJobRepository.getListApplyJobByJobId(id);
    }

    @Override
    public void addApplyJob(ApplyRequest request) {
        ApplyJob applyJob = applyJobConverter.toEntity(request);
        applyJobRepository.save(applyJob);
    }

    @Override
    public void updateCVStatus(Long id, ApplicationStatus status) {
        ApplyJob applyJob =
                applyJobRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        applyJob.setStatus(status);
        applyJobRepository.save(applyJob);
    }

    @Override
    public boolean checkCvAndJob(Long cvId, Long jobId) {
        return applyJobRepository.existsByJobIdAndCvId(jobId, cvId);
    }

    @Override
    public ApplyJobDTO getApplyJobByCvIdAndJobId(Long cvId, Long jobId) {
        return applyJobRepository
                .findByCvIdAndJobId(cvId, jobId)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
    }
}
