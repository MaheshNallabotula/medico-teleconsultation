package com.medico.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ratings_and_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingsAndReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(mappedBy = "ratingsAndReviews", orphanRemoval = true)
    private Consultation consultation;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "review")
    private String review;
}
