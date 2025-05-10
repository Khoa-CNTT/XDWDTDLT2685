
package com.project.booktour.services;

import com.project.booktour.dtos.DashboardDTO;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final BookingRepository bookingRepository;

    public DashboardDTO getDashboardStats() {
        Long activeTours = tourRepository.countByAvailabilityTrue() != null ? tourRepository.countByAvailabilityTrue() : 0L;
        Long totalBookings = bookingRepository.countTotalBookings() != null ? bookingRepository.countTotalBookings() : 0L;
        Long totalUsers = userRepository.countActiveUsers() != null ? userRepository.countActiveUsers() : 0L;
        Double totalRevenue = bookingRepository.sumTotalRevenue() != null ? bookingRepository.sumTotalRevenue() : 0.0;

        return new DashboardDTO(activeTours, totalBookings, totalUsers, totalRevenue);
    }
}