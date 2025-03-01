package org.group5.regerarecruit.repository;

import java.util.Optional;

import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    public Optional<Candidate> findByAccount(Account account);
}
