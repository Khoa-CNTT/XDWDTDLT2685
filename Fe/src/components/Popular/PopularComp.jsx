import React, { useEffect, useState } from 'react';
import BlogImg from '../../assets/Travel/dauphay.webp'
import axios from 'axios';
import PopularCard from './PopularCard';

const PopularComp = () => {
    const [popularData, setPopularData] = useState([])
    const getPopular = async () => {
        try {
            const res = await axios.get("https://67b48e00392f4aa94fab5b59.mockapi.io/Bestplace")
            setPopularData(res.data)
        } catch {
            console.log("lỗi");
        }
    }
    useEffect(() => {
        getPopular()
    }, [])
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
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
                    {popularData.map((item, index) => (
                        <PopularCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularComp;