package org.group5.regerarecruit.service;

import java.util.List;

import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.request.job.JobCreationRequest;
import org.group5.regerarecruit.dto.request.job.JobUpdateRequest;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.springframework.stereotype.Service;

@Service
public interface JobService {
    public List<JobDTO> getAllJobsActive(int pageNo, int pageSize, String... sorts);

    public PageResponse<JobDTO> getAllJobsWithSortAndSearchByCriteria(
            int offset, int pageSize, String keyword ,String sort, String... searchs);

    public void addJob(JobCreationRequest request);

    public void updateJob(JobUpdateRequest request, Long id);

    public JobDTO getJobById(Long id);

    public PageResponse<JobDTO> getAllJobsWithSortAndSearchByCriteriaAndCompany(
            int offset, int pageSize, String keyword ,String sort, String... searchs);
}
