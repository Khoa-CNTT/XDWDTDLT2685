import React from 'react';
import TourHistory from './TourHistory';
import useFilterTourBooking from '../../hooks/useFilterTourBooking';

const TourBookingList = () => {
    const statuses = ["Tất cả", "Chưa xác nhận", "Đã xác nhận", "Hoàn thành", "Đã hủy"];
    const { selected, setSelected, booking} = useFilterTourBooking(); // hook cần xử lý theo trạng thái thay vì vùng

    return (
        <div className='pt-10 dark:bg-[#101828] dark:text-white'>
            <div className='flex flex-col justify-center'>
                <div className="inline-flex items-center justify-center p-3 bg-white border border-gray-300 rounded-full dark:bg-[#101828] dark:border-white shadow-sm w-fit mx-auto">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelected(status)}
                            className={`px-6 text-lg py-3 rounded-full font-semibold transition-all duration-200 ${selected === status
                                ? "bg-primary text-white"
                                : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Truyền danh sách tour đã lọc xuống tour history */}
                <TourHistory bookings={booking} />
            </div>
        </div>
    );
};

export default TourBookingList;