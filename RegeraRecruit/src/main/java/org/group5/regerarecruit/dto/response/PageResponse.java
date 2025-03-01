package org.group5.regerarecruit.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class PageResponse<T> {
    private Integer pageNo;
    private Integer pageSize;
    private Long totalPages;
    private List<T> data;
}
