package org.group5.regerarecruit.repository;

import org.group5.regerarecruit.dto.AccountDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountSearchRepository {
    public PageResponse<AccountDTO> getAllAccountsWithSortAndSearchByCriteria(
            int offset, int pageSize, String sort, String... search);
}
