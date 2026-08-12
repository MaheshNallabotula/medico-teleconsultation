package com.medico.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "hospitals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hospital_id")
    private Long hospitalId;

    @Column(name = "name")
    private String hospitalName;

    @Column(name = "address")
    private String hospitalAddress;

    @Column(name = "phone_no")
    private String hospitalPhoneNo;

    @Column(name = "email_id")
    private String hospitalEmailId;

    @OneToOne(mappedBy = "hospital")
    @JsonIgnore
    private Admin admin;

    @JsonIgnore
    @OneToMany(mappedBy = "hospital")
    private Set<Doctor> doctors;

    @Column(name = "rating")
    private Double rating;

}
