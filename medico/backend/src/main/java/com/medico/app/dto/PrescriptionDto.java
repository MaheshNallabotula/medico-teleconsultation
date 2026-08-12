package com.medico.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.medico.app.entities.Prescription;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionDto implements Serializable{
    private Long consultationId;
    private String observations;
    private String remarks;
    private List<MedicineDto> medicinesAndDosages;

    public PrescriptionDto(Prescription prescription){
        this.observations = prescription.getObservations();
        this.remarks = prescription.getRemarks();
        List<MedicineDto> med = new ArrayList<>();
        prescription.getMedicinesAndDosage().forEach(medicine -> {
            MedicineDto medicineDto = new MedicineDto();
            medicineDto.setMedicine(medicine.getMedicineName());
            medicineDto.setDosage(medicine.getDosage());
            med.add(medicineDto);
        });
        this.setMedicinesAndDosages(med);
    }
}
