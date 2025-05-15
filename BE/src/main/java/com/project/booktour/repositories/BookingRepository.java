package com.project.booktour.repositories;

import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import com.project.booktour.models.BookingStatus;
import com.project.booktour.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByUserUserIdAndTourTourId(Long userId, Long tourId);
    List<Booking> findByUserUserId(Long userId);

    @Query("SELECT COUNT(b) FROM Booking b")
    Long countTotalBookings();

    @Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM Booking b")
    Double sumTotalRevenue();

    @Query("SELECT b FROM Booking b JOIN b.tour t JOIN b.user u " +
            "WHERE :keyword IS NULL OR b.specialRequests LIKE %:keyword% OR b.bookingStatus LIKE %:keyword% " +
            "OR t.title LIKE %:keyword% OR u.fullName LIKE %:keyword%")
    Page<Booking> findAll(String keyword, Pageable pageable);

    @Query("SELECT t.region AS region, COUNT(b) AS count " +
            "FROM Booking b JOIN b.tour t " +
            "GROUP BY t.region")
    List<Object[]> countBookingsByRegion();

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.tour.tourId = :tourId")
    Long countBookingsByTourId(Long tourId);

    List<Booking> findTop5ByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.tour.tourId = :tourId AND b.bookingStatus = :bookingStatus")
    Long countByTourAndBookingStatus(Long tourId, BookingStatus bookingStatus);

    List<Booking> findByBookingStatus(BookingStatus bookingStatus);

    List<Booking> findByUserUserIdAndTourTourId(Long userId, Long tourId);
}