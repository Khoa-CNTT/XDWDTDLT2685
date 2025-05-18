import React, { useState } from 'react';
import { putBookingTour } from '../../services/booking';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaSyncAlt } from 'react-icons/fa';

const BookingDetailSibar = ({
    tourId, // Đây là tour_id
    total_price,
    title,
    start_date,
    end_date,
    price_adult,
    price_child,
    num_adults,
    num_children,
    setBookings
}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const bookingId = localStorage.getItem('booking_id');

    const handleCancel = async () => {
        try {
            setLoading(true);
            const res = await putBookingTour(bookingId);
            if (res.status === 200) {
                setTimeout(() => {
                    toast.success('Hủy tour thành công!');
                    navigate("/tourbooking");
                    window.scrollTo(0, 0);
                }, 1000);
            } else {
                setTimeout(() => {
                    toast.warning('Hủy tour không thành công!');
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi trong quá trình hủy tour');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className='pt-10'>
            <div className='w-full h-auto dark:bg-[#101828] dark:text-white border border-gray-200 p-10 rounded-lg shadow-xl bg-white'>
                <div className='space-y-4'>
                    <p className='text-xl font-bold'>{title}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày khởi hành:</p>
                            <p className="text-lg">{start_date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày kết thúc:</p>
                            <p className="text-lg">{end_date}</p>
                        </div>
                    </div>

                    <hr className='border-gray-400' />

                    <div className='flex flex-col space-y-6'>
                        <div className='flex justify-between text-lg'>
                            <p>Người lớn</p>
                            <p className='font-semibold'>{num_adults} x {price_adult.toLocaleString('vi-VN')} VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Trẻ Em</p>
                            <p className='font-semibold'>{num_children} x {price_child.toLocaleString('vi-VN')} VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Giảm giá</p>
                            <p className='font-semibold'>0 VNĐ</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-xl font-semibold text-red-500'>Tổng cộng:</p>
                            <p className='text-xl font-bold text-red-500'>{total_price.toLocaleString()} VND</p>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={handleCancel}
                            className="w-full p-2 text-lg font-semibold text-white bg-orange-500 rounded-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaSyncAlt className="animate-spin" />
                                </div>
                            ) : (
                                "Hủy tour"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailSibar;
