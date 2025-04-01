import React from 'react';
import HeaderImg from '../components/HeaderImg/HeaderImg';
import GuideSection from '../components/TourGuide/GuideSection';

const TourGuide = () => {
    return (
        <div>
            <HeaderImg title="Hướng Dẫn Viên" currenPage="hướng dẫn viên" />
            <GuideSection />
        </div>
    );
};

export default TourGuide;