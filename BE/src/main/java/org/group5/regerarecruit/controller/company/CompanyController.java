package org.group5.regerarecruit.controller.company;

import jakarta.validation.Valid;

import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.request.company.CompanyUpdateRequest;
import org.group5.regerarecruit.dto.request.job.JobCreationRequest;
import org.group5.regerarecruit.dto.request.job.JobUpdateRequest;
import org.group5.regerarecruit.dto.response.ApiResponse;
import org.group5.regerarecruit.dto.response.CompanyResponse;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.service.CompanyService;
import org.group5.regerarecruit.service.JobService;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/company")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;
    private final JobService jobService;

    @Operation(summary = "Get Company Information", description = "Get company information")
    @GetMapping("/info")
    public ApiResponse<CompanyResponse> getCompanyInfo() {
        CompanyResponse response = companyService.getCompanyInfo();
        return ApiResponse.<CompanyResponse>builder()
                .data(response)
                .message("Get company information successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Update Company Information", description = "Update company information with UpdateRequest")
    @PatchMapping("")
    public ApiResponse<Void> updateCompanyInfo(@Valid CompanyUpdateRequest request) {
        companyService.updateCompany(request);
        return ApiResponse.<Void>builder()
                .code(204)
                .message("Update company successfully")
                .build();
    }

    @Operation(summary = "Get jobs by company", description = "Get jobs of current login company account")
    @GetMapping("/jobs")
    public ApiResponse<PageResponse<JobDTO>> getAllJobsByCompany(
            @RequestParam(defaultValue = "1", required = false) Integer pageNo,
            @RequestParam(defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String... searchs) {
        PageResponse<JobDTO> response =
                jobService.getAllJobsWithSortAndSearchByCriteriaAndCompany(pageNo, pageSize, keyword ,sortBy, searchs);
        return ApiResponse.<PageResponse<JobDTO>>builder()
                .data(response)
                .code(200)
                .message("Get jobs in a company successfully")
                .build();
    }

    @Operation(summary = "Get job by id", description = "Get job by id of current login company account")
    @GetMapping("/job/{id}")
    public ApiResponse<JobDTO> getJobById(@PathVariable Long id) {
        JobDTO response = jobService.getJobById(id);
        return ApiResponse.<JobDTO>builder()
                .message("Get job by id successfully")
                .data(response)
                .code(200)
                .build();
    }

    @Operation(summary = "Create new job", description = "Create new job with Job Create request")
    @PostMapping("/job")
    public ApiResponse<Void> createJob(@RequestBody @Valid JobCreationRequest request) {
        jobService.addJob(request);
        return ApiResponse.<Void>builder()
                .message("Create job successfully")
                .code(201)
                .build();
    }

    @Operation(summary = "Update job", description = "Update job with Job Update request")
    @PatchMapping("/job/{id}")
    public ApiResponse<Void> updateJobById(@PathVariable Long id, @RequestBody JobUpdateRequest request) {
        jobService.updateJob(request, id);
        return ApiResponse.<Void>builder()
                .message("Update job successfully")
                .code(204)
                .build();
    }
}
