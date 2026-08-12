package com.medico.app.extras.dto;

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
public class DoctorDto {

    private String docName;
    private LocalDate docDob;
    private String phoneNo;
    private Character gender;
    private Double rate;
    private String email;
    private String password;
    private Long specialityId;
    private Long hospitalId;
    private Double rating;

}
