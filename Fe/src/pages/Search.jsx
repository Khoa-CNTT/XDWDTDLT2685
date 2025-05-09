import React from 'react';
import HeaderImg from '../components/HeaderImg/HeaderImg';
import SearchTour from '../components/Search/SearchTour';

const Search = () => {
    return (
        <div className='dark:bg-[#101828] dark:text-white'>
            <HeaderImg title="Tìm kiếm" currenPage="Tìm kiếm" />
            <SearchTour />
        </div>
    );
};

export default Search;