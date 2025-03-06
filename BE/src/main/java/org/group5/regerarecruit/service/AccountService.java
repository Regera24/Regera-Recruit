package org.group5.regerarecruit.service;

import org.group5.regerarecruit.dto.AccountDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.springframework.stereotype.Service;

@Service
public interface AccountService {
    public PageResponse<AccountDTO> getAllAccount(int offset, int pageSize, String sort, String... searchs);
}
