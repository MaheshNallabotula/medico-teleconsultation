package com.medico.app.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationDto {

    private Long patientID;
    private Long docID;
    private LocalDate consultationDate;
    private LocalTime consultationTime;
    private Long consultationId;

}
