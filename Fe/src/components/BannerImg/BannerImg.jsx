import React from 'react';

const BannerImg = ({ img }) => {
    return (
        <div
            data-aos="zoom-in"
            className="w-full h-[500px] bg-cover bg-center dark:bg-[#101828] dark:text-white"
            style={{ backgroundImage: `url(${img})` }}
        ></div>
    );
};

export default BannerImg;
