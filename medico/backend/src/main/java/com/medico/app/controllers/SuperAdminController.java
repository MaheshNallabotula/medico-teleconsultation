package com.medico.app.controllers;

import com.medico.app.dto.AddHospitalDto;
import com.medico.app.entities.Hospital;
import com.medico.app.entities.Speciality;
import com.medico.app.extras.dto.SpecialityDto;
import com.medico.app.services.SuperAdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/superAdmin")
public class SuperAdminController {

    private final SuperAdminService superAdminService;

    public SuperAdminController(SuperAdminService superAdminService) {
        this.superAdminService = superAdminService;
    }

    @PostMapping(path = "/addHospital")
    public ResponseEntity<Hospital> addHospital(@RequestBody AddHospitalDto hospitalDto) {
        return new ResponseEntity<>(superAdminService.addHospital(hospitalDto), HttpStatus.OK);
    }

    @PostMapping(path = "/addSpeciality")
    public ResponseEntity<Speciality> addSpeciality(@RequestBody SpecialityDto specialityDto) {
        return new ResponseEntity<>(superAdminService.addSpeciality(specialityDto), HttpStatus.OK);
    }

    @PostMapping(path = "/addHospitals")
    public ResponseEntity<List<Hospital>> addHospitals(@RequestBody List<AddHospitalDto> hospitalDtos) {
        return new ResponseEntity<>(superAdminService.addHospitals(hospitalDtos), HttpStatus.OK);
    }

    @PostMapping(path = "/addSpecialities")
    public ResponseEntity<List<Speciality>> addSpecialities(@RequestBody List<SpecialityDto> specialityDtos) {
        return new ResponseEntity<>(superAdminService.addSpecialities(specialityDtos), HttpStatus.OK);
    }
}
