package org.group5.regerarecruit.converter;

import org.group5.regerarecruit.dto.request.authentication.AccountCreationRequest;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Role;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountConverter {
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;

    public Account toAccountEntity(AccountCreationRequest request) {
        Account acc = modelMapper.map(request, Account.class);
        Role role =
                roleRepository.findByCode(request.getRole()).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        acc.setRole(role);
        acc.setIsActive(true);
        return acc;
    }
}
