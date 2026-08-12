package com.medico.app.repositories;

import com.medico.app.entities.Socket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SocketRepository extends JpaRepository<Socket, Long> {

    Optional<Socket> findSocketByDoctor_DocId(Long docId);

    Optional<Socket> findSocketByPatient_PatientID(Long patientId);
}
