package org.group5.regerarecruit.repository;

import java.util.Optional;

import org.group5.regerarecruit.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    public Optional<Account> findByUsername(String username);

    public boolean existsByUsername(String username);

    public boolean existsByEmail(String email);

    public boolean existsByPhoneNumber(String phoneNumber);

    public Optional<Account> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Account a SET a.OTP = NULL WHERE a.id = :accountID")
    void clearOTP(Long accountID);
}
