import React from 'react';

const BannerImg = ({ img }) => {
    return (
        <div
            data-aos="zoom-in"
            className="h-[500px] w-full bg-cover bg-center dark:bg-[#101828] dark:text-white"
            style={{ backgroundImage: `url(${img})` }}
        ></div>
    );
};

export default BannerImg;
