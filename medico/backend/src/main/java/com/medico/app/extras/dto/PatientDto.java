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
public class PatientDto {
    private String patName;
    private LocalDate patDob;
    private String bloodGroup;
    private String phoneNo;
    private Character gender;
    private String email;
    private String password;
}
