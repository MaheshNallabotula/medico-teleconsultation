package com.medico.app.services;


import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.medico.app.dto.DoctorDTO;
import com.medico.app.dto.PrescriptionDto;
import com.medico.app.dto.SocketDto;
import com.medico.app.entities.*;
import com.medico.app.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    private final ConsultationRepository consultationRepository;
    private final SocketRepository socketRepository;
    private final HospitalRepository hospitalRepository;
    private final StorageService storageService;
    private final DoctorFilesRepository doctorFilesRepository;
    private final MedicineAndDosageRepository medicineAndDosageRepository;
    private final PrescriptionRepository prescriptionRepository;

    public DoctorService(DoctorRepository doctorRepository, ConsultationRepository consultationRepository, SocketRepository socketRepository, HospitalRepository hospitalRepository, StorageService storageService, DoctorFilesRepository doctorFilesRepository, MedicineAndDosageRepository medicineAndDosageRepository, PrescriptionRepository prescriptionRepository) {

        this.doctorRepository = doctorRepository;
        this.consultationRepository = consultationRepository;
        this.socketRepository = socketRepository;
        this.hospitalRepository = hospitalRepository;
        this.storageService = storageService;
        this.doctorFilesRepository = doctorFilesRepository;
        this.medicineAndDosageRepository = medicineAndDosageRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    public List<Doctor> getAllDoctor(){
        return doctorRepository.findAll();
    }

    public List<Doctor> getDoctorsBySpeciality(Long specialityId) {
        return this.doctorRepository.findBySpeciality_SpecialityId(specialityId).orElseThrow();
    }

    public List<Doctor> getDoctorsBySpecialityAndHospital(Long specialityId, Long hospitalId){
        return this.doctorRepository.findDoctorBySpecialityAndHospital(specialityId, hospitalId).orElseThrow();
    }

    public DoctorDTO getDoctorDetails(Long doctorId){
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        return new DoctorDTO(doctor);
    }
    public Doctor editDoctorDetails(DoctorDTO doctorDTO){
        Doctor doctor = doctorRepository.findById(doctorDTO.getDocId()).orElseThrow();
        doctor.setEmail(doctorDTO.getEmail());
        doctor.setPhoneNo(doctorDTO.getPhoneNo());
        doctor.setRate(doctorDTO.getRate());

        doctor = doctorRepository.save(doctor);

        return doctor;
    }

    public List<Consultation> getAllConsultationOfDoc(Long docId){
        return this.consultationRepository.findConsultationByDoctor_DocId(docId).orElseThrow();
    }

    public List<Doctor> getSortedRDoctorsBySpeciality(Long specialityId) {
        List<Doctor> doctors = this.doctorRepository.findBySpeciality_SpecialityId(specialityId).orElseThrow();
        return doctors.stream().sorted(Comparator.comparing(Doctor::getRating).reversed()).toList();
    }

    public List<Doctor> getSortedPDoctorsBySpeciality(Long specialityId) {
        List<Doctor> doctors = this.doctorRepository.findBySpeciality_SpecialityId(specialityId).orElseThrow();
        return doctors.stream().sorted(Comparator.comparing(Doctor::getRate).reversed()).toList();
    }

    public List<Consultation> getPendingConsultationsOfDoc(Long docId){
        List<Consultation> consultations = consultationRepository.findConsultationByDoctor_DocId(docId).orElseThrow();
        LocalDate today = LocalDate.now();
        LocalTime instant = LocalTime.now();
        List<Consultation> pendingConsultations = consultations.stream()
                .filter(consultation -> {
                    LocalDate consultationDate = consultation.getDate();
                    return consultationDate.isAfter(today);
                })
                .collect(Collectors.toList());
        pendingConsultations.addAll(consultations.stream()
                .filter(consultation -> {
                    LocalDate consultationDate = consultation.getDate();
                    return consultationDate.isEqual(today);
                })
                .filter(consultation -> {
                    LocalTime consultationTime = consultation.getTime();
                    return consultationTime.isAfter(instant);
                }).collect(Collectors.toList()));

        return pendingConsultations;
    }

    public Socket getSocketOfDoctor(Long doctorId) {
        return socketRepository.findSocketByDoctor_DocId(doctorId).orElseThrow();
    }

    public Socket putSocketOfDoctor(SocketDto socketDto) {
        Optional<Socket> socketAlreadyPresent = socketRepository.findSocketByDoctor_DocId(socketDto.getDocId());
        if(socketAlreadyPresent.isPresent()){
            Socket socket = socketAlreadyPresent.get();
            socket.setSocketId(socketDto.getSocketId());
            return socketRepository.save(socket);
        }else{
            Optional<Doctor> doctorOptional= doctorRepository.findById(socketDto.getDocId());
            if(doctorOptional.isPresent()){
                Doctor doctor = doctorOptional.get();
                Socket socket = new Socket();
                socket.setDoctor(doctor);
                socket.setSocketId(socketDto.getSocketId());

                return socketRepository.save(socket);
            }
        }

        return new Socket();
    }

    public Doctor resignFromHospital(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        doctor.setHospital(null);
        doctorRepository.save(doctor);
        return doctor;
    }

    public Doctor applyToHospital(Long doctorId, Long hospitalId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        if(doctor.getHospital() == null){
            Hospital hospital = hospitalRepository.findById(hospitalId).orElseThrow();
            doctor.setHospital(hospital);
            doctorRepository.save(doctor);
        }
        if(doctor.getHospital().getHospitalId().equals(hospitalId)){
            return doctor;
        }

        return doctor;
    }


    public List<Doctor> getJrDoctorsOfSrDoctor(Long srDoctorId) {
        Doctor doctor = doctorRepository.findById(srDoctorId).orElseThrow();
        if(doctor.getIsSenior() && doctor.getJrDoctors() != null){
            return doctor.getJrDoctors();
        }
        return new ArrayList<>();
    }

    public String uploadDoctorFiles(MultipartFile file , Long docId){
        try {
            String filename = "FILE_"+docId+"_"+file.getOriginalFilename();
            Doctor doctor = doctorRepository.findById(docId).orElseThrow();
            DoctorFiles doctorFiles = new DoctorFiles();
            doctorFiles.setFileName(filename);
            doctorFiles.setDoctor(doctor);
            doctorFilesRepository.save(doctorFiles);
            String fileName = storageService.uploadFile(file, filename);
            return "File uploaded for patient" + docId + ": " + fileName;
        }
        catch (IOException e){
            return "Failed to upload file" + e.getMessage();
        }
    }

    public List<byte[]> downloadDoctorFiles(Long docId){
        try {
            List<byte[]> files = new ArrayList<>();
            List<DoctorFiles> doctorFiles = doctorFilesRepository.findDoctorFilesByDoctor_DocId(docId).orElseThrow();
            doctorFiles.forEach(doctorFiles1 -> {
                byte[] content = storageService.downloadFile(doctorFiles1.getFileName());
                if(content != null){
                    files.add(content);
                }
            });
            return files;
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public Consultation addPrescriptionToConsultation(PrescriptionDto prescriptionDto) {
        Consultation consultation = consultationRepository.findById(prescriptionDto.getConsultationId()).orElseThrow();
        Prescription prescription = new Prescription();
        prescription.setObservations(prescriptionDto.getObservations());
        List<MedicineAndDosage> medicineAndDosages = new ArrayList<>();
        prescriptionDto.getMedicinesAndDosages().forEach(medicine -> {
            MedicineAndDosage medicineAndDosage = new MedicineAndDosage();
            medicineAndDosage.setMedicineName(medicine.getMedicine());
            medicineAndDosage.setDosage(medicine.getDosage());
            medicineAndDosage.setPrescription(prescription);
            medicineAndDosages.add(medicineAndDosage);
        });
        prescriptionRepository.save(prescription);
        consultation.setPrescription(prescription);
        medicineAndDosageRepository.saveAll(medicineAndDosages);
        return consultationRepository.save(consultation);
    }

    public PrescriptionDto getDownloadablePrescription(Long consultationId) {
        Consultation consultation = consultationRepository.findById(consultationId).orElseThrow();
        Prescription prescription = prescriptionRepository.findById(consultation.getPrescription().getPrescriptionId()).orElseThrow();
        return new PrescriptionDto(prescription);
    }
}