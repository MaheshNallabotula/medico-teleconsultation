package com.medico.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "patient")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long patientID;

    @Column(name = "patient_name")
    private String patName;

    @Column(name = "date_of_birth")
    private LocalDate patDob;

    @Column(name = "blood_group")
    private String patBloodGroup;

    @Column(name = "phone_no")
    private String patPhoneNo;

    @Column(name = "gender")
    private char patGender;

    @Column(name = "email_id")
    private String patEmail;

    @Column(name = "password")
    @JsonIgnore
    private String patPassword;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "id")
    private List<PatientFiles> patientFiles;

    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private Set<Consultation> consultations;

    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private List<PatientToken> tokens;

    @OneToOne(mappedBy = "patient")
    private Socket socket;

    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private List<OneTimePassword> oneTimePasswords;

}
