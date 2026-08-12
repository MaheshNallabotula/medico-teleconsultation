package com.medico.app.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddHospitalDto {

    private String hospitalName;
    private String hospitalAddress;
    private String hospitalPhoneNo;
    private String hospitalEmail;

}
