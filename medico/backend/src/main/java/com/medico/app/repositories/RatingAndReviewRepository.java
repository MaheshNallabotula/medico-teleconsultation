package com.medico.app.repositories;

import com.medico.app.entities.RatingsAndReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingAndReviewRepository extends JpaRepository<RatingsAndReviews, Long> {

    @Query("SELECT count(*) FROM RatingsAndReviews r WHERE r.consultation.doctor.docId = :docId")
    Long getTotalNumberOfRatingsOfADoctor(Long docId);

    // Newest reviews first. Only consultations that actually have a written
    // review attached are returned (a patient can submit just a star rating
    // with no text, and those shouldn't show up as empty review cards).
    @Query("SELECT r FROM RatingsAndReviews r " +
           "WHERE r.consultation.doctor.docId = :docId " +
           "AND r.review IS NOT NULL AND r.review <> '' " +
           "ORDER BY r.consultation.date DESC")
    List<RatingsAndReviews> getReviewsForDoctor(Long docId);
}
