import React, { useEffect, useState } from 'react';
import { BsTicketPerforated } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postBooking } from '../../services/booking';
import { FaSyncAlt } from 'react-icons/fa';


const BookingDetailSibar = ({total_price,title}) => {
    const [loading, setLoading] = useState(false)
    // console.log("1111", item)
    // const navigate = useNavigate();
    // const priceAdult = item.price_adult;
    // const priceChild = item.price_child;

    // const total = countAdult * priceAdult + countChildren * priceChild;
    // const total_quality = countAdult + countChildren;

    return (

        <div className='pt-10'>
            <div className='w-full h-auto dark:bg-[#101828] dark:text-white border border-gray-200 p-10 rounded-lg shadow-xl bg-white'>
                <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                        <BsTicketPerforated className='w-6 h-6 ' />
                        <p className='text-lg'>Mã tour:</p>
                        <p className='font-semibold'></p>
                    </div>
                    <p className='text-xl font-bold'>{title}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày khởi hành:</p> {/* thêm w-40 */}
                            <p className="text-lg "></p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày kết thúc:</p> {/* thêm w-40 */}
                            <p className="text-lg "></p>
                        </div>
                    </div>

                    <hr className='border-gray-400 ' />

                    <div className='flex flex-col space-y-6'>
                        <div className='flex justify-between text-lg'>
                            <p>Người lớn</p>
                            <p className='font-semibold'> VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Trẻ Em</p>
                            <p className='font-semibold'> VND</p>
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
