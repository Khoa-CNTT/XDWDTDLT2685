import React from 'react';
import { FaBuilding } from "react-icons/fa";
import Momo from '../../assets/Travel/momo.jpg'
import Vnpay from '../../assets/Travel/vnpay.png'
const PaymentMethod = () => {
    return (
        <div className='mt-5'>
            <h1 className='text-xl font-semibold'>Phương thức thanh toán</h1>
            <div className='flex flex-col mt-3 space-y-4 cursor-pointer'>
                {/* Thanh toán tại văn phòng */}
                <div className='border border-gray-200 h-[60px] rounded-lg flex items-center px-4'>
                    <input type="radio" className="w-4 h-4 mr-3" />
                    <FaBuilding className='w-6 h-6 text-primary' />
                    <span className="ml-3 text-xl font-medium">Thanh toán tại văn phòng</span>
                </div>
                {/* Thanh toán VNPAY */}
                <div className='border border-gray-200 h-[60px] rounded-lg flex items-center px-4'>
                    <input type="radio" className="w-4 h-4 mr-3" />
                    <img src={Vnpay} className='object-cover w-8 h-8 rounded-lg' alt="" />
                    <span className="ml-3 text-xl font-medium">Thanh toán bằng Vnpay</span>
                </div>
                {/* Thanh toán MoMo */}
                <div className='border border-gray-200 h-[60px] rounded-lg flex items-center px-4'>
                    <input type="radio" className="w-4 h-4 mr-3" />
                    <img src={Momo} className='object-cover w-6 h-6 rounded-lg' alt="" />
                    <span className="ml-3 text-xl font-medium">Thanh toán bằng Momo</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
