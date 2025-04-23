import React from 'react';
import { BsTicketPerforated } from "react-icons/bs";
import { MdArrowRightAlt } from "react-icons/md";

const PaymentSidebar = ({ agreed, countAdult, countChildren }) => {
    const priceAdult = 3999000;
    const priceChild = 2000000;

    const total = countAdult * priceAdult + countChildren * priceChild;

    return (
        <div className='pt-10'>
            <div className='w-full h-auto dark:bg-[#101828] dark:text-white border border-gray-200 p-10 rounded-lg shadow-xl bg-white'>
                <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                        <BsTicketPerforated className='w-6 h-6 ' />
                        <p className='text-lg'>Mã tour:</p>
                        <p className='font-semibold'>HNLCSP4N3D</p>
                    </div>
                    <p className='text-xl font-bold'>MIỀN BẮC 4N3Đ | HÀ NỘI – LÀO CAI – SA PA</p>
                    <div className='flex items-center gap-2'>
                        <p className='text-lg text-gray-500'>22-03-2025</p>
                        <MdArrowRightAlt className='w-6 h-6' />
                        <p className='text-lg text-gray-500'>26-03-2025</p>
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
                        >
                            Xác nhận
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
