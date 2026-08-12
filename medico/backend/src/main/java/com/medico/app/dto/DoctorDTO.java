package com.medico.app.dto;

import com.medico.app.entities.Doctor;
import com.medico.app.entities.Speciality;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {

    private Long docId;
    private String docName;
    private String phoneNo;
    private Character gender;
    private Double rating;
    private String email;
    private Speciality speciality;
    private LocalDate docDob;
    private String hospitalName;
    private Double rate;
    private Boolean isSenior;

    public DoctorDTO(Doctor doctor) {
        this.docId = doctor.getDocId();
        this.docName = doctor.getDocName();
        this.docDob = doctor.getDocDob();
        this.email = doctor.getEmail();
        this.rating = doctor.getRating();
        this.gender = doctor.getGender();
        this.phoneNo = doctor.getPhoneNo();
        this.rate = doctor.getRate();
        this.speciality = doctor.getSpeciality();
        this.isSenior = doctor.getIsSenior();
        if(doctor.getHospital() != null)
            this.hospitalName = doctor.getHospital().getHospitalName();
    }
}
