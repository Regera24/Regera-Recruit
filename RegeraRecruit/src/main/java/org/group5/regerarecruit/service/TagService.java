package org.group5.regerarecruit.service;

import java.util.List;

import org.group5.regerarecruit.dto.TagDTO;
import org.springframework.stereotype.Service;

@Service
public interface TagService {
    public List<TagDTO> getAllTags();
}
