import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { putChangeInformation, putProfileImg } from '../../services/profile';
import { FaSyncAlt } from 'react-icons/fa';

const ProfileInformation = ({ profile, selectedFile }) => {
    const [user_name, setUserName] = useState('');
    const [full_name, setFull_name] = useState('');

    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false)


    // Gán dữ liệu profile vào state khi profile thay đổi
    useEffect(() => {
        if (profile) {
            setUserName(profile.user_name || '');
            setPhoneNumber(profile.phone_number || '');
            setEmail(profile.email || '');
            setAddress(profile.address || '');
        }
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');
        const data = {
            user_name,
            phone_number,
            email,
            address,
        };


        const noInfoChanged =
            (user_name === (profile?.user_name || '')) &&
            (full_name === (profile?.full_name || '')) &&
            (phone_number === (profile?.phone_number || '')) &&
            (email === (profile?.email || '')) &&
            (address === (profile?.address || '')) &&
            !selectedFile;

        if (noInfoChanged) {
            toast.warning('Không có thay đổi nào!');
            return;
        }
        const phoneChanged = phone_number !== (profile?.phone_number || '');
        const isValidPhone = /^[0-9]{10}$/.test(phone_number) && !/^(\d)\1{9}$/.test(phone_number);
        if (phoneChanged && !isValidPhone) {
            toast.error('Số điện thoại không hợp lệ!');
            return;
        }

        try {
            setLoading(true)
            const res = await putChangeInformation(userId, data);
            if (selectedFile) {
                const formData = new FormData();
                formData.append("avatar", selectedFile);
                await putProfileImg(userId, formData);
            }
            if (res.status === 200) {
                setTimeout(() => {
                    toast.success('Cập nhật thông tin thành công!');
                    setLoading(false)
                }, 1000);
            }
        } catch (error) {
            toast.error('Cập nhật không thành công');

        }
    };


    return (
        <div>
            <div className='w-full h-[550px] dark:bg-[#101828] rounded-md dark:text-white dark:border dark:border-white bg-white shadow-md'>
                <h1 className='px-4 py-6 text-lg font-semibold bg-gray-100 dark:text-[#101828]'>Thông tin tài khoản</h1>
                <form onSubmit={handleSubmit} className='items-center mt-3'>
                    <div className='flex flex-col px-6 space-y-5'>
                        {/* tên tài khoản */}
                        <div>
                            <div className='flex items-center gap-3 mb-2'>
                                <label className='font-semibold'>Tên tài khoản</label>
                                <p className='text-red-500 '>*Không thể thay đổi</p>
                            </div>
                            <input
                                type='text'
                                value={user_name}
                                disabled
                                onChange={(e) => setUserName(e.target.value)}
                                className='w-[700px] dark:text-[#101828] h-auto p-3 border border-gray-400 rounded-lg'
                            />
                        </div>

                        <div>
                            <div className='flex items-center gap-2 mb-2'>
                                <label className='font-semibold'>Email</label>
                                <p className='text-red-500 '>*Không thể thay đổi</p>
                            </div>

                            <input
                                type='email'
                                value={email}
                                disabled
                                onChange={(e) => setEmail(e.target.value)}

                                className='w-[700px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                            />
                        </div>
                        <div className='flex items-center gap-10'>
                            <div>
                                <label className='flex flex-col mb-2 font-semibold'>Họ và tên</label>
                                <input
                                    type='text'
                                    value={full_name}
                                    onChange={(e) => setFull_name(e.target.value)}
                                    className='w-[330px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                    placeholder='Họ và tên của bạn...'
                                />
                            </div>
                            <div>
                                <label className='flex flex-col mb-2 font-semibold'>Số điện thoại</label>
                                <input
                                    type='number'
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className='h-auto w-[330px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                    placeholder='Số điện thoại...'
                                />
                            </div>
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
                            <button type='submit' className='font-semibold'>
                                {loading ? (
                                    <>
                                        <FaSyncAlt className='w-5 h-5 text-white animate-spin' />
                                    </>
                                ) : (
                                    "Lưu Thông Tin"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileInformation;
