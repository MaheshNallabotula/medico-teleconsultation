package com.medico.app.controllers;

import com.medico.app.dao.QueueDao;
import com.medico.app.dto.*;
import com.medico.app.entities.*;
import com.medico.app.services.DoctorQueueService;
import com.medico.app.services.DoctorService;
import com.medico.app.services.OneTimePasswordService;
import com.medico.app.services.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = "/api/doctor")
public class DoctorController {

    private final DoctorService doctorService;
    private final DoctorQueueService doctorQueueService;
    private final OneTimePasswordService oneTimePasswordService;
    private final PatientService patientService;


    public DoctorController(DoctorService doctorService, DoctorQueueService doctorQueueService, OneTimePasswordService oneTimePasswordService, PatientService patientService) {

        this.doctorService = doctorService;
        this.doctorQueueService = doctorQueueService;
        this.oneTimePasswordService = oneTimePasswordService;
        this.patientService = patientService;
    }

    @GetMapping(path = "/getDoctorDetails/{doctorId}")
    public ResponseEntity<DoctorDTO> getDoctorDetails(@PathVariable Long doctorId) {
        DoctorDTO doctorDto = doctorService.getDoctorDetails(doctorId);
        return new ResponseEntity<>(doctorDto, HttpStatus.OK);
    }

    @PostMapping(path = "/editDoctorDetails")
    public ResponseEntity<Doctor> editDoctorDetails(@RequestBody DoctorDTO doctorDTO){
        Doctor doctor = doctorService.editDoctorDetails(doctorDTO);
        return new ResponseEntity<>(doctor , HttpStatus.OK);
    }
    @GetMapping(path = "/getAllConsultationOfDoc/{docId}")
    public ResponseEntity<List<Consultation>> getAllConsultationOfDoc(@PathVariable Long docId){
        return new ResponseEntity<>(doctorService.getAllConsultationOfDoc(docId),HttpStatus.OK);
    }
    @GetMapping(path = "/getPendingConsultationsOfDoc/{docId}")
    public ResponseEntity<List<Consultation>> getPendingConsultationsOfDoc(@PathVariable Long docId) {
        return new ResponseEntity<>(doctorService.getPendingConsultationsOfDoc(docId), HttpStatus.OK);
    }

    @PostMapping(path = "/putSocketOfDoctor")
    public ResponseEntity<Socket> putSocketOfDoctor(@RequestBody SocketDto socketDto){
        return new ResponseEntity<>(doctorService.putSocketOfDoctor(socketDto),HttpStatus.OK);
    }

    @GetMapping(path = "/resignFromHospital/{doctorId}")
    public ResponseEntity<Doctor> resignFromHospital(@PathVariable Long doctorId){
        return new ResponseEntity<>(doctorService.resignFromHospital(doctorId), HttpStatus.OK);
    }

    @GetMapping(path = "/applyToHospital/{doctorId}/{hospitalId}")
    public ResponseEntity<Doctor> applyToHospital(@PathVariable Long doctorId, @PathVariable Long hospitalId) {
        return new ResponseEntity<>(doctorService.applyToHospital(doctorId, hospitalId), HttpStatus.OK);
    }

    @GetMapping(path = "/getSocketOfNextPatient/{doctorId}")
    public ResponseEntity<QueueDao> getSocketOfNextPatientFromQueue(@PathVariable Long doctorId){
        return new ResponseEntity<>(doctorQueueService.getNextPatient(doctorId), HttpStatus.OK);
    }

    @GetMapping(path = "/deleteQueueOfDoctor/{doctorId}")
    public ResponseEntity<String> deleteQueueOfDoctor(@PathVariable Long doctorId){
        return new ResponseEntity<>(doctorQueueService.deleteQueueOfDoctor(doctorId), HttpStatus.OK);
    }

    @GetMapping(path = "/getJrDoctorsOfSrDoctor/{srDoctorId}")
    public ResponseEntity<List<Doctor>> getJrDoctorsOfSrDoctor(@PathVariable Long srDoctorId) {
        return new ResponseEntity<>(doctorService.getJrDoctorsOfSrDoctor(srDoctorId), HttpStatus.OK);
    }

    @PostMapping(path = "/uploadDoctorFiles/{docId}")
    public ResponseEntity<String> uploadDoctorFile(@PathVariable Long docId, @RequestParam(value = "file") MultipartFile file) {
        return new ResponseEntity<>(doctorService.uploadDoctorFiles(file,docId) , HttpStatus.OK);
    }

    @GetMapping(path = "/downloadDoctorFiles/{docId}")
    public ResponseEntity<List<byte[]>> downloadDoctorFile(@PathVariable Long docId) {
        return new ResponseEntity<>(doctorService.downloadDoctorFiles(docId) , HttpStatus.OK);

    }

    @PostMapping(path = "/verifyOtp")
    public ResponseEntity<Boolean> verifyOtpForSharing(@RequestBody OneTimePasswordDto oneTimePasswordDto){
        return new ResponseEntity<>(oneTimePasswordService.verifyOtpForSharing(oneTimePasswordDto), HttpStatus.OK);
    }

    @PostMapping(path = "/addPrescriptionToConsultation")
    public ResponseEntity<?> addPrescriptionToConsultation(@RequestBody PrescriptionDto prescriptionDto){
        return new ResponseEntity<>(doctorService.addPrescriptionToConsultation(prescriptionDto), HttpStatus.OK);
    }

    @GetMapping(path = "/getSocketOfPatient/{patientId}")
    public ResponseEntity<Socket> getSocketOfPatient(@PathVariable Long patientId){
        return new ResponseEntity<>(patientService.getSocketOfPatient(patientId), HttpStatus.OK);
    }

    @GetMapping(path = "/callNextPatientFromQueue/{doctorId}")
    public ResponseEntity<QueueDao> callNextPatientFromQueue(@PathVariable Long doctorId){
        return new ResponseEntity<>(doctorQueueService.callNextPatient (doctorId), HttpStatus.OK);
    }

    @GetMapping(path = "/getOngoingConsultationDetail")
    public ResponseEntity<ConsultationDto> getOngoingConsultationDetail(Long doctorId){
        return new ResponseEntity<>(doctorQueueService.getOngoingConsultation(doctorId), HttpStatus.OK);
    }

    @GetMapping(path = "/downloadPrescription/{consultationId}")
    public ResponseEntity<PrescriptionDto> getDownloadablePrescription(@PathVariable Long consultationId){
        return new ResponseEntity<>(doctorService.getDownloadablePrescription(consultationId), HttpStatus.OK);
    }
}