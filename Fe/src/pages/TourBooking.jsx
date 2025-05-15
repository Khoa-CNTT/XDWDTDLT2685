import React from 'react';
import HeaderImg from '../components/HeaderImg/HeaderImg';
import TourHistory from '../components/TourBooking/TourHistory';

const TourBooking = () => {
    return (
        <div>
            <HeaderImg title="Tour Đã Đặt" currenPage="Tour đã đặt" />
            <TourHistory/>
        </div>
    );
};

export default TourBooking;