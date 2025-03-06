package org.group5.regerarecruit.repository.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.group5.regerarecruit.converter.AccountConverter;
import org.group5.regerarecruit.dto.AccountDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.repository.AccountSearchRepository;
import org.group5.regerarecruit.repository.criteria.AccountSearchCriteriaQueryConsumer;
import org.group5.regerarecruit.repository.criteria.CriteriaConverter;
import org.group5.regerarecruit.repository.criteria.SearchCriteria;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
@RequiredArgsConstructor
public class AccountSearchRepositoryImpl implements AccountSearchRepository {
    @PersistenceContext
    private EntityManager em;

    private final AccountConverter accountConverter;
    private final CriteriaConverter criteriaConverter;

    @Override
    public PageResponse<AccountDTO> getAllAccountsWithSortAndSearchByCriteria(int offset, int pageSize, String sort, String... search) {
        List<SearchCriteria> criteriaList = criteriaConverter.toCriteriaList(search);

        List<Account> accounts = getAccounts(offset, pageSize, sort, criteriaList);

        List<AccountDTO> accountDTOS = accounts.stream().map(accountConverter::toDto).toList();

        long totalElements = getTotalAccountCount(criteriaList);
        long totalPage = (long) Math.ceil((double) totalElements / pageSize);

        return PageResponse.<AccountDTO>builder()
                .pageNo(offset)
                .pageSize(pageSize)
                .data(accountDTOS)
                .totalPages(totalPage)
                .build();
    }

    private List<Account> getAccounts(int offset, int pageSize, String sort, List<SearchCriteria> criteriaList){
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Account> criteriaQuery = criteriaBuilder.createQuery(Account.class);
        Root<Account> root = criteriaQuery.from(Account.class);

        Predicate predicate = criteriaBuilder.conjunction();
        AccountSearchCriteriaQueryConsumer consumer = new AccountSearchCriteriaQueryConsumer(criteriaBuilder, predicate, root);
        criteriaList.forEach(consumer);

        predicate = consumer.getPredicate();
        criteriaQuery.where(predicate);

        if (StringUtils.hasLength(sort)) {
            Pattern pattern = Pattern.compile("(\\w+?)(:)(asc|desc)");
            Matcher matcher = pattern.matcher(sort);
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

    private long getTotalAccountCount(List<SearchCriteria> criteriaList) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Account> root = countQuery.from(Account.class);

        countQuery.select(criteriaBuilder.count(root));

        Predicate predicate = criteriaBuilder.conjunction();
        AccountSearchCriteriaQueryConsumer consumer = new AccountSearchCriteriaQueryConsumer(criteriaBuilder, predicate, root);
        criteriaList.forEach(consumer);
        predicate = consumer.getPredicate();

        countQuery.where(predicate);

        return em.createQuery(countQuery).getSingleResult();
    }
}
