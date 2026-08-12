package com.medico.app.extras;

import com.medico.app.entities.*;
import com.medico.app.extras.dto.*;
import com.medico.app.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuxService {

    private final SpecialityRepository specialityRepository;
    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AdminRepository adminRepository;


    public AuxService(SpecialityRepository specialityRepository, HospitalRepository hospitalRepository, DoctorRepository doctorRepository,PatientRepository patientRepository ,AdminRepository adminRepository) {
        this.specialityRepository = specialityRepository;
        this.hospitalRepository = hospitalRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.adminRepository = adminRepository;
    }


    private void addSpeciality(List<SpecialityDto> specialityDtos) {
        specialityDtos.forEach(dto -> {
            Speciality speciality = new Speciality();
            speciality.setSpecialityName(dto.getSpecialityName());
            speciality.setDescription(dto.getDescription());
            this.specialityRepository.save(speciality);
        });
    }

    private void addDoctors(List<DoctorDto> doctorDtos){
        doctorDtos.forEach(dto -> {
            Doctor doctor = new Doctor();
            doctor.setDocName(dto.getDocName());
            doctor.setRating(0.0);
            doctor.setDocDob(dto.getDocDob());
            doctor.setPhoneNo(dto.getPhoneNo());
            doctor.setGender(dto.getGender());
            doctor.setRate(dto.getRate());
            doctor.setRating(dto.getRating());
            doctor.setEmail(dto.getEmail());
            doctor.setPassword(dto.getPassword());
            doctor.setRole(Role.DOCTOR);
            doctor.setSpeciality(this.specialityRepository.findById(dto.getSpecialityId()).orElseThrow());
            doctor.setHospital(this.hospitalRepository.findById(dto.getHospitalId()).orElseThrow());

            this.doctorRepository.save(doctor);
        });
    }

    private void addHospitals(List<HospitalDto> hospitalDtos){
        hospitalDtos.forEach(dto -> {
            Hospital hospital = new Hospital();
            hospital.setHospitalName(dto.getHospitalName());
            hospital.setHospitalAddress(dto.getHospitalAddress());
            hospital.setRating(0.0);
            this.hospitalRepository.save(hospital);
        });
    }
    private void addPatients(List<PatientDto> patientDtos){
        patientDtos.forEach(dto ->{
            Patient patient = new Patient();
            patient.setPatName(dto.getPatName());
            patient.setPatDob(dto.getPatDob());
            patient.setPatBloodGroup(dto.getBloodGroup());
            patient.setPatPhoneNo(dto.getPhoneNo());
            patient.setPatGender(dto.getGender());
            patient.setPatEmail(dto.getEmail());
            patient.setPatPassword(dto.getPassword());
            patient.setRole(Role.PATIENT);
            this.patientRepository.save(patient);
        });
    }

    private void addAdmins(List<AdminDto> adminDtos) {
        adminDtos.forEach(dto -> {
            Admin admin = new Admin();
            admin.setAdminName(dto.getAdminName());
            admin.setAdminEmail(dto.getAdminEmail());
            admin.setAdminPassword(dto.getAdminPassword());
            admin.setHospital(this.hospitalRepository.findById(dto.getHospitalId()).orElseThrow());
            admin.setRole(Role.ADMIN);
            this.adminRepository.save(admin);
        });
    }
    public void startup(StartupDto startupDto){
        this.addSpeciality(startupDto.getSpecialities());
        this.addHospitals(startupDto.getHospitals());
        this.addDoctors(startupDto.getDoctors());
        this.addPatients(startupDto.getPatients());
        this.addAdmins(startupDto.getAdmins());
    }

}
