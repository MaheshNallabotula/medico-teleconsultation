package com.medico.app.services;

import com.medico.app.dto.AddHospitalDto;
import com.medico.app.entities.Admin;
import com.medico.app.entities.Hospital;
import com.medico.app.entities.Role;
import com.medico.app.entities.Speciality;
import com.medico.app.extras.dto.SpecialityDto;
import com.medico.app.repositories.AdminRepository;
import com.medico.app.repositories.HospitalRepository;
import com.medico.app.repositories.SpecialityRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SuperAdminService {

    private final HospitalRepository hospitalRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;
    private final SpecialityRepository specialityRepository;

    public SuperAdminService(HospitalRepository hospitalRepository, PasswordEncoder passwordEncoder, AdminRepository adminRepository, SpecialityRepository specialityRepository) {
        this.hospitalRepository = hospitalRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminRepository = adminRepository;
        this.specialityRepository = specialityRepository;
    }

    public Hospital addHospital(AddHospitalDto hospitalDto) {
        Optional<Hospital> optionalHospital = hospitalRepository.findHospitalByHospitalEmailId(hospitalDto.getHospitalEmail());
        if (optionalHospital.isPresent()) {
            return optionalHospital.get();
        }else{
            Hospital hospital = new Hospital();
            hospital.setHospitalName(hospitalDto.getHospitalName());
            hospital.setHospitalEmailId(hospitalDto.getHospitalEmail());
            hospital.setHospitalAddress(hospitalDto.getHospitalAddress());
            hospital.setHospitalPhoneNo(hospitalDto.getHospitalPhoneNo());
            hospital = hospitalRepository.save(hospital);

            Admin admin = new Admin();
            admin.setAdminName("Admin_"+hospital.getHospitalName());
            admin.setAdminEmail(admin.getAdminName()+"@medico.com");
            admin.setAdminPassword(passwordEncoder.encode("password"));
            admin.setHospital(hospital);
            admin.setRole(Role.ADMIN);
            adminRepository.save(admin);

            return hospital;
        }
    }

    public Speciality addSpeciality(SpecialityDto specialityDto) {
        Optional<Speciality> optionalSpeciality = specialityRepository.findSpecialityBySpecialityName(specialityDto.getSpecialityName());
        if (optionalSpeciality.isPresent()) {
            return optionalSpeciality.get();
        }
        Speciality speciality = new Speciality();
        speciality.setSpecialityName(specialityDto.getSpecialityName());
        speciality.setDescription(specialityDto.getDescription());

        return specialityRepository.save(speciality);
    }

    public List<Hospital> addHospitals(List<AddHospitalDto> hospitalDtos) {
        List<Hospital> hospitals = new ArrayList<>();
        hospitalDtos.forEach(hospitalDto -> {
            Optional<Hospital> optionalHospital = hospitalRepository.findHospitalByHospitalEmailId(hospitalDto.getHospitalEmail());
            if (optionalHospital.isPresent()) {
                hospitals.add(optionalHospital.get());
            }else{
                Hospital hospital = new Hospital();
                hospital.setHospitalName(hospitalDto.getHospitalName());
                hospital.setHospitalEmailId(hospitalDto.getHospitalEmail());
                hospital.setHospitalAddress(hospitalDto.getHospitalAddress());
                hospital.setHospitalPhoneNo(hospitalDto.getHospitalPhoneNo());
                hospital = hospitalRepository.save(hospital);

                Admin admin = new Admin();
                admin.setAdminName("Admin_"+hospital.getHospitalName());
                admin.setAdminEmail(admin.getAdminName()+"@medico.com");
                admin.setAdminPassword(passwordEncoder.encode("password"));
                admin.setHospital(hospital);
                admin.setRole(Role.ADMIN);
                adminRepository.save(admin);

                hospitals.add(hospital);
            }
        });
        return hospitals;
    }

    public List<Speciality> addSpecialities(List<SpecialityDto> specialityDtos) {
        List<Speciality> specialities = new ArrayList<>();
        specialityDtos.forEach(specialityDto -> {
            Optional<Speciality> optionalSpeciality = specialityRepository.findSpecialityBySpecialityName(specialityDto.getSpecialityName());
            if (optionalSpeciality.isPresent()) {
                specialities.add(optionalSpeciality.get());
            }
            Speciality speciality = new Speciality();
            speciality.setSpecialityName(specialityDto.getSpecialityName());
            speciality.setDescription(specialityDto.getDescription());

            specialityRepository.save(speciality);
            specialities.add(speciality);
        });

        return specialities;
    }

}
