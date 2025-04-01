import React from 'react';
import imgSection from '../../assets/Travel/Login.png'
import { MdFlight } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { MdOutlineHotel } from "react-icons/md";
import { MdFastfood } from "react-icons/md";

const Banner = () => {
    return (
        <>
            <div className='min-h-[550px] dark:bg-[#101828] dark:text-white'>
                <div className='min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 lg:px-16'>
                    <div className='container'>
                        <div className='grid items-center grid-cols-1 gap-6 sm:grid-cols-2'>
                            {/* img section */}
                            <div data-aos="flip-up">
                                <img
                                    className='max-w-[450px] h-[350px] w-full object-cover mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)]'
                                    src={imgSection} alt="" />
                            </div>
                            {/* text section */}
                            <div>
                                <h1 data-aos="fade-up" className='text-xl text-left font-bold sm:text-xl max-w-[500px]'>Khám phá vẻ đẹp tuyệt vời của Việt Nam qua những chuyến đi đầy ấn tượng</h1>
                                <p data-aos="fade-up" className='mt-3 text-sm max-w-[500px] leading-7 tracking-wide text-left text-gray-400'>Hành trình khám phá mở ra những trải nghiệm mới lạ, đưa bạn đến với cảnh đẹp tuyệt vời và văn hóa độc đáo.</p>
                                <div data-aos="zoom-in" className="grid grid-cols-2 gap-6 ">
                                    <div className='mt-3 space-y-6'>
                                        <div className='flex items-center gap-4'>
                                            <MdFlight className="w-12 h-12 p-4 text-4xl rounded-full dark:text-[#101828] shadow-sm bg-violet-200 "></MdFlight>
                                            <p>Chuyến bay</p>
                                        </div>
                                        <div className='flex items-center gap-4 mt-3'>
                                            <MdOutlineHotel className="w-12 h-12 p-4 text-4xl dark:text-[#101828] bg-pink-200 rounded-full shadow-sm"></MdOutlineHotel>
                                            <p>Khách sạn</p>
                                        </div>
                                    </div>
                                    <div className='mt-3 space-y-6'>
                                        <div className='flex items-center gap-4'>
                                            <FaWifi className="w-12 h-12 p-4 text-4xl bg-blue-200 dark:text-[#101828] rounded-full shadow-sm"></FaWifi>
                                            <p>Wi-Fi</p>
                                        </div>
                                        <div className='flex items-center gap-4 mt-3'>
                                            <MdFastfood className="w-12 h-12 p-4 text-4xl bg-orange-200 dark:text-[#101828] rounded-full shadow-sm"></MdFastfood>
                                            <p>Thực phẩm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
