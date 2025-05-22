import React, { useState } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../services/authApi';
import { FaSyncAlt } from 'react-icons/fa';
const SendMail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            const res = await forgotPassword(email);
            console.log(res);
            if (res.status == 200) {
                setTimeout(() => {
                    toast.success("Đã gửi email, vui lòng kiểm tra hộp thư!");
                    localStorage.setItem("setEmail", email)
                    navigate('/verify-Code');
                }, 100);
            } else {
                setTimeout(() => {
                    toast.error("email không tồn tại");
                }, 1000);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
            setLoading(false)
        }
    };

    return (
        <div className='pt-[150px] bg-white dark:bg-[#101828]'>
            <div className='container'>
                <div className='w-[550px] h-[300px] mx-auto dark:text-white border border-gray-200 p-6 rounded-lg shadow-xl'>
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
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            disabled={loading}
                            className='flex items-center justify-center w-full p-3 text-white bg-orange-500 rounded-lg '
                        >
                            {loading ? (
                                <>
                                    <FaSyncAlt className='w-5 h-5 text-white animate-spin' />
                                </>
                            ) : (
                                "Gửi yêu cầu"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMail;
