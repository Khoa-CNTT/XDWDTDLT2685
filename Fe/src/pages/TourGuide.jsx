import React from 'react';
import HeaderImg from '../components/HeaderImg/HeaderImg';
import GuideSection from '../components/TourGuide/GuideSection';
import AboutTeam from '../components/About/AboutTeam';
import GuideFeedback from '../components/TourGuide/GuideFeedback';
import GuideSubrise from '../components/TourGuide/GuideSubrise';

const TourGuide = () => {
    return (
        <div className='dark:bg-[#101828] dark:text-white'>
            <HeaderImg title="Hướng Dẫn Viên" currenPage="hướng dẫn viên" />
            <GuideSection />
            <AboutTeam />
            <GuideFeedback />
            <GuideSubrise />
        </div>
    );
};

export default TourGuide;