package com.medico.app.repositories;

import com.medico.app.entities.MedicineAndDosage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineAndDosageRepository extends JpaRepository<MedicineAndDosage, Long> {
}
