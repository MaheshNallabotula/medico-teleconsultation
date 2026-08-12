package com.medico.app.services;

import com.medico.app.entities.Doctor;
import com.medico.app.entities.Speciality;
import com.medico.app.repositories.SpecialityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialityService {

    @Autowired
    private SpecialityRepository specialityRepository;

    public List<Speciality> getAllSpecialities(){
        return specialityRepository.findAll();
    }

}
