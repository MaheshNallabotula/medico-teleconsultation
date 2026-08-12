package com.medico.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class DoctorRegisterDto {
    private String docName;
    private LocalDate docDob;
    private String phoneNo;
    private Character gender;
    private Double rate;
    private String profilePicture;
    private String email;
    private String password;
    private Long specialityId;
//    private Long hospitalId;
}
