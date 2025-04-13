import React from 'react';
import Button from '../Button/Button';
import { FaRegCheckCircle } from 'react-icons/fa';

const GuideSection = () => {
    return (
        <div className='pt-10 '>
            <div className='container flex '>
                {/* bên trái */}
                <div className='w-1/2'>
                    <h1 className='text-4xl font-semibold max-w-[450px] leading-1'>Ultimate Explorer's Handbook Your Complete Guide To Journeys</h1>
                    <p className='mt-10 text-gray-400 max-w-[600px] text-lg '>
                        Chúng tôi hợp tác chặt chẽ với khách hàng để hiểu rõ những thách thức và mục tiêu, cung cấp các giải pháp tùy chỉnh nhằm nâng cao hiệu quả, tăng lợi nhuận và thúc đẩy tăng trưởng bền vững.
                    </p>
                    <div className='flex items-center gap-10 mt-10'>
                        <div className='flex items-center gap-3'>
                            <FaRegCheckCircle className='w-6 h-6 text-orange-400' />
                            <p>Cơ quan trải nghiệm</p>
                        </div>
                        <div className='flex items-center gap-3' >
                            <FaRegCheckCircle className='w-6 h-6 text-orange-400' />
                            <p>Đội ngũ chuyển nghiệp</p>
                        </div>
                    </div>
                    <Button text="Khám phá Guide" width="max-w-[250px]" />
                </div>
                {/* Bên phải */}
                <div className='flex'>
                    <div className='relative'>
                        <img
                            className='w-[330px] rounded-lg h-[360px]'
                            src="https://img.freepik.com/free-photo/back-view-island-outdoors-tree-standing_1122-2293.jpg?uid=R81351970&ga=GA1.1.1528150706.1741229786&semt=ais_hybrid&w=740" alt="" />
                    </div>
                    <div>
                        <img
                            className='w-[330px] rounded-lg h-[360px] absolute left-[65%] translate-y-[50px] translate-x-[40px]'
                            src="https://img.freepik.com/free-photo/tourist-couple-looking-map_23-2147828005.jpg?uid=R81351970&ga=GA1.1.1528150706.1741229786&semt=ais_hybrid&w=740" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideSection;