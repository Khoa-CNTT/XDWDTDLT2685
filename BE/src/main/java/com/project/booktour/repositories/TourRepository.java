package com.project.booktour.repositories;

import com.project.booktour.models.Booking;
import com.project.booktour.models.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    boolean existsByTitle(String title);
    Long countByAvailabilityTrue();

    @Query("SELECT t, AVG(r.rating) as avgRating, " +
            "(SELECT ti.imageUrl FROM TourImage ti WHERE ti.tour = t ORDER BY ti.id ASC LIMIT 1) " +
            "FROM Tour t LEFT JOIN t.reviews r " +
            "WHERE (:priceMin IS NULL OR t.priceAdult >= :priceMin) " +
            "AND (:priceMax IS NULL OR t.priceAdult <= :priceMax) " +
            "AND (:region IS NULL OR UPPER(t.region) = UPPER(:region)) " +
            "AND (:duration IS NULL OR t.duration = :duration) " +
            "AND (:title IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
            "GROUP BY t " +
            "HAVING (:starRating IS NULL OR AVG(r.rating) >= :starRating)")
    Page<Object[]> findAllWithFilters(PageRequest pageRequest,
                                      @Param("priceMin") Double priceMin,
                                      @Param("priceMax") Double priceMax,
                                      @Param("region") String region,
                                      @Param("starRating") Float starRating,
                                      @Param("duration") String duration,
                                      @Param("title") String title);
    @Query("SELECT t FROM Tour t LEFT JOIN Booking b ON t.tourId = b.tour.tourId " +
            "GROUP BY t ORDER BY COUNT(b) DESC")
    List<Tour> findTopBookedTours(org.springframework.data.domain.Pageable pageable);


}