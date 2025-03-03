package org.group5.regerarecruit.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import org.group5.regerarecruit.enums.JobType;
import org.group5.regerarecruit.enums.OpenStatus;
import org.group5.regerarecruit.enums.PostedStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Job")
public class Job extends AbstractEntity {
    @Column(name = "title")
    private String title;

    @Column(name = "fromSalary")
    private Double fromSalary;

    @Column(name = "toSalary")
    private Double toSalary;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    private OpenStatus openStatus;

    @Column(name = "jobImage")
    private String jobImage;

    @Enumerated(EnumType.STRING)
    private PostedStatus postedStatus;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "companyId")
    private Company company;

    @OneToMany(
            mappedBy = "job",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.LAZY)
    private List<SavedJob> savedJobEntities = new ArrayList<>();

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "includeCity",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "city_id"))
    private List<City> cities = new ArrayList<>();

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "includeTag",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags = new ArrayList<>();
}
