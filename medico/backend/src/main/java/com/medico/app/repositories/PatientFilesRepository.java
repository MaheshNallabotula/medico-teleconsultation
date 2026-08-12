package com.medico.app.repositories;

import com.medico.app.entities.PatientFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientFilesRepository extends JpaRepository<PatientFiles, Long> {

        Optional<List<PatientFiles>> findPatientFilesByPatient_PatientID(Long patientId);
}
