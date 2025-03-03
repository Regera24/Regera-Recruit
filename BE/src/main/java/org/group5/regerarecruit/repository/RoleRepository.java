package org.group5.regerarecruit.repository;

import java.util.Optional;

import org.group5.regerarecruit.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    public Optional<Role> findByCode(String name);
}
