package org.group5.regerarecruit.dto.request.candidate;

import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplyRequest {
    @NotNull
    private Long cvId;

    @NotNull
    private Long jobId;
}
