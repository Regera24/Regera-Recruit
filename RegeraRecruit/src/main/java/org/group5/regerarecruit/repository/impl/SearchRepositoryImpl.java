package org.group5.regerarecruit.repository.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;

import org.group5.regerarecruit.converter.JobConverter;
import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.entity.Company;
import org.group5.regerarecruit.entity.Job;
import org.group5.regerarecruit.repository.SearchRepository;
import org.group5.regerarecruit.repository.criteria.JobSearchCriteriaQueryConsumer;
import org.group5.regerarecruit.repository.criteria.SearchCriteria;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SearchRepositoryImpl implements SearchRepository {
    @PersistenceContext
    private EntityManager em;

    private final JobConverter jobConverter;

    @Override
    public PageResponse<JobDTO> getAllJobWithSortAndSearchByCriteria(
            int offset, int pageSize, String sort, Long companyId, String... search) {
        List<SearchCriteria> criteriaList = new ArrayList<>();

        if (search != null) {
            for (String s : search) {
                if (StringUtils.hasLength(s)) {
                    Pattern pattern = Pattern.compile("(\\w+?)([:><])(.*)");
                    Matcher matcher = pattern.matcher(s);
                    if (matcher.find()) {
                        criteriaList.add(new SearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3)));
                    }
                }
            }
        }

        List<Job> jobList = getJobs(offset, pageSize, sort, companyId, criteriaList);

        List<JobDTO> jobDTOList = jobList.stream().map(jobConverter::toDTO).toList();

        long totalElements = getTotalJobsCount(companyId, criteriaList);
        long totalPage = (long) Math.ceil((double) totalElements / pageSize);

        return PageResponse.<JobDTO>builder()
                .data(jobDTOList)
                .pageNo(offset)
                .pageSize(pageSize)
                .totalPages(totalPage)
                .build();
    }

    private List<Job> getJobs(
            int offset, int pageSize, String sortBy, Long companyId, List<SearchCriteria> criteriaList) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Job> criteriaQuery = criteriaBuilder.createQuery(Job.class);
        Root<Job> root = criteriaQuery.from(Job.class);

        Predicate predicate = criteriaBuilder.conjunction();
        JobSearchCriteriaQueryConsumer consumer = new JobSearchCriteriaQueryConsumer(criteriaBuilder, predicate, root);

        criteriaList.forEach(consumer);
        predicate = consumer.getPredicate();

        if (companyId != null) {
            Join<Job, Company> companyJoin = root.join("company");
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(companyJoin.get("id"), companyId));
        }

        criteriaQuery.where(predicate);

        if (StringUtils.hasLength(sortBy)) {
            Pattern pattern = Pattern.compile("(\\w+?)(:)(asc|desc)");
            Matcher matcher = pattern.matcher(sortBy);
            if (matcher.find()) {
                String columnName = matcher.group(1);
                if (matcher.group(3).equalsIgnoreCase("asc")) {
                    criteriaQuery.orderBy(criteriaBuilder.asc(root.get(columnName)));
                } else {
                    criteriaQuery.orderBy(criteriaBuilder.desc(root.get(columnName)));
                }
            }
        }
        return em.createQuery(criteriaQuery)
                .setFirstResult(offset)
                .setMaxResults(pageSize)
                .getResultList();
    }

    private long getTotalJobsCount(Long companyId, List<SearchCriteria> criteriaList) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Job> root = countQuery.from(Job.class);

        countQuery.select(criteriaBuilder.count(root));

        Predicate predicate = criteriaBuilder.conjunction();
        JobSearchCriteriaQueryConsumer consumer = new JobSearchCriteriaQueryConsumer(criteriaBuilder, predicate, root);
        criteriaList.forEach(consumer);
        predicate = consumer.getPredicate();

        if (companyId != null) {
            Join<Job, Company> companyJoin = root.join("company");
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(companyJoin.get("id"), companyId));
        }

        countQuery.where(predicate);

        return em.createQuery(countQuery).getSingleResult();
    }
}
