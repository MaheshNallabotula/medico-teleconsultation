package com.medico.app.repositories;

import com.medico.app.entities.PatientToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientTokenRepository extends JpaRepository<PatientToken, Long> {

    Optional<List<PatientToken>> findAllByPatient_PatientID(Long patientID);

    Optional<PatientToken> findPatientTokenByToken(String token);
}
