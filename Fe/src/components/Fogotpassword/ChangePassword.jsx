import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = () => {


    };

    return (
        <div className='pt-[150px]'>
            <div className='container'>
                <div className='w-[600px] mx-auto bg-white dark:bg-[#101828] dark:text-white border border-gray-200 p-8 rounded-lg shadow-xl'>
                    <div className='flex items-center gap-[140px] mb-6'>
                        <AiOutlineArrowLeft onClick={() => navigate('/verify-Code')} className='w-8 h-8 text-orange-500 cursor-pointer' />
                        <p className='text-2xl font-medium text-center'>Nhập mật khẩu mới</p>
                    </div>
                    <div className='space-y-6'>
                        <div className='relative mt-3'>
                            <label className='flex flex-col mb-2 text-gray-500 dark:text-white'>Mật khẩu mới</label>
                            <input
                                type={isShowPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='p-3 dark:text-[#101828] w-full max-w-[600px] h-auto mx-auto border border-gray-400 rounded-lg'
                                placeholder='Mật khẩu mới...'
                            />
                            <div className='absolute top-[48px] right-[20px] cursor-pointer'>
                                {isShowPassword ? (
                                    <PiEye className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowPassword(false)} />
                                ) : (
                                    <PiEyeSlash className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowPassword(true)} />
                                )}
                            </div>
                        </div>

                        <div className='relative mt-3'>
                            <label className='flex flex-col mb-2 text-gray-500 dark:text-white'>Xác nhận mật khẩu</label>
                            <input
                                type={isShowConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='p-3 dark:text-[#101828] w-full max-w-[600px] h-auto mx-auto border border-gray-400 rounded-lg'
                                placeholder='Nhập lại mật khẩu mới...'
                            />
                            <div className='absolute top-[48px] right-[20px] cursor-pointer'>
                                {isShowConfirmPassword ? (
                                    <PiEye className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowConfirmPassword(false)} />
                                ) : (
                                    <PiEyeSlash className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowConfirmPassword(true)} />
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className='w-full p-3 mt-3 text-white bg-orange-500 rounded-lg'
                        >
                            Xác nhận thay đổi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
