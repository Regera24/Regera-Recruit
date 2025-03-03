package org.group5.regerarecruit.service.impl;

import org.group5.regerarecruit.converter.CandidateConverter;
import org.group5.regerarecruit.dto.CandidateDTO;
import org.group5.regerarecruit.dto.request.candidate.CandidateCreationRequest;
import org.group5.regerarecruit.dto.request.candidate.CandidateUpdateRequest;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Candidate;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.AccountRepository;
import org.group5.regerarecruit.repository.CandidateRepository;
import org.group5.regerarecruit.service.CandidateService;
import org.group5.regerarecruit.utils.ObjectUpdater;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateServiceImpl implements CandidateService {
    private final CandidateRepository candidateRepository;
    private final CandidateConverter candidateConverter;
    private final AccountRepository accountRepository;
    private final ObjectUpdater objectUpdater;

    @Override
    public CandidateDTO getCandidateById(Long id) {
        Candidate candidate =
                candidateRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return candidateConverter.toCandidateDTO(candidate);
    }

    @Override
    public void addCandidate(CandidateCreationRequest request) {
        Candidate candidate = candidateConverter.toCandidate(request);
        candidateRepository.save(candidate);
    }

    @Override
    public CandidateDTO getCandidateInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account acc = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Candidate candidate =
                candidateRepository.findByAccount(acc).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        CandidateDTO dto = candidateConverter.toCandidateDTO(candidate);
        dto.setEmail(acc.getEmail());
        dto.setPhoneNumber(acc.getPhoneNumber());
        return dto;
    }

    @Override
    public void updateCandidate(CandidateUpdateRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Account acc = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Candidate candidate = candidateRepository
                .findById(acc.getCandidate().getId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Candidate update = candidateConverter.toCandidate(request);

        objectUpdater.updateNonNullFields(update, candidate);

        if (request.getEmail() != null) {
            candidate.getAccount().setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            candidate.getAccount().setPhoneNumber(request.getPhoneNumber());
        }

        candidateRepository.save(candidate);
    }
}
