package org.group5.regerarecruit.repository;

import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchRepository {
    public PageResponse<JobDTO> getAllJobWithSortAndSearchByCriteria(
            int offset, int pageSize, String keyword ,String sort, Long companyId, String... search);
}
