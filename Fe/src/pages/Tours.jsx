import React from 'react';
import TourFilter from '../components/Tour/TourFilter';
import HeaderImg from '../components/HeaderImg/HeaderImg';

const Tours = () => {
    return (
        <div className='dark:bg-[#101828] dark:text-white'>
            <HeaderImg title="Tour" currenPage="Tour" />
            <TourFilter />
        </div>
    );
};

export default Tours;