package org.group5.regerarecruit.service.impl;

import lombok.RequiredArgsConstructor;
import org.group5.regerarecruit.dto.AccountDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.AccountRepository;
import org.group5.regerarecruit.repository.AccountSearchRepository;
import org.group5.regerarecruit.service.AccountService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountSearchRepository accountSearchRepository;
    private final AccountRepository accountRepository;

    @Override
    public PageResponse<AccountDTO> getAllAccount(int offset, int pageSize, String sort, String... searchs) {
        return accountSearchRepository.getAllAccountsWithSortAndSearchByCriteria(offset, pageSize, sort, searchs);
    }

    @Override
    public void changeAccountStatus(String username) {
        Account account = accountRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        account.setIsActive(account.getIsActive() == null || !account.getIsActive());
    }
}
