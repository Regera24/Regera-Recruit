package org.group5.regerarecruit.service;

import java.util.List;

import org.group5.regerarecruit.dto.ApplyJobDTO;
import org.group5.regerarecruit.dto.request.candidate.ApplyRequest;
import org.group5.regerarecruit.enums.ApplicationStatus;
import org.springframework.stereotype.Service;

@Service
public interface ApplyJobService {
    public List<ApplyJobDTO> getAPByCandidateId(Long id);

    public List<ApplyJobDTO> getAPByJobId(Long id);

    public void addApplyJob(ApplyRequest request);

    public void updateCVStatus(Long id, ApplicationStatus status);

    public boolean checkCvAndJob(Long cvId, Long jobId);

    public ApplyJobDTO getApplyJobByCvIdAndJobId(Long cvId, Long jobId);
}
