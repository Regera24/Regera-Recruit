package org.group5.regerarecruit.service.impl;

import java.util.List;

import org.group5.regerarecruit.converter.CompanyConverter;
import org.group5.regerarecruit.dto.request.company.CompanyCreationRequest;
import org.group5.regerarecruit.dto.request.company.CompanyUpdateRequest;
import org.group5.regerarecruit.dto.response.CompanyResponse;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Company;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.AccountRepository;
import org.group5.regerarecruit.repository.CompanyRepository;
import org.group5.regerarecruit.service.CompanyService;
import org.group5.regerarecruit.utils.ObjectUpdater;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final CompanyConverter companyConverter;
    private final AccountRepository accountRepository;
    private final ObjectUpdater objectUpdater;

    @Override
    public List<CompanyResponse> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream().map(companyConverter::toCompanyResponse).toList();
    }

    @Override
    public void updateCompany(CompanyUpdateRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Account acc = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Company now = companyRepository
                .findById(acc.getCompany().getId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Company update = companyConverter.toCompany(request);

        objectUpdater.updateNonNullFields(update, now);

        if (request.getEmail() != null) {
            now.getAccount().setEmail(request.getEmail());
        }
        if (request.getPhone() != null) {
            now.getAccount().setPhoneNumber(request.getPhone());
        }

        companyRepository.save(now);
    }

    @Override
    public void createCompany(CompanyCreationRequest request) {
        Company company = companyConverter.toCompany(request);
        companyRepository.save(company);
    }

    @Override
    public CompanyResponse getCompanyById(Long id) {
        Company company =
                companyRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return companyConverter.toCompanyResponse(company);
    }

    @Override
    public CompanyResponse getCompanyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account acc = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Company company = companyRepository
                .getCompanyByAccount(acc)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        CompanyResponse res = companyConverter.toCompanyResponse(company);

        res.setEmail(acc.getEmail());
        res.setPhone(acc.getPhoneNumber());

        return res;
    }
}
