package org.group5.regerarecruit.converter;

import org.group5.regerarecruit.dto.ReviewDTO;
import org.group5.regerarecruit.entity.Review;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReviewConverter {
    private final ModelMapper modelMapper;

    public ReviewDTO toReviewDTO(Review review) {
        ReviewDTO reviewDTO = modelMapper.map(review, ReviewDTO.class);
        reviewDTO.setAuthor(review.getCandidate().getName());
        reviewDTO.setImg(review.getCandidate().getAvatar());
        return reviewDTO;
    }
}
