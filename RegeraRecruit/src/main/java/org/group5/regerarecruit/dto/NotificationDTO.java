package org.group5.regerarecruit.dto;

import java.time.LocalDateTime;

import org.group5.regerarecruit.enums.NotificationType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationDTO {
    Long id;
    LocalDateTime createdAt;
    NotificationType type;
    String message;
    boolean isRead;
    String senderName;
    String senderImage;
}
