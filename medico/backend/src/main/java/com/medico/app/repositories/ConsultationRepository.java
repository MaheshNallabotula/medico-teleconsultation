package com.medico.app.repositories;

import com.medico.app.entities.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation , Long> {


    Optional<List<Consultation>> findConsultationByPatient_PatientID(Long patientId);

    Optional<List<Consultation>> findConsultationByDoctor_DocId(Long docId);
}
