package com.medico.app.controllers;

import com.medico.app.entities.Doctor;
import com.medico.app.entities.Speciality;
import com.medico.app.services.DoctorService;
import com.medico.app.services.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/home")
public class HomeController {

    private final SpecialityService specialityService;

    private final DoctorService doctorService;

    public HomeController(SpecialityService specialityService, DoctorService doctorService) {
        this.specialityService = specialityService;
        this.doctorService = doctorService;
    }

    @GetMapping(path = "/allSpecialities")
    public ResponseEntity<List<Speciality>> getAllSpecialities(){
        return new ResponseEntity<>(specialityService.getAllSpecialities(), HttpStatus.OK);
    }

    @GetMapping(path = "/docBySpeciality/{specialityId}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpeciality(@PathVariable Long specialityId){
        return new ResponseEntity<>(doctorService.getDoctorsBySpeciality(specialityId), HttpStatus.OK);
    }
}
