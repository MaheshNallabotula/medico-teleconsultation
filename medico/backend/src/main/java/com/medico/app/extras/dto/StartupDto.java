package com.medico.app.extras.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StartupDto {
    private List<SpecialityDto> specialities;
    private List<HospitalDto> hospitals;
    private List<DoctorDto> doctors;
    private List<PatientDto> patients;
    private List<AdminDto> admins;
}
