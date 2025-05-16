import React, { useEffect, useState } from 'react';
import BlogImg from '../../assets/Travel/dauphay.webp'
import PopularCard from './PopularCard';
import { getPopular } from '../../services/tour';

const PopularComp = () => {
    const [popularData, setPopularData] = useState([])

    const fetchPopular = async () => {
        try {
            const res = await getPopular();
            setPopularData(res.data)
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    }

    useEffect(() => {
        fetchPopular()
    }, [])

    // Lấy 3 phần tử đầu, và 2 phần tử cuối (nếu có)
    const firstThree = popularData.slice(0, 3);
    const lastTwo = popularData.slice(3, 5);

    return (
        <div className='pt-20 dark:bg-[#101828] dark:text-white'>
            <div data-aos="fade-up" className='container' >
                <div className='mx-auto text-center '>
                    <h1 className='text-4xl font-bold '>Khám Phá Các Điểm Đến Phổ Biến</h1>
                    <p className='mt-6 text-gray-500'>Website <span className='px-1 text-center text-white rounded-full bg-primary'>34500+</span> trãi nghiệm phổ biến nhất </p>
                </div>
                <img src={BlogImg}
                    className="w-[100px] h-auto mx-auto mt-5"
                    alt=""
                />

                {/* 3 ảnh đầu */}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
                    {firstThree.map((item, index) => (
                        <PopularCard key={index} item={item} />
                    ))}
                </div>

                {/* 2 ảnh cuối nằm giữa */}
                {lastTwo.length > 0 && (
                    <div className="flex justify-center gap-10 mt-10">
                        {lastTwo.map((item, index) => (
                            <div key={index} className="w-[500px]">
                                <PopularCard item={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularComp;
