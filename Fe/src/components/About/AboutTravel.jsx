import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Travel from '../../assets/Travel/AboutTravel.jpg'

const AboutTravel = () => {
    return (
        <div className='pt-20'>
            <div className='container flex items-center justify-center gap-5'>
                {/* bên trái */}
                <div className='w-1/2' data-aos="fade-left">
                    <div className='space-y-3'>
                        <p className='text-3xl font-semibold max-w-[350px]'>
                            Du Lịch Với Sự Tự Tin Lý Do Hàng Đầu Để Chọn Công Ty Của Chúng Tôi
                        </p>
                        <p className='text-gray-500 max-w-[400px]'>
                            Chúng tôi hợp tác chặt chẽ với khách hàng để hiểu rõ những
                            thách thức và mục tiêu, cung cấp các giải pháp tùy chỉnh để nâng cao hiệu quả, tăng lợi nhuận và thúc đẩy tăng trưởng bền vững.</p>
                    </div>
                    <div className='flex items-center gap-10 mt-5'>
                        <div className='space-y-2'>
                            <p className='text-4xl font-bold'>1K+</p>
                            <p>Điểm đến phổ biến</p>
                        </div>
                        <div className='space-y-2'>
                            <p className='text-4xl font-bold'>8m+</p>
                            <p>Khách hàng phải hài lòng</p>
                        </div>
                    </div>
                    <div className="relative flex items-center gap-2 mt-10 text-white group">
                        <div className="p-2 border text-center border-gray-200 w-[200px] bg-primary  rounded-full transition-all duration-300 group-hover:shadow-lg ">
                            <Link className="font-semibold">Khám phá Tour</Link>
                        </div>
                        <FaArrowRightLong className="absolute left-[34%] top-[15px]  transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                    </div>
                </div>
                {/* Bênphải */}
                <div data-aos="fade-right">
                    <img className='object-cover rounded-2xl' src={Travel} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AboutTravel;