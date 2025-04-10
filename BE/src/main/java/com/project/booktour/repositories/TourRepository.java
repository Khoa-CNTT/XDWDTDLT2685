package com.project.booktour.repositories;

import com.project.booktour.models.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    boolean existsByTitle(String title);

    @Query("SELECT t, COALESCE(AVG(r.rating), 5.0) as avgRating " +
            "FROM Tour t " +
            "LEFT JOIN t.reviews r " +
            "GROUP BY t")
    Page<Object[]> findAllWithAverageRating(Pageable pageable);
}