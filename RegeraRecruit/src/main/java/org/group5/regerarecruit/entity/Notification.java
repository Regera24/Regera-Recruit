package org.group5.regerarecruit.entity;

import jakarta.persistence.*;

import org.group5.regerarecruit.enums.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Notification")
public class Notification extends AbstractEntity {
    @Column(name = "message")
    private String message;

    @Column(name = "isRead")
    private boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private NotificationType type;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "userId")
    private Account user;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "targerUserId")
    private Account targetUser;
}
