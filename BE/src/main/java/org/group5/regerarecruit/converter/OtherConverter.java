package org.group5.regerarecruit.converter;

import org.group5.regerarecruit.dto.CityDTO;
import org.group5.regerarecruit.dto.TagDTO;
import org.group5.regerarecruit.entity.City;
import org.group5.regerarecruit.entity.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OtherConverter {
    private final ModelMapper modelMapper;

    public CityDTO toDTO(City city) {
        return modelMapper.map(city, CityDTO.class);
    }

    public TagDTO toDTO(Tag tag) {
        return modelMapper.map(tag, TagDTO.class);
    }
}
