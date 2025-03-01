package org.group5.regerarecruit.repository;

import java.util.List;
import java.util.Optional;

import org.group5.regerarecruit.dto.ApplyJobDTO;
import org.group5.regerarecruit.entity.ApplyJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyJobRepository extends JpaRepository<ApplyJob, Long> {
    @Query(
            value =
                    "SELECT a.id AS id, a.candidateTitle AS candidateTitle, a.jobTitle AS jobTitle, a.jobImage AS jobImage "
                            + "FROM ApplyJob a WHERE a.candidateId =:id")
    List<ApplyJobDTO> getListApplyJobByCandidateId(@Param("id") Long id);

    @Query(
            value =
                    "SELECT a.id AS id, a.candidateTitle AS candidateTitle, a.jobTitle AS jobTitle, a.jobImage AS jobImage "
                            + "FROM ApplyJob a WHERE a.jobId =:id")
    List<ApplyJobDTO> getListApplyJobByJobId(@Param("id") Long id);

    @Query("SELECT new org.group5.regerarecruit.dto.ApplyJobDTO(" + "a.id, a.createdAt, a.cvId, a.candidateId, "
            + "a.candidateName, a.candidateAddress, a.candidateDescription, "
            + "a.candidateEmail, a.candidateExp, a.candidateBirthDate, "
            + "a.candidatePhoneNumber, a.candidateStudy, a.candidateLinkProject, "
            + "a.candidateTitle, a.candidateImg, a.candidateSkills) "
            + "FROM ApplyJob a WHERE a.cvId =:cvId AND a.jobId =:jobId")
    Optional<ApplyJobDTO> findByCvIdAndJobId(@Param("cvId") Long cvId, @Param("jobId") Long jobId);

    public boolean existsByJobIdAndCvId(Long jobId, Long cvId);
}
