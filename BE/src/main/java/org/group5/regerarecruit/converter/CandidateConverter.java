package org.group5.regerarecruit.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.group5.regerarecruit.dto.CandidateDTO;
import org.group5.regerarecruit.dto.CvDTO;
import org.group5.regerarecruit.dto.request.candidate.CandidateCreationRequest;
import org.group5.regerarecruit.dto.request.candidate.CandidateUpdateRequest;
import org.group5.regerarecruit.entity.Candidate;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CandidateConverter {
    private final ModelMapper modelMapper;
    private final CvConverter cvConverter;

    public CandidateDTO toCandidateDTO(Candidate candidate) {
        CandidateDTO candidateDTO = modelMapper.map(candidate, CandidateDTO.class);
        List<CvDTO> cvList =
                candidate.getCvs().stream().map(cvConverter::toCvDTO).collect(Collectors.toList());
        candidateDTO.setCvs(cvList);
        return candidateDTO;
    }

    public Candidate toCandidate(CandidateCreationRequest request) {
        return modelMapper.map(request, Candidate.class);
    }

    public Candidate toCandidate(CandidateUpdateRequest request) {
        return modelMapper.map(request, Candidate.class);
    }
}
