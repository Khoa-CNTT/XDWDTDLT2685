package com.project.booktour.repositories;

import com.project.booktour.models.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    boolean existsByTitle(String title);

    Page<Tour> findAll(Pageable pageable);
}