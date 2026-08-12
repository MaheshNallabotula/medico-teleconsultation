package com.medico.app.services;

import com.medico.app.entities.Hospital;
import com.medico.app.entities.Speciality;
import com.medico.app.repositories.HospitalRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HospitalService {
    private final HospitalRepository hospitalRepository;

    public HospitalService(HospitalRepository hospitalRepository){
        this.hospitalRepository = hospitalRepository;
    }

    public List<Hospital> getAllHospitals(){ return hospitalRepository.findAll() ;}

    public Set<Speciality> getAllSpecialityByHospital(Long hospitalId){
        Optional<Hospital> hospitalOptional = this.hospitalRepository.findById(hospitalId);
        Set<Speciality> specialities = new HashSet<>();
        if (hospitalOptional.isPresent()){
            Hospital hospital = hospitalOptional.get();
            hospital.getDoctors().forEach(doc -> {
                specialities.add(doc.getSpeciality());
            });
        }
        return specialities;

    }



}
