package org.group5.regerarecruit.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.group5.regerarecruit.converter.JobConverter;
import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.request.job.JobCreationRequest;
import org.group5.regerarecruit.dto.request.job.JobUpdateRequest;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Job;
import org.group5.regerarecruit.enums.OpenStatus;
import org.group5.regerarecruit.enums.PostedStatus;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.AccountRepository;
import org.group5.regerarecruit.repository.JobRepository;
import org.group5.regerarecruit.repository.SearchRepository;
import org.group5.regerarecruit.service.JobService;
import org.group5.regerarecruit.utils.ObjectUpdater;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;
    private final JobConverter jobConverter;
    private final AccountRepository accountRepository;
    private final ObjectUpdater objectUpdater;
    private final SearchRepository searchRepository;

    @Override
    public List<JobDTO> getAllJobsActive(int pageNo, int pageSize, String... sorts) {
        List<Sort.Order> orders = new ArrayList<>();

        for (String s : sorts) {
            if (StringUtils.hasLength(s)) {
                Pattern pattern = Pattern.compile("(\\w+?)(:)(.*)");
                Matcher matcher = pattern.matcher(s);
                if (matcher.find()) {
                    if (matcher.group(3).equalsIgnoreCase("asc")) {
                        orders.add(new Sort.Order(Sort.Direction.ASC, matcher.group(1)));
                    } else {
                        orders.add(new Sort.Order(Sort.Direction.DESC, matcher.group(1)));
                    }
                }
            }
        }

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(orders));

        Page<Job> jobs = jobRepository.getAllJobAcceptedAndOpen(OpenStatus.OPEN, PostedStatus.ACCEPT, pageable);
        return jobs.stream().map(jobConverter::toDTO).toList();
    }

    @Override
    public PageResponse<JobDTO> getAllJobsWithSortAndSearchByCriteria(
            int offset, int pageSize, String keyword ,String sort, String... searchs) {
        return searchRepository.getAllJobWithSortAndSearchByCriteria(offset, pageSize, keyword ,sort, null, searchs);
    }

    @Override
    public PageResponse<JobDTO> getAllJobsWithSortAndSearchByCriteriaAndCompany(
            int offset, int pageSize, String keyword, String sort, String... searchs) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account acc = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Long companyId = acc.getCompany().getId();
        return searchRepository.getAllJobWithSortAndSearchByCriteria(offset, pageSize, keyword ,sort, companyId, searchs);
    }

    @Override
    public void addJob(JobCreationRequest request) {
        Job job = jobConverter.toJobEntity(request);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account acc = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        job.setCompany(acc.getCompany());
        job.setPostedStatus(PostedStatus.PENDING);
        jobRepository.save(job);
    }

    @Override
    public void updateJob(JobUpdateRequest request, Long id) {
        Job now = jobRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        Job update = jobConverter.toJobEntity(request);
        objectUpdater.updateNonNullFields(update, now);
        jobRepository.save(now);
    }

    @Override
    public JobDTO getJobById(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        return jobConverter.toDTO(job);
    }
}
