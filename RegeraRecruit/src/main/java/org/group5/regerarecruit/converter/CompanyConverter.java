package org.group5.regerarecruit.converter;

import java.util.List;

import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.ReviewDTO;
import org.group5.regerarecruit.dto.request.company.CompanyCreationRequest;
import org.group5.regerarecruit.dto.request.company.CompanyUpdateRequest;
import org.group5.regerarecruit.dto.response.CompanyResponse;
import org.group5.regerarecruit.entity.Company;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CompanyConverter {
    private final ModelMapper modelMapper;
    private final ReviewConverter reviewConverter;
    private final JobConverter jobConverter;

    public CompanyResponse toCompanyResponse(Company company) {
        CompanyResponse res = modelMapper.map(company, CompanyResponse.class);

        List<ReviewDTO> reviews =
                company.getReviews().stream().map(reviewConverter::toReviewDTO).toList();
        res.setReviews(reviews);

        List<JobDTO> jobs = company.getJobs().stream().map(jobConverter::toDTO).toList();
        res.setJobDTOList(jobs);

        return res;
    }

    public Company toCompany(CompanyUpdateRequest companyUpdateRequest) {
        return modelMapper.map(companyUpdateRequest, Company.class);
    }

    public Company toCompany(CompanyCreationRequest request) {
        return modelMapper.map(request, Company.class);
    }
}
