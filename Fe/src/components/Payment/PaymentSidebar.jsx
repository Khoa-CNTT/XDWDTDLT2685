import React, { useEffect, useState } from 'react';
import { BsTicketPerforated } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postBooking } from '../../services/booking';


const PaymentSidebar = ({ agreed, countAdult, countChildren, full_name, email, phone_number, address }) => {
    const location = useLocation();
    const { item, startDate, endDate } = location.state || {};
    // console.log("1111", item)

    const priceAdult = item.price_adult;
    const priceChild = item.price_child;

    const total = countAdult * priceAdult + countChildren * priceChild;

    const handleSubmit = async () => {
        try {
            const tour_id = localStorage.getItem('tour_id');
            const user_id = localStorage.getItem('user_id');
            const data = {
                tour_id: tour_id,
                user_id: user_id,
                booking_date: startDate,
                num_adults: countAdult,
                num_children: countChildren,
                total_price: total,
                booking_status: "PENDING",
                full_name: full_name,
                email: email,
                address: address,
                phone_number: phone_number
            };
            console.log("Sending data:", data);
            const res = await postBooking(data);
            console.log("res", res)
            if (res.status === 200) {
                toast.success('Đặt tour thành công!');
                console.log('Đặt tour thành công', res.data);
            } else {
                toast.warning('Đặt tour không thành công!');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đặt tour!');
            console.error('Lỗi hệ thống:', error);
        }
    };

    return (

        <div className='pt-10'>
            <div className='w-full h-auto dark:bg-[#101828] dark:text-white border border-gray-200 p-10 rounded-lg shadow-xl bg-white'>
                <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                        <BsTicketPerforated className='w-6 h-6 ' />
                        <p className='text-lg'>Mã tour:</p>
                        <p className='font-semibold'>HNLCSP4N3D</p>
                    </div>
                    <p className='text-xl font-bold'>{item.title}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày khởi hành:</p> {/* thêm w-40 */}
                            <p className="text-lg ">{startDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày kết thúc:</p> {/* thêm w-40 */}
                            <p className="text-lg ">{endDate}</p>
                        </div>
                    </div>

                    <hr className='border-gray-400 ' />

                    <div className='flex flex-col space-y-6'>
                        <div className='flex justify-between text-lg'>
                            <p>Người lớn</p>
                            <p className='font-semibold'>{countAdult} x {priceAdult.toLocaleString()} VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Trẻ Em</p>
                            <p className='font-semibold'>{countChildren} x {priceChild.toLocaleString()} VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Giảm giá</p>
                            <p className='font-semibold'>0 VNĐ</p>
                        </div>
                    </div>

                    <hr className='border-gray-400 ' />
                    <div className='flex items-center gap-5'>
                        <input
                            type="text"
                            placeholder='Mã giảm giá'
                            className='p-2 border border-gray-300 rounded-lg'
                        />
                        <button className='p-2 px-4 text-lg font-normal text-white bg-orange-500 rounded-lg'>
                            Áp dụng
                        </button>
                    </div>

                    <hr className='border-gray-400 ' />
                    <div className='flex justify-between'>
                        <p className='text-xl font-semibold text-red-500'>Tổng cộng:</p>
                        <p className='text-xl font-bold text-red-500'>{total.toLocaleString()} VND</p>
                    </div>

                    <div className="relative">
                        <button
                            className="w-full p-2 text-lg font-semibold text-white bg-orange-500 rounded-lg"
                            disabled={!agreed}
                            onClick={handleSubmit}
                        >
                            Đặt Ngay
                        </button>

                        {!agreed && (
                            <div className="absolute inset-0 bg-white rounded-lg opacity-50 cursor-not-allowed"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSidebar;
