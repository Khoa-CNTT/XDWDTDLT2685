import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ProfileImg = () => {
    const [image, setImage] = useState()
    const handleBeforeUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("images", file);
        console.log("222", formData)
        // setIsLoading(true);
        // try {
        //     const response = await fetch("http://localhost:8080/upload", {
        //         method: "POST",
        //         body: formData,
        //     });
        //     const data = await response.json();
        //     setImageUrl((prevUrls) => {
        //         const newImageUrls = [...prevUrls, data];
        //         // Gọi onFieldChange sau khi imageUrl thay đổi
        //         onFieldChange(newImageUrls);
        //         return newImageUrls;
        //     });
        // } catch (error) {
        //     console.error("Tải ảnh không thành công", error);
        // }
        // setIsLoading(false);
    }
    return (
        <div>
            <div className='w-full h-[400px] bg-white shadow-md dark:bg-[#101828] dark:border dark:border-white dark:text-white '>
                <h1 className='px-4 py-6 text-lg font-semibold bg-gray-100 dark:text-[#101828]'>Ảnh đại diện</h1>
                <div className='mt-2 space-y-3 text-center '>
                    <p className='text-center'>Ảnh đại diện</p>
                    <div class="h-32 w-32 bg-gray-200 mx-auto mb-4 rounded-full"></div>
                    <p class="text-gray-500">JPG hoặc PNG không lớn hơn 5 MB</p>
                    <button className="px-4 py-2 text-white bg-orange-400 rounded-md cursor-pointer"
                        onClick={() =>
                            document
                                .getElementById("image-upload")
                                .click()
                        }>
                        Tải ảnh lên
                        <input onChange={handleBeforeUpload} type="file" className="hidden mt-3" id="image-upload" accept="image/*" />
                    </button>
                    <div  className="px-4 py-2 mt-auto mb-2 bg-orange-500 cursor-pointer">
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