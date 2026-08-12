package com.medico.app.repositories;

import com.medico.app.entities.Prescription;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    // @Query("SELECT p FROM Prescription p INNER JOIN MedicineAndDosage m ON p.medicinesAndDosage.medicineId = m.medicineId")
    // Optional<Prescription> findByPrescriptionId(Long prescriptionId);
}
