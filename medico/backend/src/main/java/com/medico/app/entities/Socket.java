package com.medico.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sockets")
@Entity
public class Socket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "socket_id")
    private String socketId;

    @OneToOne
    @JsonIgnore
    private Doctor doctor;

    @OneToOne
    @JsonIgnore
    private Patient patient;
}
