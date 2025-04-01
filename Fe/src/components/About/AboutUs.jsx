import React from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";

const AboutUs = () => {
    return (
        <div className='pt-14'>
            <div className='container' data-aos="fade-up">
                <div className='flex items-center'>
                    <p className='p-2 w-[150px] dark:text-[#101828] font-semibold bg-gray-200 text-center border border-orange-300 rounded-full flex-shrink-0'>
                        Về chúng tôi
                    </p>
                    <div className='ml-[10%]'>
                        <p className='max-w-[500px] left-[200px] text-3xl font-semibold'>Kinh Nghiệm Và Công Ty Du Lịch Chuyên Nghiệp Ở Việt Nam</p>
                    </div>
                </div>
                <div className='flex justify-center mt-12 ml-[20%] gap-6'>
                    <div>
                        <div className="relative ml-[30%] flex items-center justify-center w-40 h-40 bg-white border border-gray-200 rounded-full shadow-lg">
                            <div className="text-center dark:text-[#101828]">
                                <p className="text-lg font-medium ">Chúng tôi có</p>
                                <p className="text-6xl font-bold">5+</p>
                            </div>
                            <div className="absolute transform rotate-12 -translate-y-1/4 top-1 right-2 translate-x-1/4">
                                <div className="px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-full">
                                    Năm kinh nghiệm
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='ml-[10%]'>
                        <p className='max-w-[700px] text-lg text-gray-500'>
                            Chúng tôi chuyên tạo ra những trải nghiệm thành phố khó quên cho du khách muốn khám phá cảnh quan đô thị. Các tour du lịch có hướng dẫn viên chuyên nghiệp của chúng tôi sẽ đưa du khách qua những con phố sôi động, các địa danh lịch sử
                            và những viên ngọc ẩn giấu của mỗi thành phố.
                        </p>
                        <div className='flex items-center pt-10'>
                            <div className='space-y-5 '>
                                <div className='flex items-center gap-3'>
                                    <FaRegCheckCircle className='w-6 h-6 text-orange-400' />
                                    <p>Cơ quan trải nghiệm</p>
                                </div>
                                <div className='flex items-center gap-3' >
                                    <FaRegCheckCircle className='w-6 h-6 text-orange-400' />
                                    <p>Du lịch chi phí thấp</p>
                                </div>
                            </div>
                            <div className=' space-y-5 ml-[100px]'>
                                <div className='flex items-center gap-3'>
                                    <FaRegCheckCircle className='w-6 h-6 text-orange-400' />
                                    <p>Đội ngũ chuyên nghiệp</p>
                                </div>
                                <div className='flex items-center gap-3' >
                                    <FaRegCheckCircle className='w-6 h-6 text-orange-400' />
                                    <p>Hổ trợ trục tuyến 24/7</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center gap-2 mt-10 group">
                            <div className="p-2 border text-center border-gray-200 w-[200px] rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:bg-gray-200">
                                <Link className="font-semibold">Khám phá Tour</Link>
                            </div>
                            <FaArrowRightLong className="absolute left-[26%] top-[15px]  transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;