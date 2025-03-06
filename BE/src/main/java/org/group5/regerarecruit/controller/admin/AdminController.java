package org.group5.regerarecruit.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.group5.regerarecruit.dto.AccountDTO;
import org.group5.regerarecruit.dto.response.ApiResponse;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.service.AccountService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AccountService accountService;

    @Operation(summary = "Get all accounts", description = "Get accounts for admin management")
    @GetMapping(value = "/account")
    public ApiResponse<PageResponse<AccountDTO>> getAllAccounts(@RequestParam(defaultValue = "1", required = false) Integer pageNo,
                                      @RequestParam(defaultValue = "10", required = false) Integer pageSize,
                                      @RequestParam(required = false) String sortBy,
                                      @RequestParam(required = false) String... searchs){
        PageResponse<AccountDTO> response =  accountService.getAllAccount(pageNo, pageSize, sortBy, searchs);
        return ApiResponse.<PageResponse<AccountDTO>>builder()
                .code(200)
                .message("Get accounts successfully")
                .data(response)
                .build();
    }

    @Operation(summary = "Block an account", description = "Block an account for admin management")
    @PatchMapping("/block-account/{username}")
    public ApiResponse<Void> blockAnAccount(@PathVariable String username) {
        accountService.changeAccountStatus(username);
        return ApiResponse.<Void>builder()
                .code(204)
                .message("Change account status successfully.")
                .build();
    }
}
