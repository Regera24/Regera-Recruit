package org.group5.regerarecruit.dto.response;

import java.util.List;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    private Integer pageNo;
    private Integer pageSize;
    private Long totalPages;
    private List<T> data;
}
