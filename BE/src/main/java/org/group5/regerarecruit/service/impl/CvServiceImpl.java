package org.group5.regerarecruit.service.impl;

import java.util.List;

import org.group5.regerarecruit.converter.CvConverter;
import org.group5.regerarecruit.dto.CvDTO;
import org.group5.regerarecruit.dto.request.cv.CvCreationRequest;
import org.group5.regerarecruit.dto.request.cv.CvUpdateRequest;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Cv;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.AccountRepository;
import org.group5.regerarecruit.repository.CvRepository;
import org.group5.regerarecruit.service.CvService;
import org.group5.regerarecruit.utils.ObjectUpdater;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CvServiceImpl implements CvService {
    private final CvRepository cvRepository;
    private final CvConverter cvConverter;
    private final AccountRepository accountRepository;
    private final ObjectUpdater objectUpdater;

    @Override
    public List<CvDTO> getCvByCandidate() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Cv> list = cvRepository.findByCandidate(account.getCandidate());
        return list.stream().map(cvConverter::toCvDTO).toList();
    }

    @Override
    public CvDTO getCvById(Long id) {
        Cv cv = cvRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        return cvConverter.toCvDTO(cv);
    }

    @Override
    public void createCv(CvCreationRequest request) {
        Cv cv = cvConverter.toCvEntity(request);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account acc = accountRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        cv.setCandidate(acc.getCandidate());
        cvRepository.save(cv);
    }

    @Override
    public void updateCv(CvUpdateRequest request, Long id) {
        Cv update = cvConverter.toCvEntity(request);
        Cv now = cvRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        objectUpdater.updateNonNullFields(update, now);
        cvRepository.save(now);
    }
}
