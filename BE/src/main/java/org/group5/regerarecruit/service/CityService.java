package org.group5.regerarecruit.service;

import java.util.List;

import org.group5.regerarecruit.dto.CityDTO;
import org.springframework.stereotype.Service;

@Service
public interface CityService {
    public List<CityDTO> getAllCity();
}
