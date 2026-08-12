package com.medico.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "speciality")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Speciality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "speciality_id")
    private Long specialityId;

    @Column(name = "speciality_name")
    private String specialityName;

    @Column(name = "speciality_image")
    private String specialityImage;

    @JsonIgnore
    @OneToMany(mappedBy = "speciality")
    private Set<Doctor> doctors;

    @Column(name = "description")
    private String description;

}
