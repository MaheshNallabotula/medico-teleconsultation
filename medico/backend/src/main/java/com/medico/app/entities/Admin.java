package com.medico.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "admin")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Admin{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "admin_name")
    private String adminName;

    @Column(name = "admin_email")
    private String adminEmail;

    @JsonIgnore
    @Column(name = "admin_password")
    private String adminPassword;

    @OneToOne
    @JoinColumn(name = "admin_hospital", referencedColumnName = "hospital_id")
    private Hospital hospital;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    private List<AdminToken> tokens;

}
