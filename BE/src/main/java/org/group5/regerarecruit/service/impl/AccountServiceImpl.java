package org.group5.regerarecruit.service.impl;

import lombok.RequiredArgsConstructor;
import org.group5.regerarecruit.dto.AccountDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.repository.AccountSearchRepository;
import org.group5.regerarecruit.service.AccountService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountSearchRepository accountSearchRepository;

    @Override
    public PageResponse<AccountDTO> getAllAccount(int offset, int pageSize, String sort, String... searchs) {
        return accountSearchRepository.getAllAccountsWithSortAndSearchByCriteria(offset, pageSize, sort, searchs);
    }
}
