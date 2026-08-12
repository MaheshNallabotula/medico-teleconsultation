package com.medico.app.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "prescriptions")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Prescription{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prescription_id")
    private Long prescriptionId;

    @Column(name = "observations")
    private String observations;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "medicines")
    @OneToMany(mappedBy = "prescription")
    private List<MedicineAndDosage> medicinesAndDosage;

    @OneToOne(mappedBy = "prescription")
    private Consultation consultation;

}