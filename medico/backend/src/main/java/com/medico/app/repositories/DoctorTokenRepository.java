package com.medico.app.repositories;

import com.medico.app.entities.DoctorToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorTokenRepository extends JpaRepository<DoctorToken, Long> {

    Optional<List<DoctorToken>> findAllByDoctor_DocId(Long docId);

    Optional<DoctorToken> findDoctorTokenByToken(String token);
}
