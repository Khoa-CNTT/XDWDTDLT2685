package com.project.booktour.repositories;



import com.project.booktour.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTourTourId(Long tourId);
}


