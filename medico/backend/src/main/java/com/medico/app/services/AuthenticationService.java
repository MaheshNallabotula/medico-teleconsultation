package com.medico.app.services;

import com.medico.app.dto.*;
import com.medico.app.entities.*;
import com.medico.app.repositories.*;
import com.medico.app.security.config.JwtUtil;
import com.medico.app.security.services.CustomUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final AdminRepository adminRepository;
    private final SpecialityRepository specialityRepository;
    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final AdminTokenRepository adminTokenRepository;
    private final PatientTokenRepository patientTokenRepository;
    private final DoctorTokenRepository doctorTokenRepository;

    public AuthenticationService(AdminRepository adminRepository, SpecialityRepository specialityRepository, HospitalRepository hospitalRepository, DoctorRepository doctorRepository, PatientRepository patientRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService, AdminTokenRepository adminTokenRepository, PatientTokenRepository patientTokenRepository, DoctorTokenRepository doctorTokenRepository) {
        this.adminRepository = adminRepository;
        this.specialityRepository = specialityRepository;
        this.hospitalRepository = hospitalRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.adminTokenRepository = adminTokenRepository;
        this.patientTokenRepository = patientTokenRepository;
        this.doctorTokenRepository = doctorTokenRepository;
    }

    public RegisterResponse registerAdmin(Admin request){
        Admin admin = new Admin();
        admin.setAdminEmail(request.getAdminEmail());
        admin.setAdminName(request.getAdminName());
        admin.setAdminPassword(passwordEncoder.encode(request.getAdminPassword()));
        admin.setRole(Role.ADMIN);

        admin = adminRepository.save(admin);

        return new RegisterResponse(admin.getAdminEmail(), String.format("Admin %s is successfully registered",admin.getAdminEmail()));
    }

    public LoginResponse authenticateAdmin(LoginRequest request){
        userDetailsService.setRole(Role.ADMIN);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Admin admin = adminRepository.getAdminByAdminEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Admin not found !!!"));
        String token = jwtUtil.generateToken(authentication);

        Optional<List<AdminToken>> prevAdminTokensOptional = adminTokenRepository.findAllByAdmin_AdminId(admin.getAdminId());
        if(prevAdminTokensOptional.isPresent()){
            List<AdminToken> prevAdminTokens = prevAdminTokensOptional.get();
            prevAdminTokens.forEach(t -> {
                t.setIsLoggedOut(true);
            });
            adminTokenRepository.saveAll(prevAdminTokens);
        }

        AdminToken adminToken = new AdminToken();
        adminToken.setToken(token);
        adminToken.setIsLoggedOut(false);
        adminToken.setAdmin(admin);
        adminTokenRepository.save(adminToken);
        return new LoginResponse(admin.getAdminEmail(), admin.getAdminId(), token);
    }

    public RegisterResponse registerDoctor(DoctorRegisterDto request){
        Optional<Doctor> doctorOptional = doctorRepository.getDoctorByEmail(request.getEmail());
        if(doctorOptional.isPresent()){
            return new RegisterResponse(doctorOptional.get().getEmail(), String.format("Doctor with email id %s already exists",request.getEmail()));
        }
        Doctor doctor = new Doctor();
        doctor.setDocName(request.getDocName());
        doctor.setDocDob(request.getDocDob());
        doctor.setPhoneNo(request.getPhoneNo());
        doctor.setGender(request.getGender());
        doctor.setRate(request.getRate());
        doctor.setRating(0.0);
        doctor.setProfilePicture(request.getProfilePicture());
        doctor.setEmail(request.getEmail());
        doctor.setPassword(passwordEncoder.encode(request.getPassword()));
        doctor.setRole(Role.DOCTOR);

        doctor.setSrDoctor(null);
        doctor.setIsSenior(Boolean.FALSE);

        Optional<Speciality> optionalSpeciality = specialityRepository.findById(request.getSpecialityId());
        if(optionalSpeciality.isPresent()){
            Speciality speciality = optionalSpeciality.get();
            doctor.setSpeciality(speciality);
        }

//        Optional<Hospital> optionalHospital = hospitalRepository.findById(request.getHospitalId());
//        if(optionalHospital.isPresent()){
//            Hospital hospital = optionalHospital.get();
//            doctor.setHospital(hospital);
//        }



        doctor.setIsActive(Boolean.FALSE);

        doctor = doctorRepository.save(doctor);

        return new RegisterResponse(doctor.getEmail(), String.format("Doctor %s is successfully registered", doctor.getEmail()));

    }

    public LoginResponse authenticateDoctor(LoginRequest request){
        userDetailsService.setRole(Role.DOCTOR);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Doctor doctor = doctorRepository.getDoctorByEmail(request.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(authentication);

        Optional<List<DoctorToken>> prevDoctorTokensOptional = doctorTokenRepository.findAllByDoctor_DocId(doctor.getDocId());
        if(prevDoctorTokensOptional.isPresent()){
            List<DoctorToken> prevDoctorTokens = prevDoctorTokensOptional.get();
            prevDoctorTokens.forEach(t -> {
                t.setIsLoggedOut(true);
            });
            doctorTokenRepository.saveAll(prevDoctorTokens);
        }

        DoctorToken doctorToken = new DoctorToken();
        doctorToken.setToken(token);
        doctorToken.setIsLoggedOut(false);
        doctorToken.setDoctor(doctor);
        doctorTokenRepository.save(doctorToken);
        return new LoginResponse(doctor.getEmail(), doctor.getDocId(), token);
    }

    public RegisterResponse registerPatient(PatientRegisterDto request){
        Patient patient = new Patient();
        patient.setPatName(request.getPatName());
        patient.setPatDob(request.getPatDob());
        patient.setPatBloodGroup(request.getBloodGroup());
        patient.setPatPhoneNo(request.getPhoneNo());
        patient.setPatGender(request.getGender());
        patient.setPatEmail(request.getEmail());
        patient.setPatPassword(passwordEncoder.encode(request.getPassword()));
        patient.setRole(Role.PATIENT);

        patient = patientRepository.save(patient);

        return new RegisterResponse(patient.getPatEmail(), String.format("Patient %s is successfully registered", patient.getPatEmail()));

    }

    public LoginResponse authenticatePatient(LoginRequest request){
        userDetailsService.setRole(Role.PATIENT);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        Patient patient = patientRepository.getPatientByPatEmail(request.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(authentication);

        Optional<List<PatientToken>> prevPatientTokensOptional = patientTokenRepository.findAllByPatient_PatientID(patient.getPatientID());
        if(prevPatientTokensOptional.isPresent()){
            List<PatientToken> prevPatientTokens = prevPatientTokensOptional.get();
            prevPatientTokens.forEach(t -> {
                t.setIsLoggedOut(true);
            });
            patientTokenRepository.saveAll(prevPatientTokens);
        }
        PatientToken patientToken = new PatientToken();
        patientToken.setToken(token);
        patientToken.setIsLoggedOut(false);
        patientToken.setPatient(patient);
        patientTokenRepository.save(patientToken);
        return new LoginResponse(patient.getPatEmail(), patient.getPatientID(), token);
    }
}
