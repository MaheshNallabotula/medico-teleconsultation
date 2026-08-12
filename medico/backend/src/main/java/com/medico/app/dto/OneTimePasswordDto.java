package com.medico.app.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OneTimePasswordDto {
    private Integer password;
    private Long patientId;

    public OneTimePasswordDto(Integer password){
        this.password = password;
    }
}
