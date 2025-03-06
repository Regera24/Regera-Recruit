package org.group5.regerarecruit.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.group5.regerarecruit.dto.AccountDTO;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.service.AccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AccountService accountService;

    @Operation(summary = "Get all account", description = "Get account for admin management.")
    @GetMapping(value = "/account")
    public PageResponse<AccountDTO> getAllAccounts( @RequestParam(defaultValue = "1", required = false) Integer pageNo,
                                                    @RequestParam(defaultValue = "10", required = false) Integer pageSize,
                                                    @RequestParam(required = false) String sortBy,
                                                    @RequestParam(required = false) String... searchs){
        return accountService.getAllAccount(pageNo, pageSize, sortBy, searchs);
    }
}
