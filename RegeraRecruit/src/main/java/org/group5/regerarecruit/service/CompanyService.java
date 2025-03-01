package org.group5.regerarecruit.service;

import java.util.List;

import org.group5.regerarecruit.dto.request.company.CompanyCreationRequest;
import org.group5.regerarecruit.dto.request.company.CompanyUpdateRequest;
import org.group5.regerarecruit.dto.response.CompanyResponse;
import org.springframework.stereotype.Service;

@Service
public interface CompanyService {
    public List<CompanyResponse> getAllCompanies();

    public void updateCompany(CompanyUpdateRequest request);

    public void createCompany(CompanyCreationRequest request);

    public CompanyResponse getCompanyById(Long id);

    public CompanyResponse getCompanyInfo();
}
