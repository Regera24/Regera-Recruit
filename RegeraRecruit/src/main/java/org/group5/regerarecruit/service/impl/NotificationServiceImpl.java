package org.group5.regerarecruit.service.impl;

import java.util.List;

import org.group5.regerarecruit.converter.NotificationConverter;
import org.group5.regerarecruit.dto.NotificationDTO;
import org.group5.regerarecruit.dto.request.SendNotificationRequest;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Notification;
import org.group5.regerarecruit.enums.NotificationType;
import org.group5.regerarecruit.exception.AppException;
import org.group5.regerarecruit.exception.ErrorCode;
import org.group5.regerarecruit.repository.AccountRepository;
import org.group5.regerarecruit.repository.NotificationRepository;
import org.group5.regerarecruit.service.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final AccountRepository accountRepository;
    private final NotificationConverter notificationConverter;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void sendNotification(SendNotificationRequest request) {
        NotificationDTO notification = saveNotification(request);
        messagingTemplate.convertAndSendToUser(request.getTargetUsername(), "/private", notification);
    }

    @Override
    public NotificationDTO saveNotification(SendNotificationRequest request) {
        Notification notification = new Notification();

        String sendUsername =
                SecurityContextHolder.getContext().getAuthentication().getName();
        Account sendUser = accountRepository
                .findByUsername(sendUsername)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Account targetUser = accountRepository
                .findByUsername(request.getTargetUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        notification.setUser(sendUser);
        notification.setTargetUser(targetUser);
        notification.setMessage(request.getMessage());
        notification.setRead(false);
        notification.setType(NotificationType.valueOf(request.getType()));

        return notificationConverter.toDto(notificationRepository.save(notification));
    }

    @Override
    public PageResponse<NotificationDTO> getNotifications(int pageNo, int pageSize) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Account acc = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Notification> list = notificationRepository.findByTargetUser(acc, pageable);
        List<NotificationDTO> listDto =
                list.stream().map(notificationConverter::toDto).toList();

        return PageResponse.<NotificationDTO>builder()
                .data(listDto)
                .pageSize(pageSize)
                .pageNo(pageNo)
                .totalPages((long) list.getTotalPages())
                .build();
    }
}
