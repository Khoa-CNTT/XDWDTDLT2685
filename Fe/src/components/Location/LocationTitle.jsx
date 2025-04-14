import React from 'react';
import BlogImg from '../../assets/Travel/dauphay.webp'

const LocationTitle = () => {
    return (
        <div className='pt-[150px] dark:bg-[#101828] dark:text-white'>
            <div className='container' >
                <div className='mx-auto text-center '>
                    <h1 className='text-4xl font-bold '>Khám Phá Các Điểm Đến Phổ Biến</h1>
                    <p className='mt-6 text-lg text-gray-500'>Website <span className='px-1 text-center text-white rounded-full bg-primary'>34500+</span> trãi nghiệm phổ biến nhất mà bạn sẽ nhớ </p>
                </div>
                <img src={BlogImg}
                    className="w-[100px] h-auto mx-auto mt-5"
                    alt=""
                />
            </div>
        </div>
    );
};

export default LocationTitle;