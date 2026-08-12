package com.medico.app.repositories;

import com.medico.app.entities.Doctor;
import com.medico.app.entities.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    @Query("SELECT d FROM Hospital h INNER JOIN Doctor d ON d.hospital.hospitalId=h.hospitalId")
    Optional<List<Doctor>> findDoctorsByHospitalId(Long hospitalId);

    Optional<Hospital> findHospitalByHospitalEmailId(String emailId);
}
