import React from 'react';
import HeaderImg from '../components/HeaderImg/HeaderImg';
import TourBookingList from '../components/TourBooking/TourBookingList';

const TourBooking = () => {
    return (
        <div>
            <HeaderImg title="Tour Đã Đặt" currenPage="Tour đã đặt" />
            <TourBookingList />
        </div>
    );
};

export default TourBooking;