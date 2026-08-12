package com.medico.app.services;

import com.medico.app.dto.ConsultationDto;
import com.medico.app.dto.DoctorReviewDto;
import com.medico.app.dto.RatingDto;
import com.medico.app.dto.SocketDto;
import com.medico.app.entities.*;
import com.medico.app.extras.dto.PatientFileDto;
import com.medico.app.repositories.*;
import com.medico.app.dto.PatientDto;
import com.medico.app.entities.Consultation;
import com.medico.app.repositories.ConsultationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.SerializationUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ConsultationRepository consultationRepository;
    private final RatingAndReviewRepository ratingAndReviewRepository;
    private final HospitalRepository hospitalRepository;
    private final PatientFilesRepository patientFilesRepository;
    private final SlotsRepository slotsRepository;
    private final StorageService storageService;
    private final SocketRepository socketRepository;


    public PatientService(PatientRepository patientRepository, DoctorRepository doctorRepository, ConsultationRepository consultationRepository, RatingAndReviewRepository ratingAndReviewRepository, HospitalRepository hospitalRepository, PatientFilesRepository patientFilesRepository, SlotsRepository slotsRepository, StorageService storageService, SocketRepository socketRepository) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.consultationRepository = consultationRepository;
        this.ratingAndReviewRepository = ratingAndReviewRepository;
        this.hospitalRepository = hospitalRepository;
        this.patientFilesRepository = patientFilesRepository;
        this.slotsRepository = slotsRepository;
        this.storageService = storageService;
        this.socketRepository = socketRepository;
    }


    public Consultation bookConsultation(ConsultationDto consultationDto){
        Consultation consultation = new Consultation();
        Slots slot = new Slots();
        Optional<Patient> optionalPatient = patientRepository.findById(consultationDto.getPatientID());
        if(optionalPatient.isPresent()){
            Patient patient = optionalPatient.get();
            consultation.setPatient(patient);
        }
        Optional<Doctor> optionalDoctor = doctorRepository.findById(consultationDto.getDocID());
        if(optionalDoctor.isPresent()){
            Doctor doctor = optionalDoctor.get();
            consultation.setDoctor(doctor);
            slot.setDoctor(doctor);
            slot.setStartTime(consultationDto.getConsultationTime());
            slot.setDate(consultationDto.getConsultationDate());
            slotsRepository.save(slot);
        }
        consultation.setDate(consultationDto.getConsultationDate());
        consultation.setTime(consultationDto.getConsultationTime());

        return consultationRepository.save(consultation);
    }
    public void setRating(RatingDto ratingDto) {
        Optional<Consultation> optionalConsultation = consultationRepository.findById(ratingDto.getConsultationId());
        if (optionalConsultation.isPresent()) {
            Consultation consultation = optionalConsultation.get();
            RatingsAndReviews ratingsAndReviews = new RatingsAndReviews();
            ratingsAndReviews.setRating(ratingDto.getRating());
            ratingsAndReviews.setReview(ratingDto.getReview());
            ratingsAndReviews = ratingAndReviewRepository.save(ratingsAndReviews);
            consultation.setRatingsAndReviews(ratingsAndReviews);
            consultationRepository.save(consultation);

            // Update doctor's rating
            Doctor doctor = doctorRepository.findById(consultation.getDoctor().getDocId()).orElseThrow();
            Double currentDoctorRating = doctor.getRating();
            Long totalRatedUsers = ratingAndReviewRepository.getTotalNumberOfRatingsOfADoctor(doctor.getDocId()) - 1;

            // Calculate new rating for the doctor
            Double newDoctorRating = ((currentDoctorRating * totalRatedUsers) + ratingDto.getRating()) / (totalRatedUsers + 1);
            doctor.setRating(newDoctorRating);
            doctorRepository.save(doctor);

            // Calculate and update hospital's rating
            Hospital hospital = doctor.getHospital();
            if (hospital != null) {
                // Retrieve all doctors in the hospital
                List<Doctor> doctorsInHospital = doctorRepository.findDoctorByHospital(hospital.getHospitalId()).orElse(new ArrayList<>());

                // Calculate average rating of all doctors in the hospital
                double totalRating = 0;
                for (Doctor d : doctorsInHospital) {
                    totalRating += d.getRating();
                }

                double averageDoctorRating = totalRating / doctorsInHospital.size();

                // Set the hospital's rating
                hospital.setRating(averageDoctorRating);
                hospitalRepository.save(hospital);
            }
        }
    }


    // Returns a doctor's written reviews (newest first) so a patient can read
    // what past patients said before booking, instead of only seeing the
    // average star rating on the doctor's profile.
    public List<DoctorReviewDto> getDoctorReviews(Long docId) {
        List<RatingsAndReviews> reviews = ratingAndReviewRepository.getReviewsForDoctor(docId);
        List<DoctorReviewDto> reviewDtos = new ArrayList<>();
        for (RatingsAndReviews ratingsAndReviews : reviews) {
            Consultation consultation = ratingsAndReviews.getConsultation();
            DoctorReviewDto dto = new DoctorReviewDto();
            dto.setConsultationId(consultation.getConsultationId());
            dto.setRating(ratingsAndReviews.getRating());
            dto.setReview(ratingsAndReviews.getReview());
            dto.setConsultationDate(consultation.getDate());
            if (consultation.getPatient() != null) {
                dto.setPatientName(consultation.getPatient().getPatName());
            }
            reviewDtos.add(dto);
        }
        return reviewDtos;
    }

    public List<Boolean> getDoctorSlots(Long docId, LocalDate date){
        List<Boolean> retSlots = new ArrayList<>(24);
        for(int i=0;i<24;i++){
            retSlots.add(Boolean.TRUE);
        }
        List<Slots> slots = slotsRepository.getSlotsByDoctor_DocId(docId).orElseThrow();
        slots = slots.stream().filter(slot -> slot.getDate().equals(date)).collect(Collectors.toList());
        slots.forEach(slot -> {
            if(slot.getStartTime().getHour() == 9 && slot.getStartTime().getMinute() == 0)
                retSlots.set(0, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 9 && slot.getStartTime().getMinute() == 30)
                retSlots.set(1, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 10 && slot.getStartTime().getMinute() == 0)
                retSlots.set(2, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 10 && slot.getStartTime().getMinute() == 30)
                retSlots.set(3, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 11 && slot.getStartTime().getMinute() == 0)
                retSlots.set(4, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 11 && slot.getStartTime().getMinute() == 30)
                retSlots.set(5, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 12 && slot.getStartTime().getMinute() == 0)
                retSlots.set(6, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 12 && slot.getStartTime().getMinute() == 30)
                retSlots.set(7, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 13 && slot.getStartTime().getMinute() == 0)
                retSlots.set(8, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 13 && slot.getStartTime().getMinute() == 30)
                retSlots.set(9, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 14 && slot.getStartTime().getMinute() == 0)
                retSlots.set(10, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 14 && slot.getStartTime().getMinute() == 30)
                retSlots.set(11, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 15 && slot.getStartTime().getMinute() == 0)
                retSlots.set(12, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 15 && slot.getStartTime().getMinute() == 30)
                retSlots.set(13, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 16 && slot.getStartTime().getMinute() == 0)
                retSlots.set(14, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 16 && slot.getStartTime().getMinute() == 30)
                retSlots.set(15, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 17 && slot.getStartTime().getMinute() == 0)
                retSlots.set(16, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 17 && slot.getStartTime().getMinute() == 30)
                retSlots.set(17, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 18 && slot.getStartTime().getMinute() == 0)
                retSlots.set(18, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 18 && slot.getStartTime().getMinute() == 30)
                retSlots.set(19, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 19 && slot.getStartTime().getMinute() == 0)
                retSlots.set(20, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 19 && slot.getStartTime().getMinute() == 30)
                retSlots.set(21, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 20 && slot.getStartTime().getMinute() == 0)
                retSlots.set(22, Boolean.FALSE);
            if(slot.getStartTime().getHour() == 20 && slot.getStartTime().getMinute() == 30)
                retSlots.set(23, Boolean.FALSE);
        });
        return retSlots;
    }
    public PatientDto getPatientDetails(Long patientId){
        Patient patient = patientRepository.findById(patientId).orElseThrow();
        PatientDto patientDto = new PatientDto();
        patientDto.setPatientId(patient.getPatientID());
        patientDto.setPatName(patient.getPatName());
        patientDto.setPatDob(patient.getPatDob());
        patientDto.setPatBloodGroup(patient.getPatBloodGroup());
        patientDto.setPatGender(patient.getPatGender());
        patientDto.setPatEmail(patient.getPatEmail());
        patientDto.setPatGender(patient.getPatGender());
        patientDto.setPatPhoneNo(patient.getPatPhoneNo());

        return patientDto;
    }
    public Patient editPatientDetails(PatientDto patientDto){
        Patient patient = patientRepository.findById(patientDto.getPatientId()).orElseThrow();
        patient.setPatBloodGroup(patientDto.getPatBloodGroup());
        patient.setPatName(patientDto.getPatName());
        patient.setPatPhoneNo(patientDto.getPatPhoneNo());

        patient = patientRepository.save(patient);

        return patient;

    }
    public List<Consultation> getAllConsultationOfPat(Long patientId){
        return this.consultationRepository.findConsultationByPatient_PatientID(patientId).orElseThrow();
    }

    public String uploadPatientFiles(MultipartFile file, Long patientId, String placeholder){
        try {
            String filename = "FILE_"+patientId+"_"+file.getOriginalFilename();
            Patient patient = patientRepository.findById(patientId).orElseThrow();
            PatientFiles patientFiles = new PatientFiles();
            patientFiles.setFileName(filename);
            patientFiles.setPlaceholder(placeholder);
            patientFiles.setPatient(patient);
            patientFilesRepository.save(patientFiles);
            String fileName = storageService.uploadFile(file,filename);
            return "File uploaded for patient" + patientId + ": " + fileName;
        }
        catch (IOException e) {
            return "Failed to upload file: " + e.getMessage();
        }
    }
    public List<byte[]> downloadPatientFiles(Long patientId){
        try {
            List<byte[]> files = new ArrayList<>();
            List<PatientFiles> patientFiles = patientFilesRepository.findPatientFilesByPatient_PatientID(patientId).orElseThrow();
            patientFiles.forEach(patientFile -> {
                byte[] content = storageService.downloadFile(patientFile.getFileName());
                if(content != null)
                    files.add(content);
            });
            return files;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<PatientFiles> getPatientFiles(Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + patientId));
        return patientFilesRepository.findPatientFilesByPatient_PatientID(patientId).orElseThrow();
        // List<PatientFileDto> patientFileDtos = new ArrayList<>();
        // for(PatientFiles patientFiles : patient.getPatientFiles()){
        //     PatientFileDto dto = new PatientFileDto();
        //     dto.setFileName(patientFiles.getFileName());
        //     dto.setPlaceholder(patientFiles.getPlaceholder());
        //     dto.setPatientName(patient.getPatName());
        //     patientFileDtos.add(dto);
        // }
        // return patientFileDtos;
    }

    public Socket putSocketOfPatient(SocketDto socketDto) {
        Optional<Socket> socketAlreadyPresent = socketRepository.findSocketByPatient_PatientID(socketDto.getPatientId());
        if(socketAlreadyPresent.isPresent()){
            Socket socket = socketAlreadyPresent.get();
            socket.setSocketId(socketDto.getSocketId());
            return socketRepository.save(socket);
        }else{
            Optional<Patient> patientOptional = patientRepository.findById(socketDto.getPatientId());
            if(patientOptional.isPresent()){
                Patient patient = patientOptional.get();
                Socket socket = new Socket();
                socket.setPatient(patient);
                socket.setSocketId(socketDto.getSocketId());

                return socketRepository.save(socket);
            }
        }
        return new Socket();
    }

    public Socket getSocketOfPatient(Long patientId) {
        return socketRepository.findSocketByPatient_PatientID(patientId).orElseThrow();
    }


}
