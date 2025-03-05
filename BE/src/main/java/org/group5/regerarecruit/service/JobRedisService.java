package org.group5.regerarecruit.service;

import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

@Service
public interface JobRedisService {
    public PageResponse<JobDTO> findByJobSearchId(
            int pageNo, int pageSize, String keyword, String sortBy, String... searchs) throws JsonProcessingException;

    public void setJobSearchResultToRedis(
            int pageNo, int pageSize, String keyword, String sortBy, String[] searchs, PageResponse<JobDTO> result)
            throws JsonProcessingException;
}
