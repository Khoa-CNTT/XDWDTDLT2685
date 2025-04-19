import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileImg = ({ avatar }) => {
    const handleBeforeUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("images", file);
        console.log("Hình vừa chọn:", file);
    };

    return (
        <div>
            <div className='w-full h-[400px] bg-white shadow-md dark:bg-[#101828] dark:border dark:border-white dark:text-white'>
                <h1 className='px-4 py-6 text-lg font-semibold bg-gray-100 dark:text-[#101828]'>Ảnh đại diện</h1>
                <div className='mt-2 space-y-3 text-center'>
                    <p className='text-center'>Ảnh đại diện</p>

                    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden bg-gray-200 rounded-full">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                                No Avatar
                            </div>
                        )}
                    </div>

                    <p className="text-gray-500">JPG hoặc PNG không lớn hơn 5 MB</p>
                    <button className="px-4 py-2 text-white bg-orange-400 rounded-md cursor-pointer"
                        onClick={() => document.getElementById("image-upload").click()}>
                        Tải ảnh lên
                        <input onChange={handleBeforeUpload} type="file" className="hidden mt-3" id="image-upload" accept="image/*" />
                    </button>

                    <div className="px-4 py-2 mt-auto mb-2 bg-orange-500 cursor-pointer">
                        <NavLink to="/changepassword" className='text-lg text-white'>
                            Đổi mật khẩu
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileImg;
