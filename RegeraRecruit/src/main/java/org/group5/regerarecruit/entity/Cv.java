package org.group5.regerarecruit.entity;

import java.time.LocalDate;

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
@Table(name = "cv")
public class Cv extends AbstractEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "BirthDate")
    private LocalDate birthDate;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "exp")
    private String exp;

    @Column(name = "description")
    private String description;

    @Column(name = "study")
    private String study;

    @Column(name = "linkProject")
    private String linkProject;

    @Column(name = "title")
    private String title;

    @Column(name = "img")
    private String img;

    @Column(name = "skills")
    private String skills;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "candidateId")
    private Candidate candidate;
}
