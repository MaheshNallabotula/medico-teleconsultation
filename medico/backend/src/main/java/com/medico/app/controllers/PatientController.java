package com.medico.app.controllers;

import com.medico.app.dto.*;
import com.medico.app.entities.*;
import com.medico.app.extras.dto.PatientFileDto;
import com.medico.app.services.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

//@PreAuthorize("hasRole('PATIENT')")
@RestController
@RequestMapping(path = "/api/patient")
public class PatientController {

    private final PatientService patientService;
    private final DoctorService doctorService;
    private final HospitalService hospitalService;
    private final DoctorQueueService doctorQueueService;
    private final StorageService storageService;
    private final OneTimePasswordService oneTimePasswordService;


    public PatientController(PatientService patientService, HospitalService hospitalService , DoctorService doctorService, DoctorQueueService doctorQueueService, StorageService storageService, OneTimePasswordService oneTimePasswordService) {

        this.patientService = patientService;
        this.hospitalService =  hospitalService;
        this.doctorService = doctorService;
        this.doctorQueueService = doctorQueueService;
        this.storageService = storageService;
        this.oneTimePasswordService = oneTimePasswordService;
    }

    @PostMapping(path = "/getDoctorSlots")
    public ResponseEntity<List<Boolean>> getDoctorSlots(@RequestBody SlotDto slotDto){
        return new ResponseEntity<>(patientService.getDoctorSlots(slotDto.getDocId(), slotDto.getDate()), HttpStatus.OK);
    }

    @PostMapping(path = "/bookConsultation")
    public ResponseEntity<Consultation> bookConsultation(@RequestBody ConsultationDto consultationDto){
        Consultation consultation = patientService.bookConsultation(consultationDto);
        return new ResponseEntity<>(consultation, HttpStatus.OK);
    }
    @GetMapping(path = "/getAllHospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return new ResponseEntity<>(hospitals, HttpStatus.OK);

    }
    @GetMapping(path = "/getAllSpecialityByHospital/{hospitalId}")
    public ResponseEntity<Set<Speciality>> getAllSpecialityByHospital(@PathVariable Long hospitalId){
        Set<Speciality> specialities = hospitalService.getAllSpecialityByHospital(hospitalId);
        return new ResponseEntity<>(specialities,HttpStatus.OK);
    }
    @GetMapping(path = "/getDocBySpecialityandHospital/{specialityId}/{hospitalId}")
    public ResponseEntity<List<Doctor>> getDocBySpecialityandHospital(@PathVariable Long specialityId ,@PathVariable Long hospitalId){
        List<Doctor> doctors = doctorService.getDoctorsBySpecialityAndHospital(specialityId, hospitalId);
        return new ResponseEntity<>(doctors,HttpStatus.OK);
    }
    @GetMapping(path = "/getPatientDetails/{patientId}")
    public ResponseEntity<PatientDto> getPatientDetails(@PathVariable Long patientId){
        PatientDto patientDto = patientService.getPatientDetails(patientId);
        return new ResponseEntity<>(patientDto,HttpStatus.OK);
    }
    @PostMapping(path = "/editPatientDetails")
    public ResponseEntity<Patient> editPatientDetails(@RequestBody PatientDto patientDto){
        Patient patient = patientService.editPatientDetails(patientDto);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping(path = "/getAllConsultationsOfPat/{patientId}")
    public ResponseEntity<List<Consultation>> getAllConsultationOfPat(@PathVariable Long patientId){
        return new ResponseEntity<>(patientService.getAllConsultationOfPat(patientId),HttpStatus.OK);
    }

    
    @PostMapping(path = "/setRating")
    public ResponseEntity<?> setRating(@RequestBody RatingDto ratingDto){
        patientService.setRating(ratingDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/getDoctorReviews/{doctorId}")
    public ResponseEntity<List<DoctorReviewDto>> getDoctorReviews(@PathVariable Long doctorId){
        return new ResponseEntity<>(patientService.getDoctorReviews(doctorId), HttpStatus.OK);
    }

    @GetMapping(path = "/docBySpeciality/sortedR/{specialityId}")
    public ResponseEntity<List<Doctor>> getSortedListOfDoctorsR(@PathVariable Long specialityId){
        return new ResponseEntity<>(doctorService.getSortedRDoctorsBySpeciality(specialityId), HttpStatus.OK);
    }

    @GetMapping(path = "/docBySpeciality/sortedP/{specialityId}")
    public ResponseEntity<List<Doctor>> getSortedListOfDoctorsP(@PathVariable Long specialityId){
        return new ResponseEntity<>(doctorService.getSortedPDoctorsBySpeciality(specialityId), HttpStatus.OK);
    }

    @GetMapping(path = "/getSocketOfDoctor/{doctorId}")
    public ResponseEntity<Socket> getSocketOfDoctor(@PathVariable Long doctorId){
        return new ResponseEntity<>(doctorService.getSocketOfDoctor(doctorId), HttpStatus.OK);
    }

    @PostMapping(path = "/enterIntoQueue")
    public ResponseEntity<Integer> enterIntoQueue(@RequestBody DoctorQueueDto doctorQueueDto){
        return new ResponseEntity<>(doctorQueueService.enterIntoQueue(doctorQueueDto), HttpStatus.OK);
    }

    @PostMapping(path = "/getWaitingList")
    public ResponseEntity<Integer> getWaitingList(@RequestBody DoctorQueueDto doctorQueueDto){
        return new ResponseEntity<>(doctorQueueService.getWaitingCount(doctorQueueDto), HttpStatus.OK);
    }

    @PostMapping(path = "/uploadPatientsFiles/{patientId}/{placeholder}")
    public ResponseEntity<String> uploadPatientsFiles(@PathVariable Long patientId, @RequestParam(value = "file") MultipartFile file, @PathVariable String placeholder){
        return new ResponseEntity<>(patientService.uploadPatientFiles(file, patientId, placeholder), HttpStatus.OK);
    }

    @GetMapping(path = "/downloadPatientFiles/{patientId}")
    public ResponseEntity<List<byte[]>> downloadFiles(@PathVariable Long patientId) {
        return new ResponseEntity<>(patientService.downloadPatientFiles(patientId), HttpStatus.OK);
    }

    @GetMapping(path = "/downloadOnePatientFile/{filename}")
    private ResponseEntity<byte[]> downloadOneFile(@PathVariable String filename){
        return new ResponseEntity<>(storageService.downloadFile(filename), HttpStatus.OK);
    }

    @GetMapping(path = "/files/{patientId}")
    public ResponseEntity<List<PatientFiles>> getPatientFiles(@PathVariable Long patientId){
        return new ResponseEntity<List<PatientFiles>>(patientService.getPatientFiles(patientId), HttpStatus.OK);
    }

    @GetMapping(path = "/getOtp/{patientId}")
    public ResponseEntity<OneTimePasswordDto> getOtpForSharing(@PathVariable Long patientId){
        return new ResponseEntity<>(oneTimePasswordService.getOtp(patientId), HttpStatus.OK);
    }

    @PostMapping(path = "/putSocketOfPatient")
    public ResponseEntity<Socket> putSocketOfPatient(@RequestBody SocketDto socketDto){
        return new ResponseEntity<>(patientService.putSocketOfPatient(socketDto),HttpStatus.OK);
    }

    @PostMapping(path = "/setOngoingConsultation/{consultationId}")
    public ResponseEntity<?> setOngoingConsultation(Long consultationId){
        return new ResponseEntity<>(doctorQueueService.setOngoingConsultation(consultationId), HttpStatus.OK);
    }

    @GetMapping(path = "/downloadPrescription/{consultationId}")
    public ResponseEntity<PrescriptionDto> getDownloadablePrescription(@PathVariable Long consultationId){
        return new ResponseEntity<>(doctorService.getDownloadablePrescription(consultationId), HttpStatus.OK);
    }

    @GetMapping(path = "/getDoctorDetails/{doctorId}")
    public ResponseEntity<DoctorDTO> getDoctorDetails(@PathVariable Long doctorId) {
        DoctorDTO doctorDto = doctorService.getDoctorDetails(doctorId);
        return new ResponseEntity<>(doctorDto, HttpStatus.OK);
    }

}
