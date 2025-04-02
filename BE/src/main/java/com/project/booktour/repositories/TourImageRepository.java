package com.project.booktour.repositories;

import com.project.booktour.models.TourImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourImageRepository extends JpaRepository<TourImage, Long> {
    List<TourImage> findByTourTourId(Long tourId);
}