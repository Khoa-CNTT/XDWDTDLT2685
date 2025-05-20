import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCode } from '../../services/authApi';

const VerifyCode = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');

    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('setEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleChange = (index, value) => {
        const numericValue = value.replace(/\D/g, '');

        if (numericValue.length === 1) {
            const newCode = [...code];
            newCode[index] = numericValue;
            setCode(newCode);

            if (index < 5) {
                inputRefs.current[index + 1].focus();
            }
        } else if (numericValue === '') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async () => {
        const finalCode = code.join('');
        if (finalCode.length === 6) {
            try {
                const res = await getCode(finalCode);
                if (res.status === 200) {
                    toast.success("Mã xác nhận hợp lệ");
                    localStorage.setItem('code', finalCode);
                    navigate('/change-password');
                } else {
                    toast.error('Mã xác nhận không hợp lệ');
                }
            } catch (error) {
                toast.error('Mã xác nhận không hợp lệ');
            }
        } else {
            toast.warning('Vui lòng nhập đầy đủ 6 số');
        }
    };

    return (
        <div className='pt-[150px] dark:bg-[#101828] dark:text-white'>
            <div className='container'>
                <div className='w-[500px] mx-auto h-[350px] bg-white dark:bg-[#101828] border border-gray-200 p-6 rounded-lg shadow-xl'>
                    <div className='flex items-center gap-[90px]'>
                        <AiOutlineArrowLeft onClick={() => navigate('/forgot-password')} className='w-8 h-8 text-orange-500 cursor-pointer' />
                        <p className='text-2xl font-medium text-center'>Nhập mã xác nhận</p>
                    </div>
                    <p className='mt-5 mb-6 text-sm text-center text-gray-500'>
                        Mã xác minh đã được gửi đến <br />
                        <span className='font-medium text-orange-500'>{email}</span>
                    </p>

                    <div className='flex justify-center gap-4 mb-4'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-10 h-12 text-xl font-semibold text-center border-b-2 border-gray-400 dark:text-black focus:outline-none focus:border-orange-500'
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        className='w-full p-3 mt-6 text-white bg-orange-500 rounded-lg'
                    >
                        Kế tiếp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyCode;
