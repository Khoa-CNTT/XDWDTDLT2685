import React from 'react';
import Button from '../Button/Button';
import { FaRegCheckCircle } from 'react-icons/fa';

const GuideSection = () => {
    return (
        <div className='pt-10'>
            <div className='container'>
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
            </div>
        </div>
    );
};

export default GuideSection;