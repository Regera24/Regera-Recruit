package org.group5.regerarecruit.controller.candidate;

import java.util.List;

import jakarta.validation.Valid;

import org.group5.regerarecruit.dto.CandidateDTO;
import org.group5.regerarecruit.dto.CvDTO;
import org.group5.regerarecruit.dto.request.candidate.ApplyRequest;
import org.group5.regerarecruit.dto.request.candidate.CandidateUpdateRequest;
import org.group5.regerarecruit.dto.request.cv.CvCreationRequest;
import org.group5.regerarecruit.dto.request.cv.CvUpdateRequest;
import org.group5.regerarecruit.dto.response.ApiResponse;
import org.group5.regerarecruit.service.ApplyJobService;
import org.group5.regerarecruit.service.CandidateService;
import org.group5.regerarecruit.service.CvService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/candidate")
@RequiredArgsConstructor
public class CandidateController {
    private final CandidateService candidateService;
    private final CvService cvService;
    private final ApplyJobService applyJobService;

    @Operation(summary = "Get Candidate Info", description = "Get candidate information")
    @GetMapping(value = "/info")
    public ApiResponse<CandidateDTO> getCandidateInfo() {
        CandidateDTO candidateDTO = candidateService.getCandidateInfo();
        return ApiResponse.<CandidateDTO>builder()
                .code(200)
                .data(candidateDTO)
                .message("Get information successfully")
                .build();
    }

    @Operation(summary = "Update candidate info", description = "Update candidate information")
    @PatchMapping(value = "")
    public ApiResponse<Void> updateCandidateInfo(@RequestBody @Valid CandidateUpdateRequest request) {
        candidateService.updateCandidate(request);
        return ApiResponse.<Void>builder()
                .code(204)
                .message("Update information successfully")
                .build();
    }

    @Operation(summary = "Get CVs", description = "Get cvs by candidate")
    @GetMapping(value = "/cvs")
    public ApiResponse<List<CvDTO>> getCvByCandidate() {
        List<CvDTO> cvs = cvService.getCvByCandidate();
        return ApiResponse.<List<CvDTO>>builder()
                .message("Get cvs successfully")
                .data(cvs)
                .code(200)
                .build();
    }

    @Operation(summary = "Get Cv by Id", description = "Get cv by id")
    @GetMapping(value = "/cv/{id}")
    public ApiResponse<CvDTO> getCvById(@PathVariable Long id) {
        CvDTO cvDTO = cvService.getCvById(id);
        return ApiResponse.<CvDTO>builder()
                .code(200)
                .message("Get Cv successfully")
                .data(cvDTO)
                .build();
    }

    @Operation(summary = "Create Cv", description = "Create cv with CvCreationRequest")
    @PostMapping(value = "/cv")
    public ApiResponse<Void> createCv(@RequestBody @Valid CvCreationRequest request) {
        cvService.createCv(request);
        return ApiResponse.<Void>builder()
                .message("Create cv successfully")
                .code(201)
                .build();
    }

    @Operation(summary = "Update Cv", description = "Update cv with CvUpdateRequest")
    @PatchMapping(value = "/cv/{id}")
    public ApiResponse<Void> updateCv(@PathVariable Long id,@RequestBody @Valid CvUpdateRequest request) {
        cvService.updateCv(request, id);
        return ApiResponse.<Void>builder()
                .message("Update cv successfully")
                .code(204)
                .build();
    }

    @Operation(summary = "Apply job", description = "Apply job with apply request")
    @PostMapping(value = "/apply-job")
    public ApiResponse<Void> applyJob(@RequestBody @Valid ApplyRequest request) {
        applyJobService.addApplyJob(request);
        return ApiResponse.<Void>builder()
                .code(201)
                .message("Apply job successfully")
                .build();
    }

    @Operation(summary = "Check for apply job", description = "Check if cv has apply same job")
    @GetMapping(value = "/check-apply-job")
    public ApiResponse<Boolean> checkForApplyJob(
            @RequestParam(required = true) Long jobId, @RequestParam(required = true) Long cvId) {
        boolean check = !applyJobService.checkCvAndJob(cvId, jobId);
        return ApiResponse.<Boolean>builder()
                .code(200)
                .message("Check for apply job successfully")
                .data(check)
                .build();
    }
}
