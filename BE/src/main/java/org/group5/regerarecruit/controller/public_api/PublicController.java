package org.group5.regerarecruit.controller.public_api;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.group5.regerarecruit.dto.CityDTO;
import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.TagDTO;
import org.group5.regerarecruit.dto.response.ApiResponse;
import org.group5.regerarecruit.dto.response.CompanyResponse;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.service.*;
import org.group5.regerarecruit.utils.CloudinaryService;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {
    private final JobService jobService;
    private final CompanyService companyService;
    private final TagService tagService;
    private final CityService cityService;
    private final CloudinaryService cloudinaryService;
    private final JobRedisService jobRedisService;

    @Operation(summary = "Get jobs by company", description = "Get jobs from user requirement")
    @GetMapping("/jobs")
    public ApiResponse<PageResponse<JobDTO>> getAllJobs(
            @RequestParam(defaultValue = "1", required = false) Integer pageNo,
            @RequestParam(defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String... searchs) throws JsonProcessingException {

        ApiResponse<PageResponse<JobDTO>> apiResponse = new ApiResponse<>();
        PageResponse<JobDTO> redisResponse = jobRedisService.findByJobSearchId(pageNo, pageSize, keyword, sortBy, searchs);

        if(redisResponse!=null){
            apiResponse.setData(redisResponse);
        }else{
            PageResponse<JobDTO> response =
                    jobService.getAllJobsWithSortAndSearchByCriteria(pageNo, pageSize, keyword ,sortBy, searchs);
            jobRedisService.setJobSearchResultToRedis(pageNo, pageSize, keyword, sortBy, searchs, response);
            apiResponse.setData(response);
        }

        apiResponse.setCode(200);
        apiResponse.setMessage("Get jobs successfully");

        return apiResponse;
    }

    @Operation(summary = "Get company info", description = "Get company info by id")
    @GetMapping("/company/{id}")
    public ApiResponse<CompanyResponse> getCompanyById(@PathVariable Long id) {
        CompanyResponse response = companyService.getCompanyById(id);
        return ApiResponse.<CompanyResponse>builder()
                .code(200)
                .message("Get company info successfully")
                .data(response)
                .build();
    }

    @Operation(summary = "Get job info", description = "Get job info by id")
    @GetMapping("/job/{id}")
    public ApiResponse<JobDTO> getJobById(@PathVariable Long id) {
        JobDTO response = jobService.getJobById(id);
        return ApiResponse.<JobDTO>builder()
                .message("Get job by id successfully")
                .data(response)
                .code(200)
                .build();
    }

    @Operation(summary = "Get job tag", description = "Get all job tag")
    @GetMapping("/tags")
    public ApiResponse<List<TagDTO>> getTags() {
        List<TagDTO> list = tagService.getAllTags();
        return ApiResponse.<List<TagDTO>>builder()
                .data(list)
                .message("Get all tags successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Get city tag", description = "Get all city tag")
    @GetMapping("/cities")
    public ApiResponse<List<CityDTO>> getCities() {
        List<CityDTO> list = cityService.getAllCity();
        return ApiResponse.<List<CityDTO>>builder()
                .data(list)
                .message("Get all city tags successfully")
                .code(200)
                .build();
    }

    @Operation(summary = "Upload image", description = "Upload image to Cloudinary and get back url")
    @PostMapping(value = "/image")
    public ApiResponse<String> uploadFile(
            @RequestPart("file") MultipartFile file) throws IOException {
        String url = cloudinaryService.uploadFile(file);
        return ApiResponse.<String>builder()
                .code(200)
                .data(url)
                .message("Uploaded image to Cloudinary")
                .build();
    }
}
