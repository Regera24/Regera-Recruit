package org.group5.regerarecruit.service;

import org.group5.regerarecruit.dto.NotificationDTO;
import org.group5.regerarecruit.dto.request.SendNotificationRequest;
import org.group5.regerarecruit.dto.response.PageResponse;
import org.springframework.stereotype.Service;

@Service
public interface NotificationService {
    public void sendNotification(SendNotificationRequest request);

    public NotificationDTO saveNotification(SendNotificationRequest request);

    public PageResponse<NotificationDTO> getNotifications(int pageNo, int pageSize);
}
