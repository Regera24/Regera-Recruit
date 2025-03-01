package org.group5.regerarecruit.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.group5.regerarecruit.converter.OtherConverter;
import org.group5.regerarecruit.dto.CityDTO;
import org.group5.regerarecruit.repository.CityRepository;
import org.group5.regerarecruit.service.CityService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {
    private final CityRepository cityRepository;
    private final OtherConverter otherConverter;

    @Override
    public List<CityDTO> getAllCity() {
        return cityRepository.findAll().stream().map(otherConverter::toDTO).collect(Collectors.toList());
    }
}
