package com.medico.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

// Used to show a doctor's reviews to patients before they book a consultation.
// Keeps the response light (no full Patient/Consultation graph) and avoids
// leaking anything beyond the reviewer's first name + the review itself.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorReviewDto {
    private Long consultationId;
    private String patientName;
    private Double rating;
    private String review;
    private LocalDate consultationDate;
}
