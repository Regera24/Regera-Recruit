package org.group5.regerarecruit.repository;

import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    public Page<Notification> findByTargetUser(Account account, Pageable pageable);
}
