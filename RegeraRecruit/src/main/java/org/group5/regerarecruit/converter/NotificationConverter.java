package org.group5.regerarecruit.converter;

import org.group5.regerarecruit.dto.NotificationDTO;
import org.group5.regerarecruit.entity.Notification;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationConverter {
    private final ModelMapper modelMapper;

    public NotificationDTO toDto(Notification notification) {
        NotificationDTO dto = modelMapper.map(notification, NotificationDTO.class);
        dto.setSenderName(notification.getUser().getUsername());
        return dto;
    }
}
