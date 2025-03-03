package org.group5.regerarecruit.converter;

import org.group5.regerarecruit.dto.CvDTO;
import org.group5.regerarecruit.dto.request.cv.CvCreationRequest;
import org.group5.regerarecruit.dto.request.cv.CvUpdateRequest;
import org.group5.regerarecruit.entity.Cv;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CvConverter {
    private final ModelMapper modelMapper;

    public CvDTO toCvDTO(Cv cv) {
        return modelMapper.map(cv, CvDTO.class);
    }

    public Cv toCvEntity(CvCreationRequest request) {
        return modelMapper.map(request, Cv.class);
    }

    public Cv toCvEntity(CvUpdateRequest request) {
        return modelMapper.map(request, Cv.class);
    }
}
