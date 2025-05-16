import React, { useEffect, useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';


const BookingDetailSibar = ({
    total_price,
    title,
    start_date,
    end_date,
    price_adult,
    price_child,
    num_adults,
    num_children }) => {
    const [loading, setLoading] = useState(false)

    return (

        <div className='pt-10'>
            <div className='w-full h-auto dark:bg-[#101828] dark:text-white border border-gray-200 p-10 rounded-lg shadow-xl bg-white'>
                <div className='space-y-4'>
                    <p className='text-xl font-bold'>{title}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày khởi hành:</p> {/* thêm w-40 */}
                            <p className="text-lg ">{start_date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày kết thúc:</p> {/* thêm w-40 */}
                            <p className="text-lg ">{end_date}</p>
                        </div>
                    </div>

                    <hr className='border-gray-400 ' />

                    <div className='flex flex-col space-y-6'>
                        <div className='flex justify-between text-lg'>
                            <p>Người lớn</p>
                            <p className='font-semibold'>{num_adults} x {price_adult.toLocaleString('vi-VN')}VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Trẻ Em</p>
                            <p className='font-semibold'>{num_children} x {price_child.toLocaleString('vi-VN')}VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Giảm giá</p>
                            <p className='font-semibold'>0 VNĐ</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-xl font-semibold text-red-500'>Tổng cộng:</p>
                            <p className='text-xl font-bold text-red-500'>{total_price.toLocaleString()}VND</p>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            className={`w-full p-2 text-lg font-semibold text-white rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500'}`}
                            disabled={loading}

                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaSyncAlt className="animate-spin" />
                                </div>
                            ) : (
                                "Hủy Tour"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailSibar;
