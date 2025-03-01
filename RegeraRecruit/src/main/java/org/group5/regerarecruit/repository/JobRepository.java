package org.group5.regerarecruit.repository;

import org.group5.regerarecruit.entity.Job;
import org.group5.regerarecruit.enums.OpenStatus;
import org.group5.regerarecruit.enums.PostedStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j WHERE j.openStatus = :openStatus AND j.postedStatus = :postedStatus")
    Page<Job> getAllJobAcceptedAndOpen(
            @Param("openStatus") OpenStatus openStatus,
            @Param("postedStatus") PostedStatus postedStatus,
            Pageable pageable);
}
