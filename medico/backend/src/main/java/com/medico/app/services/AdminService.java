package com.medico.app.services;

import com.medico.app.dto.AcceptDoctorDto;
import com.medico.app.dto.AssignJrDoctorDto;
import com.medico.app.dto.DoctorDTO;
import com.medico.app.entities.Admin;
import com.medico.app.entities.Doctor;
import com.medico.app.repositories.AdminRepository;
import com.medico.app.repositories.DoctorRepository;
import com.medico.app.repositories.HospitalRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final HospitalRepository hospitalRepository;
    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;


    public AdminService(HospitalRepository hospitalRepository, AdminRepository adminRepository, DoctorRepository doctorRepository) {
        this.hospitalRepository = hospitalRepository;
        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
    }


    public List<Doctor> getDoctorsOfHospital(Long adminId){
        Optional<Admin> adminOptional = this.adminRepository.findById(adminId);
        if(adminOptional.isPresent()){
            Admin admin = adminOptional.get();
            Optional<List<Doctor>> doctorsByHospitalId = this.hospitalRepository.findDoctorsByHospitalId(admin.getHospital().getHospitalId());
            if(doctorsByHospitalId.isPresent()){
                return doctorsByHospitalId.get().stream().filter(Doctor::getIsActive).collect(Collectors.toList());
            }
        }
        return new ArrayList<>();
    }

    public Doctor removeDoctorFromHospital(Long adminId, Long docId) {
        Admin admin = adminRepository.findById(adminId).orElseThrow();
        Doctor doctor = doctorRepository.findById(docId).orElseThrow();
        if(admin.getHospital().getHospitalId().equals(doctor.getHospital().getHospitalId())){
            doctor.setHospital(null);
            doctor.setIsActive(Boolean.FALSE);
            doctorRepository.save(doctor);
        }
        return doctor;
    }
    public String acceptOrRejectDoctor(AcceptDoctorDto doctorDto) {
        Doctor doctor = doctorRepository.findById(doctorDto.getDocId()).orElseThrow();
        if(doctorDto.getAccept()){
            doctor.setIsActive(Boolean.TRUE);
            doctorRepository.save(doctor);
            return String.format("Doctor %s is accepted", doctor.getDocName());
        }else{
            doctor.setIsActive(Boolean.FALSE);
            doctor.setHospital(null);
            doctorRepository.save(doctor);
            return String.format("Doctor %s is rejected", doctor.getDocName());
        }
    }

    public String assignJrDoctorsToSrDoctor(AssignJrDoctorDto assignJrDoctorDto) {
        Doctor srDoctor = doctorRepository.findById(assignJrDoctorDto.getSrDoctorId()).orElseThrow();
        srDoctor.setIsSenior(Boolean.TRUE);
        assignJrDoctorDto.getJrDoctorIds().forEach(jrDoctorId -> {
            if(srDoctor.getDocId() != jrDoctorId){
                Doctor doctor = doctorRepository.findById(jrDoctorId).orElseThrow();
                if(!doctor.getIsSenior()){
                    doctor.setSrDoctor(srDoctor);
                    doctorRepository.save(doctor);
                }
            }
        });
        return "Assigned doctors successfully";
    }

    public List<Doctor> getAppliedDoctorsList(Long adminId) {
        Admin admin = adminRepository.findById(adminId).orElseThrow();
        Optional<List<Doctor>> doctorsByHospitalIdOptional = hospitalRepository.findDoctorsByHospitalId(admin.getHospital().getHospitalId());
        if(doctorsByHospitalIdOptional.isPresent()){
            return doctorsByHospitalIdOptional.get().stream().filter(doctor -> !doctor.getIsActive()).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    public DoctorDTO appointSrDoctor(Long docId) {
        Doctor doctor = doctorRepository.findById(docId).orElseThrow();
        doctor.setIsSenior(Boolean.TRUE);
        doctorRepository.save(doctor);
        return new DoctorDTO(doctor);
    }
}
