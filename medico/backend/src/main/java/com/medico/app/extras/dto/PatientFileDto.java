package com.medico.app.extras.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientFileDto {

    private String patientName;
    private String fileName;
    private String placeholder;
}
