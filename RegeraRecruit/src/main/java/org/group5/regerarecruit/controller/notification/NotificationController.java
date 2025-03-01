package org.group5.regerarecruit.controller.notification;

import jakarta.validation.Valid;

import org.group5.regerarecruit.dto.NotificationDTO;
import org.group5.regerarecruit.dto.request.SendNotificationRequest;
import org.group5.regerarecruit.dto.response.ApiResponse;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @Operation(summary = "Send Notification", description = "Send notification with send request")
    @PostMapping(value = "")
    public ApiResponse<Void> sendNotification(@RequestBody @Valid SendNotificationRequest request) {
        notificationService.sendNotification(request);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Send notification successfully")
                .build();
    }

    @Operation(summary = "Get Notification", description = "Get notification of an user with paging")
    @GetMapping(value = "")
    public ApiResponse<PageResponse<NotificationDTO>> getNotifications(
            @RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        PageResponse<NotificationDTO> response = notificationService.getNotifications(pageNo, pageSize);
        return ApiResponse.<PageResponse<NotificationDTO>>builder()
                .data(response)
                .message("Get notification successfully")
                .code(200)
                .build();
    }
}
