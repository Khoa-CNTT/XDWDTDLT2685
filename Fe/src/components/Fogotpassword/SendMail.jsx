import React, { useState } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../services/authApi';
const SendMail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.warning("Vui lòng nhập email");
            return;
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            toast.error("Email không hợp lệ");
            return;
        }

        try {
            const res = await forgotPassword(email);
            console.log(res);
            if (res.status == 200) {
                toast.success("Đã gửi email, vui lòng kiểm tra hộp thư!");
                navigate('/verify-Code');
            } else {
                toast.error("email không tồn tại");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    };

    return (
        <div className='pt-[150px]'>
            <div className='container'>
                <div className='w-[600px] h-[300px] mx-auto bg-white dark:bg-[#101828] dark:text-white border border-gray-200 p-6 rounded-lg shadow-xl'>
                    <div className='flex items-center gap-[160px]'>
                        <AiOutlineArrowLeft onClick={() => navigate('/login')} className='w-8 h-8 text-orange-500 cursor-pointer' />
                        <p className='text-2xl font-medium text-center'>Đặt lại mật khẩu</p>
                    </div>

                    <div className='flex flex-col items-center mt-10 space-y-8'>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-3 dark:text-[#101828] w-full max-w-[500px] border border-gray-400 rounded-lg'
                            placeholder='Vui lòng nhập email của bạn đã đăng ký...'
                        />
                        <button onClick={handleSubmit} className='w-full max-w-[500px] p-3  bg-orange-500 text-white rounded-lg '>
                            Gửi yêu cầu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMail;
