import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { putChangePasswordId } from '../../services/profile';

const ProfileInformation = () => {
    const [user_name, setUserName] = useState('');
    const [sdt, setSdt] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');

        try {
            const res = await putChangePasswordId(userId, {
                user_name: user_name,
                phone_number: sdt,
                email: email,
                address: address
            });
            console.log("thành công", res)
            toast.success('Cập nhật thông tin thành công!');
        } catch (error) {
            toast.error('Cập nhật thất bại!');
            console.error(error);
        }
    };

    return (
        <div>
            <div className='w-full h-[550px] dark:bg-[#101828] rounded-md dark:text-white dark:border dark:border-white bg-white shadow-md'>
                <h1 className='px-4 py-6 text-lg font-semibold bg-gray-100 dark:text-[#101828]'>Thông tin tài khoản</h1>
                <form onSubmit={handleSubmit} className='items-center mt-3'>
                    <div className='flex flex-col px-6 space-y-5'>
                        <div>
                            <label className='flex flex-col mb-2 font-semibold'>Họ và tên</label>
                            <input
                                type='text'
                                value={user_name}
                                onChange={(e) => setUserName(e.target.value)}
                                className='w-[700px] dark:text-[#101828] h-auto p-3 border border-gray-400 rounded-lg'
                                placeholder='Tên của bạn...'
                            />
                        </div>

                        <div>
                            <label className='flex flex-col mb-2 font-semibold'>Số điện thoại</label>
                            <input
                                type='tel'
                                value={sdt}
                                onChange={(e) => setSdt(e.target.value)}
                                className='h-auto w-[700px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Số điện thoại...'
                            />
                        </div>

                        <div>
                            <label className='flex flex-col mb-2 font-semibold'>Email</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-[700px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Nhập email...'
                            />
                        </div>

                        <div>
                            <label className='flex flex-col mb-2 font-semibold'>Địa chỉ</label>
                            <input
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className='w-[700px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Địa chỉ của bạn...'
                            />
                        </div>

                        <div className='p-2 cursor-pointer border text-center text-white border-gray-200 w-[200px] bg-primary rounded-lg'>
                            <button type='submit' className='font-semibold'>Lưu thông tin</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileInformation;
