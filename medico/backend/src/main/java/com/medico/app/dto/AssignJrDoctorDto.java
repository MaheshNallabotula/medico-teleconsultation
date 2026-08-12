package com.medico.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignJrDoctorDto {

    private Long srDoctorId;
    private List<Long> jrDoctorIds;
}
