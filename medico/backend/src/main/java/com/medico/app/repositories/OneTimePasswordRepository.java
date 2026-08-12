package com.medico.app.repositories;

import com.medico.app.entities.OneTimePassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OneTimePasswordRepository extends JpaRepository<OneTimePassword, Long> {

    Optional<OneTimePassword> findOneTimePasswordByPatient_PatientID(Long id);
}
