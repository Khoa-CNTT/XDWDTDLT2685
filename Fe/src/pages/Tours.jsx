import React from 'react';
import TourFilter from '../components/Tour/TourFilter';
import Places from '../components/Places/Places';
import Sort from '../components/Sort/Sort';
import HeaderImg from '../components/HeaderImg/HeaderImg';

const Tours = () => {
    return (
        <div className=''>
            <HeaderImg title="Tour" currenPage="Tour" />
            <div className='flex gap-3 p-5 dark:bg-[#101828] dark:text-white'>
                <div className='w-1/4'>
                    <TourFilter />
                </div>
                <div className=''>
                    <Sort />
                    <Places hideTitle={false} booking={false} size="small" left={true} container={false} star={true} />
                </div>
            </div>

        </div>
    );
};

export default Tours;