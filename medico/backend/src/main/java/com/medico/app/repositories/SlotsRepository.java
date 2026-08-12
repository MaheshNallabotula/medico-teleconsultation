package com.medico.app.repositories;

import com.medico.app.entities.Slots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SlotsRepository extends JpaRepository<Slots, Long> {

    Optional<List<Slots>> getSlotsByDoctor_DocId(Long docId);
}
