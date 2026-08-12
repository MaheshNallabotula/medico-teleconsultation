package com.medico.app.security.config;

import com.medico.app.entities.AdminToken;
import com.medico.app.entities.DoctorToken;
import com.medico.app.entities.PatientToken;
import com.medico.app.entities.Role;
import com.medico.app.repositories.AdminTokenRepository;
import com.medico.app.repositories.DoctorTokenRepository;
import com.medico.app.repositories.PatientTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomLogoutHandler implements LogoutHandler {

    private final AdminTokenRepository adminTokenRepository;
    private final DoctorTokenRepository doctorTokenRepository;
    private final PatientTokenRepository patientTokenRepository;
    private final JwtUtil jwtUtil;

    public CustomLogoutHandler(AdminTokenRepository adminTokenRepository, DoctorTokenRepository doctorTokenRepository, PatientTokenRepository patientTokenRepository, JwtUtil jwtUtil) {
        this.adminTokenRepository = adminTokenRepository;
        this.doctorTokenRepository = doctorTokenRepository;
        this.patientTokenRepository = patientTokenRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }
        String token = authHeader.substring(7);
        String role = jwtUtil.extractRoleFromToken(token).substring(5);

        if(role.equals(Role.ADMIN.name())){
            AdminToken adminToken= adminTokenRepository.findAdminTokenByToken(token).orElse(null);
            if(adminToken != null){
                adminToken.setIsLoggedOut(true);
                adminTokenRepository.save(adminToken);
            }
        }else if(role.equals(Role.DOCTOR.name())){
            DoctorToken doctorToken = doctorTokenRepository.findDoctorTokenByToken(token).orElse(null);
            if(doctorToken != null){
                doctorToken.setIsLoggedOut(true);
                doctorTokenRepository.save(doctorToken);
            }
        } else if (role.equals(Role.PATIENT.name())) {
            PatientToken patientToken = patientTokenRepository.findPatientTokenByToken(token).orElse(null);
            if(patientToken != null){
                patientToken.setIsLoggedOut(true);
                patientTokenRepository.save(patientToken);
            }

        }
    }
}
