package com.medico.app.controllers;

import com.medico.app.dto.*;
import com.medico.app.entities.Admin;
import com.medico.app.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/registerAdmin")
    public ResponseEntity<RegisterResponse> registerAdmin(@RequestBody Admin admin){
        return new ResponseEntity<>(authenticationService.registerAdmin(admin), HttpStatus.OK);
    }

    @PostMapping("/loginAdmin")
    public ResponseEntity<LoginResponse> loginAdmin(@RequestBody LoginRequest loginRequest){
        return new ResponseEntity<>(authenticationService.authenticateAdmin(loginRequest), HttpStatus.OK);
    }

    @PostMapping("/registerDoctor")
    public ResponseEntity<RegisterResponse> registerDoctor(@RequestBody DoctorRegisterDto doctorRegisterDto){
        return new ResponseEntity<>(authenticationService.registerDoctor(doctorRegisterDto), HttpStatus.OK);
    }

    @PostMapping("/loginDoctor")
    public ResponseEntity<LoginResponse> loginDoctor(@RequestBody LoginRequest loginRequest){
        return new ResponseEntity<>(authenticationService.authenticateDoctor(loginRequest), HttpStatus.OK);
    }

    @PostMapping("/registerPatient")
    public ResponseEntity<RegisterResponse> registerPatient(@RequestBody PatientRegisterDto patientRegisterDto){
        return new ResponseEntity<>(authenticationService.registerPatient(patientRegisterDto), HttpStatus.OK);
    }

    @PostMapping("/loginPatient")
    public ResponseEntity<LoginResponse> loginPatient(@RequestBody LoginRequest loginRequest){
        return new ResponseEntity<>(authenticationService.authenticatePatient(loginRequest), HttpStatus.OK);
    }
}
