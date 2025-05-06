import React, { useEffect, useState } from 'react';
import PlacesCard from './PlacesCard';
import Pagination from '../Pagination/Pagination';
import { getAllTour } from '../../services/tour';

const Places = ({
    hideTitle = true,
    booking = true,
    size = "default",
    left = false,
    container = true,
    star = false,
    showPagination = true,
    title = "Khám Phá Kho Báu Việt Nam Cùng Mixivivu",
    tours = null //  nhận props tours
}) => {
    const [placesData, setPlaceData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const getAllTours = async (page) => {
        try {
            const res = await getAllTour(page);
            setTotalPages(res.data.totalPages);
            setPlaceData(res.data.tours);
        } catch {
            console.log("Lỗi khi lấy dữ liệu");
        }
    };

    useEffect(() => {
        if (tours) {
            setPlaceData(tours); //  Nếu có tours props, thì dùng luôn
        } else {
            getAllTours(0); //  Nếu không có tours props, mới gọi API
        }
    }, [tours]); //  Phải thêm tours vào dependency

    return (
        <div className='py-10 dark:bg-[#101828] dark:text-white'>
            <section data-aos="fade-up" className={container ? 'container' : ''}>
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
                {showPagination && !tours && ( //  Nếu đang lọc tours thì không hiển thị phân trang
                    <Pagination totalPages={totalPages} getAllTours={getAllTours} />
                )}
            </section>
        </div>
    );
};

export default Places;