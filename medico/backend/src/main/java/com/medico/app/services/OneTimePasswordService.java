package com.medico.app.services;

import com.medico.app.dto.OneTimePasswordDto;
import com.medico.app.dto.PatientDoctorDto;
import com.medico.app.entities.OneTimePassword;
import com.medico.app.entities.Patient;
import com.medico.app.repositories.OneTimePasswordRepository;
import com.medico.app.repositories.PatientRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OneTimePasswordService {

    private final static Duration expiry = Duration.ofMinutes(5);
    private final static Integer length = 6;
    private final OneTimePasswordRepository oneTimePasswordRepository;
    private final PatientRepository patientRepository;

    public OneTimePasswordService(OneTimePasswordRepository oneTimePasswordRepository, PatientRepository patientRepository) {
        this.oneTimePasswordRepository = oneTimePasswordRepository;
        this.patientRepository = patientRepository;
    }

    private Integer generateOneTimePassword() {
        Random random = new Random();
        StringBuilder oneTimePassword = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(10);
            if(i == 0 && number == 0){
                i--;
                continue;
            }
            oneTimePassword.append(number);
        }
        System.out.println(oneTimePassword);
        return Integer.parseInt(oneTimePassword.toString());
    }


    public OneTimePasswordDto getOtp(Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElseThrow();
        Optional<OneTimePassword> oneTimePasswordOptional = oneTimePasswordRepository.findOneTimePasswordByPatient_PatientID(patient.getPatientID());
        if(oneTimePasswordOptional.isPresent()){
            OneTimePassword oneTimePassword = oneTimePasswordOptional.get();
            oneTimePassword.setPassword(generateOneTimePassword());
            oneTimePassword.setExpiration(LocalTime.now().plus(expiry));
            oneTimePasswordRepository.save(oneTimePassword);
            return new OneTimePasswordDto(oneTimePassword.getPassword(), oneTimePassword.getPatient().getPatientID());
        }else{
            OneTimePassword oneTimePassword = new OneTimePassword();
            oneTimePassword.setPassword(generateOneTimePassword());
            oneTimePassword.setExpiration(LocalTime.now().plus(expiry));
            oneTimePassword.setPatient(patient);
            oneTimePasswordRepository.save(oneTimePassword);
            return new OneTimePasswordDto(oneTimePassword.getPassword(), oneTimePassword.getPatient().getPatientID());
        }

    }

    public Boolean verifyOtpForSharing(OneTimePasswordDto oneTimePasswordDto) {
        Optional<OneTimePassword> oneTimePasswordOptional = oneTimePasswordRepository.findOneTimePasswordByPatient_PatientID(oneTimePasswordDto.getPatientId());
        if(oneTimePasswordOptional.isPresent()){
            return oneTimePasswordOptional.get().getPassword().equals(oneTimePasswordDto.getPassword());
        }
        return false;
    }
}
