import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ProfileImg = ({ avatar, setSelectedFile }) => {
    const [preview, setPreview] = useState(null);

    const handleBeforeUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file); // truyền file lên cha
        setPreview(URL.createObjectURL(file)); // hiển thị trước
    };

    useEffect(() => {
        return () => {
            // cleanup URL khi component unmount
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className='w-full h-[400px] bg-white shadow-md dark:bg-[#101828] dark:border dark:border-white dark:text-white'>
            <h1 className='px-4 py-6 text-lg font-semibold bg-gray-100 dark:text-[#101828]'>Ảnh đại diện</h1>
            <div className='mt-2 space-y-3 text-center'>
                <p className='text-center'>Ảnh đại diện</p>
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden bg-gray-200 rounded-full ">
                    {preview ? (
                        <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                    ) : avatar ? (
                        <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-500">
                            No Avatar
                        </div>
                    )}
                </div>
                <p className="text-gray-500">JPG hoặc PNG không lớn hơn 10 MB</p>
                <button
                    className="px-4 py-2 text-white bg-orange-400 rounded-md cursor-pointer"
                    onClick={() => document.getElementById("image-upload").click()}
                >
                    Tải ảnh lên
                    <input
                        onChange={handleBeforeUpload}
                        type="file"
                        className="hidden mt-3"
                        id="image-upload"
                        accept="image/*"
                    />
                </button>
                <div className="px-4 py-2 mt-auto mb-2 bg-orange-500 cursor-pointer">
                    <NavLink to="/changepassword" className='text-lg text-white'>
                        Đổi mật khẩu
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProfileImg;
