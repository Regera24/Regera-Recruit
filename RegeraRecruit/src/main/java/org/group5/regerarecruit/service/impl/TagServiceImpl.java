package org.group5.regerarecruit.service.impl;

import java.util.List;

import org.group5.regerarecruit.converter.OtherConverter;
import org.group5.regerarecruit.dto.TagDTO;
import org.group5.regerarecruit.entity.Tag;
import org.group5.regerarecruit.repository.TagRepository;
import org.group5.regerarecruit.service.TagService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;
    private final OtherConverter otherConverter;

    @Override
    public List<TagDTO> getAllTags() {
        List<Tag> tags = tagRepository.findAll();
        return tags.stream().map(otherConverter::toDTO).toList();
    }
}
