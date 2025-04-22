import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { putChangeInformation } from '../../services/profile';

const ProfileChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = Validation(oldPassword, newPassword, passwordConfirm);

        if (Object.keys(newErrors).length === 0) {
            const userId = localStorage.getItem('user_id');
            const data = {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: passwordConfirm,
            };
            // console.log(data)
            try {
                const res = await putChangeInformation(userId, data);
                console.log("RESPONSE FULL: mk", res);
                if (res.status === 200) {
                    toast.success('Đổi mật khẩu thành công!');
                    setOldPassword('');
                    setNewPassword('');
                    setPasswordConfirm('');
                    navigate("/profile")
                }
            } catch (error) {
                toast.warning('Mật khẩu cũ không đúng');
            }
        }
    };
    const Validation = (oldPassword, newPassword, passwordConfirm) => {
        const newErrors = {};
        if (!oldPassword) {
            toast.warning('Vui lòng nhập mật khẩu cũ');
            newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ";
        } else if (oldPassword.length < 6) {
            toast.warning('Mật khẩu ít nhất có 6 ký tự');
            newErrors.oldPassword = "Mật khẩu ít nhất có 6 ký tự";
        }
        if (!newPassword) {
            toast.warning('Vui lòng nhập mật khẩu mới');
            newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
        } else if (newPassword.length < 6) {
            toast.warning('Mật khẩu ít nhất có 6 ký tự');
            newErrors.newPassword = "Mật khẩu ít nhất có 6 ký tự";
        }
        if (!passwordConfirm) {
            toast.warning("Vui lòng nhập lại mật khẩu mới");
            newErrors.passwordConfirm = "Vui lòng nhập lại mật khẩu mới";
        } else if (passwordConfirm !== newPassword) {
            toast.warning("Mật khẩu mới không khớp");
            newErrors.passwordConfirm = "Mật khẩu mới không khớp";
        }
        return newErrors;
    };
    return (
        <div className='pt-[150px]'>
            <div className='container'>
                <div className='w-[800px] mx-auto h-[450px] dark:bg-[#101828] rounded-md dark:text-white dark:border dark:border-white bg-white shadow-md'>
                    <h1 className='px-2 py-6 text-2xl flex justify-center font-semibold bg-gray-100 dark:text-[#101828]'>Thay đổi mật khẩu</h1>
                    <form className='flex flex-col items-center justify-center mt-5 space-y-8'>
                        <div className='flex items-center gap-4'>
                            <label className='w-[200px] text-left font-semibold text-lg'>Mật khẩu cũ:</label>
                            <input
                                type='password'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className='w-[400px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Nhập mật khẩu cũ...'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='w-[200px] text-left font-semibold text-lg'>Mật khẩu mới:</label>
                            <input
                                type='password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='w-[400px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Nhập mật khẩu mới...'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='w-[200px] text-left font-semibold text-lg'>Nhập lại mật khẩu mới:</label>
                            <input
                                type='password'
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className='w-[400px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Xác nhận lại mật khẩu...'
                            />
                        </div>
                        <div className='flex items-center gap-5 ml-[80px]'>
                            <div className="flex items-center gap-2 px-4 py-2 text-white border border-gray-200 rounded-lg cursor-pointer bg-primary">
                                <FaCheck className="text-lg text-white" />
                                <button onClick={handleSubmit} type='submit' className="font-semibold">Xác nhận</button>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 border border-gray-200 rounded-lg cursor-pointer">
                                <FaTimes className="text-lg text-white" />
                                <button onClick={() => navigate("/profile")} type='button' className="font-semibold">Hủy bỏ</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default ProfileChangePassword;
