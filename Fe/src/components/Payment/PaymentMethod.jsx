import React, { useState } from 'react';
import { FaBuilding } from "react-icons/fa";
import Momo from '../../assets/Travel/momo.jpg';
import Vnpay from '../../assets/Travel/vnpay.png';

// Hàm map phương thức thanh toán
const mapPaymentMethod = (method) => {
    switch (method) {
        case 'OFFICE':
            return 'OFFICE';
        case 'VNPAY':
            return 'VNPAY';
        case 'MOMO':
            return 'MOMO';
        default:
            return '';
    }
};

const PaymentMethod = ({ setPaymentMethod }) => {
    const [selected, setSelected] = useState('');

    const handleSelect = (method) => {
        setSelected(method);
        setPaymentMethod(method); 
    };

    return (
        <div className='mt-5'>
            <h1 className='text-xl font-semibold'>Phương thức thanh toán</h1>
            <div className='flex flex-col mt-3 space-y-4 cursor-pointer'>
                <div
                    className={`border border-gray-200 h-[60px] rounded-lg flex items-center px-4 ${selected === 'office' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleSelect('OFFICE')}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selected === 'OFFICE'}
                        onChange={() => handleSelect('OFFICE')}
                        className="w-4 h-4 mr-3"
                    />
                    <FaBuilding className='w-6 h-6 text-primary' />
                    <span className="ml-3 text-xl font-medium">Thanh toán tại văn phòng</span>
                </div>

                <div
                    className={`border border-gray-200 h-[60px] rounded-lg flex items-center px-4 ${selected === 'vnpay' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleSelect('VNPAY')}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selected === 'VNPAY'}
                        onChange={() => handleSelect('VNPAY')}
                        className="w-4 h-4 mr-3"
                    />
                    <img src={Vnpay} className='object-cover w-8 h-8 rounded-lg' alt="" />
                    <span className="ml-3 text-xl font-medium">Thanh toán bằng Vnpay</span>
                </div>

                <div
                    className={`border border-gray-200 h-[60px] rounded-lg flex items-center px-4 ${selected === 'momo' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleSelect('MOMO')}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selected === 'MOMO'}
                        onChange={() => handleSelect('MOMO')}
                        className="w-4 h-4 mr-3"
                    />
                    <img src={Momo} className='object-cover w-6 h-6 rounded-lg' alt="" />
                    <span className="ml-3 text-xl font-medium">Thanh toán bằng Momo</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
