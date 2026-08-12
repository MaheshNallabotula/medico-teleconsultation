package com.medico.app.repositories;

import com.medico.app.entities.AdminToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminTokenRepository extends JpaRepository<AdminToken, Long> {

    Optional<List<AdminToken>> findAllByAdmin_AdminId(Long adminId);

    Optional<AdminToken> findAdminTokenByToken(String token);
}
