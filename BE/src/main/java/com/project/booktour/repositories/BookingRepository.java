package com.project.booktour.repositories;

import com.project.booktour.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserUserIdAndTourTourId(Long userId, Long tourId);

    boolean existsByUserUserIdAndTourTourId(Long userId, Long tourId);
    List<Booking> findByUserUserId(Long userId);
}