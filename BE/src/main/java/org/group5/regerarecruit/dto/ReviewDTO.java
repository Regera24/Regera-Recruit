package org.group5.regerarecruit.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Long id;
    private LocalDateTime creatAt;
    private int rating;
    private String comment;
    private String author;
    private String img;
}
