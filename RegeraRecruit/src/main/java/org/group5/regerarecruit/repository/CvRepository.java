package org.group5.regerarecruit.repository;

import java.util.List;

import org.group5.regerarecruit.entity.Candidate;
import org.group5.regerarecruit.entity.Cv;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvRepository extends JpaRepository<Cv, Long> {
    public List<Cv> findByCandidate(Candidate candidate);
}
