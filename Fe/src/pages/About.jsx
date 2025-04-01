import React from 'react';
import AboutUs from '../components/About/AboutUs';
import AboutBannerImg from '../components/About/AboutBannerImg';
import AboutTravel from '../components/About/AboutTravel';
import AboutTeam from '../components/About/AboutTeam';
import HeaderImg from '../components/HeaderImg/HeaderImg';

const About = () => {
    return (
        <div className='dark:bg-[#101828] dark:text-white'>
             <HeaderImg title="Giới Thiệu" currenPage="Giới thiệu"/>
            <AboutUs />
            <AboutBannerImg />
            <AboutTravel />
            <AboutTeam />
        </div>
    );
};

export default About;