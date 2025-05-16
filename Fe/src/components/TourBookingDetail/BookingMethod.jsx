import React, { useState, useEffect } from 'react';
import { FaBuilding } from "react-icons/fa";
import Momo from '../../assets/Travel/momo.jpg';
import Vnpay from '../../assets/Travel/vnpay.png';

// Hàm map phương thức thanh toán
const mapPaymentMethod = (method) => {
    switch (method) {
        case 'OFFICE':
        case 'VNPAY':
        case 'MOMO':
            return method;
        default:
            return '';
    }
};

const BookingMethod = ({ setPaymentMethod, value = '', disabled = false }) => {
    const [selected, setSelected] = useState('');

    useEffect(() => {
        if (value) {
            setSelected(mapPaymentMethod(value));
        }
    }, [value]);

    const handleSelect = (method) => {
        if (disabled) return;
        setSelected(method);
        setPaymentMethod(method);
    };

    return (
        <div className='mt-5'>
            <h1 className='text-xl font-semibold'>Phương thức thanh toán</h1>
            <div className='flex flex-col mt-3 space-y-4'>

                {/* OFFICE */}
                <div
                    className={`border h-[60px] rounded-lg flex items-center px-4 ${selected === 'OFFICE' ? 'ring-2 ring-red-500' : 'border-gray-200'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleSelect('OFFICE')}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selected === 'OFFICE'}
                        onChange={() => handleSelect('OFFICE')}
                        className="w-4 h-4 mr-3"
                        disabled={disabled}
                    />
                    <FaBuilding className='w-6 h-6 text-primary' />
                    <span className="ml-3 text-xl font-medium">Thanh toán tại văn phòng</span>
                </div>

                {/* VNPAY */}
                <div
                    className={`border h-[60px] rounded-lg flex items-center px-4 ${selected === 'VNPAY' ? 'ring-2 ring-red-500' : 'border-gray-200'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleSelect('VNPAY')}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selected === 'VNPAY'}
                        onChange={() => handleSelect('VNPAY')}
                        className="w-4 h-4 mr-3"
                        disabled={disabled}
                    />
                    <img src={Vnpay} className='object-cover w-8 h-8 rounded-lg' alt="" />
                    <span className="ml-3 text-xl font-medium">Thanh toán bằng Vnpay</span>
                </div>

                {/* MOMO */}
                <div
                    className={`border h-[60px] rounded-lg flex items-center px-4 ${selected === 'MOMO' ? 'ring-2 ring-red-500' : 'border-gray-200'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleSelect('MOMO')}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selected === 'MOMO'}
                        onChange={() => handleSelect('MOMO')}
                        className="w-4 h-4 mr-3"
                        disabled={disabled}
                    />
                    <img src={Momo} className='object-cover w-6 h-6 rounded-lg' alt="" />
                    <span className="ml-3 text-xl font-medium">Thanh toán bằng Momo</span>
                </div>
            </div>
        </div>
    );
};

export default BookingMethod;
