package org.group5.regerarecruit.repository;

import java.util.Optional;

import org.group5.regerarecruit.entity.Account;
import org.group5.regerarecruit.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    boolean existsByWebsite(String website);

    Optional<Company> getCompanyByAccount(Account account);
}
