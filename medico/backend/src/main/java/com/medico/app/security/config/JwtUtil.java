package com.medico.app.security.config;

import com.medico.app.entities.*;
import com.medico.app.repositories.AdminTokenRepository;
import com.medico.app.repositories.DoctorTokenRepository;
import com.medico.app.repositories.PatientTokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtUtil {

    private final String SECRET_KEY = "76b26c43c6e538ed9bcadfdccdab03af2f00e072a3848654af07c58726aebbfa";
    private final long VALIDITY = 5*60*60;

    private final PatientTokenRepository patientTokenRepository;
    private final DoctorTokenRepository doctorTokenRepository;
    private final AdminTokenRepository adminTokenRepository;

    public JwtUtil(PatientTokenRepository patientTokenRepository, DoctorTokenRepository doctorTokenRepository, AdminTokenRepository adminTokenRepository) {
        this.patientTokenRepository = patientTokenRepository;
        this.doctorTokenRepository = doctorTokenRepository;
        this.adminTokenRepository = adminTokenRepository;
    }

    public String extractEmailFromToken(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRoleFromToken(String token){
        return extractClaim(token, claims -> claims.get("roles", String.class));
    }

    public boolean isValid(String token, UserDetails userDetails){
        String email = extractEmailFromToken(token);
        boolean isLoggedOut = Boolean.TRUE;

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_"+Role.ADMIN.name()));

        boolean isDoctor = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_"+Role.DOCTOR.name()));

        boolean isPatient = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_"+Role.PATIENT.name()));

        if (isAdmin)
            isLoggedOut = this.isTokenLoggedOut(token, Role.ADMIN);
        else if (isDoctor)
            isLoggedOut = this.isTokenLoggedOut(token, Role.DOCTOR);
        else if(isPatient)
            isLoggedOut = this.isTokenLoggedOut(token, Role.PATIENT);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token) && !isLoggedOut;
    }

    private boolean isTokenExpired(String token) {
        return extractExpirationFromToken(token).before(new Date());
    }

    private boolean isTokenLoggedOut(String token, Role role) {
        Boolean isLoggedOut = Boolean.TRUE;
        if(role == Role.ADMIN){
            Optional<AdminToken> adminTokenOptional = adminTokenRepository.findAdminTokenByToken(token);
            if(adminTokenOptional.isPresent()){
                AdminToken adminToken = adminTokenOptional.get();
                isLoggedOut = adminToken.getIsLoggedOut();
            }
        } else if (role == Role.DOCTOR) {
            Optional<DoctorToken> doctorTokenOptional = doctorTokenRepository.findDoctorTokenByToken(token);
            if(doctorTokenOptional.isPresent()){
                DoctorToken doctorToken = doctorTokenOptional.get();
                isLoggedOut = doctorToken.getIsLoggedOut();
            }
        } else if (role == Role.PATIENT) {
            Optional<PatientToken> patientTokenOptional = patientTokenRepository.findPatientTokenByToken(token);
            if(patientTokenOptional.isPresent()){
                PatientToken patientToken = patientTokenOptional.get();
                isLoggedOut = patientToken.getIsLoggedOut();
            }
        }
        return isLoggedOut;
    }
    public Date extractExpirationFromToken(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver){
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public String generateToken(Authentication authentication){
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        return Jwts
                .builder()
                .subject(authentication.getName())
                .claim("roles", authorities)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + VALIDITY*1000))
                .signWith(getSigningKey())
                .compact();
    }
    private SecretKey getSigningKey(){
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
