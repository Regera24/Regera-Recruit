package org.group5.regerarecruit.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Company")
public class Company extends AbstractEntity {
    @Column(name = "companyName")
    private String companyName;

    @Column(name = "address")
    private String address;

    @Column(name = "detail")
    private String detail;

    @Column(name = "description")
    private String description;

    @Column(name = "img")
    private String img;

    @Column(name = "workTime")
    private String workTime;

    @Column(name = "website", unique = true)
    private String website;

    @OneToOne(mappedBy = "company")
    private Account account;

    @OneToMany(
            mappedBy = "company",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.LAZY)
    private List<Job> jobs = new ArrayList<>();

    @OneToMany(
            mappedBy = "company",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();
}
