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
@Table(name = "Account")
public class Account extends AbstractEntity {
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "phoneNumber", unique = true, nullable = false)
    private String phoneNumber;

    @Column(name = "OTP")
    private String OTP;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "refreshToken", columnDefinition = "VARCHAR(500)")
    private String refreshToken;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "idRole")
    private Role role;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "companyId")
    private Company company;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "candidateId")
    private Candidate candidate;

    @Column(name = "isActive")
    private Boolean isActive;

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Notification> sentNotifications = new ArrayList<>();

    @OneToMany(
            mappedBy = "targetUser",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Notification> notifications = new ArrayList<>();
}
