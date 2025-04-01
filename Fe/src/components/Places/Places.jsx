import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlacesCard from './PlacesCard';

const Places = ({
    hideTitle = true,
    booking = true,
    size = "default",
    left = false,
    container = true,
    star = false,
    title = "Khám Phá Kho Báu Việt Nam Cùng Mixivivu"
}) => {
    const [placesData, setPlaceData] = useState([]);

    const getPlaces = async () => {
        try {
            const res = await axios.get("https://67b48e00392f4aa94fab5b59.mockapi.io/Bestplace");
            setPlaceData(res.data);
        } catch {
            console.log("Lỗi khi lấy dữ liệu");
        }
    };

    useEffect(() => {
        getPlaces();
    }, []);

    return (
        <div className='py-10 dark:bg-[#101828] dark:text-white'>
            <section data-aos="fade-up " className={container ? 'container' : ''} >
                {hideTitle && (
                    <h1 className='py-2 pl-3 my-8 text-3xl font-bold text-left border-l-8 border-primary/50'>
                        {title}
                    </h1>
                )}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
                    {placesData.map((item) => (
                        <PlacesCard
                            key={item.id}
                            item={item}
                            booking={booking}
                            size={size}
                            left={left}
                            star={star}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Places;
