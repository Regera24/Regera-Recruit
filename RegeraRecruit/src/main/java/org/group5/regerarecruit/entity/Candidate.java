package org.group5.regerarecruit.entity;

import java.time.LocalDate;
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
@Table(name = "Candidate")
public class Candidate extends AbstractEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "BirthDate")
    private LocalDate birthDate;

    @Column(name = "Address")
    private String address;

    @Column(name = "avatar")
    private String avatar;

    @OneToOne(mappedBy = "candidate")
    private Account account;

    @OneToMany(
            mappedBy = "candidate",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<SavedJob> savedJob = new ArrayList<>();

    @OneToMany(
            mappedBy = "candidate",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(
            mappedBy = "candidate",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Cv> cvs = new ArrayList<>();
}
