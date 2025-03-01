package org.group5.regerarecruit.service;

import org.group5.regerarecruit.dto.CandidateDTO;
import org.group5.regerarecruit.dto.request.candidate.CandidateCreationRequest;
import org.group5.regerarecruit.dto.request.candidate.CandidateUpdateRequest;
import org.springframework.stereotype.Service;

@Service
public interface CandidateService {
    public CandidateDTO getCandidateById(Long id);

    public void addCandidate(CandidateCreationRequest request);

    public CandidateDTO getCandidateInfo();

    public void updateCandidate(CandidateUpdateRequest candidate);
}
