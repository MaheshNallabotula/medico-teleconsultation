package com.medico.app.repositories;

import com.medico.app.entities.DoctorFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorFilesRepository extends JpaRepository<DoctorFiles, Long> {

    Optional<List<DoctorFiles>> findDoctorFilesByDoctor_DocId(Long docId);
}
