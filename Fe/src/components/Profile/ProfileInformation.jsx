import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { putChangeInformation, putProfileImg } from '../../services/profile';

const ProfileInformation = ({ profile, selectedFile }) => {
    const [user_name, setUserName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

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
        // Kiểm tra nếu không có gì thay đổi
        const noInfoChanged =
            (user_name === (profile?.user_name || '')) &&
            (phone_number === (profile?.phone_number || '')) &&
            (email === (profile?.email || '')) &&
            (address === (profile?.address || '')) &&
            !selectedFile;

        if (noInfoChanged) {
            toast.warning('Không có thay đổi nào!');
            return;
        }
        try {
            const res = await putChangeInformation(userId, data);
            console.log("RESPONSE FULL: thongtin", res.data);

            // Nếu có file ảnh được chọn thì upload ảnh
            if (selectedFile) {
                const formData = new FormData();
                formData.append("avatar", selectedFile);
                await putProfileImg(userId, formData);
            }
            if (res.status === 200) {
                toast.success('Cập nhật thông tin thành công!');
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
                                placeholder='Tên của bạn...'
                            />
                        </div>

                        <div>
                            <label className='flex flex-col mb-2 font-semibold'>Số điện thoại</label>
                            <input
                                type='tel'
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className='h-auto w-[700px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Số điện thoại...'
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
