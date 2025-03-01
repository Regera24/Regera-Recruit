package org.group5.regerarecruit.service;

import java.util.List;

import org.group5.regerarecruit.dto.CvDTO;
import org.group5.regerarecruit.dto.request.cv.CvCreationRequest;
import org.group5.regerarecruit.dto.request.cv.CvUpdateRequest;
import org.springframework.stereotype.Service;

@Service
public interface CvService {
    public List<CvDTO> getCvByCandidate();

    public CvDTO getCvById(Long id);

    public void createCv(CvCreationRequest request);

    public void updateCv(CvUpdateRequest request, Long id);
}
