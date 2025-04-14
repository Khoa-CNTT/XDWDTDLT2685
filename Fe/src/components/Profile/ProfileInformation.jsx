import React, { useState } from 'react';

const ProfileInformation = () => {
    const [name, setName] = useState('');
    const [sdt, setSdt] = useState('');
    const [email, setEmail] = useState('');
    return (
        <div>
            <div className='w-full h-[480px] dark:bg-[#101828] rounded-md dark:text-white dark:border dark:border-white bg-white shadow-md '>
                <h1 className='px-4 py-6 text-lg font-semibold bg-gray-100 dark:text-[#101828]'>Thông tin tài khoản</h1>
                <form className='items-center mt-3'>
                    <div className='flex flex-col px-6 space-y-5 '>
                        <div>
                            <label className='flex flex-col mb-2 font-semibold '>Họ và tên</label>
                            <input type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-[700px] dark:text-[#101828] h-auto p-3 border border-gray-400 rounded-lg'
                                placeholder='Tên của bạn...'
                            />
                        </div>

                        <div >
                            <label className='flex flex-col mb-2 font-semibold '>Số điện thoại</label>
                            <input type="tel"
                                pattern="[0-9]{10,11}"
                                value={sdt}
                                onChange={(e) => setSdt(e.target.value)}
                                className='h-auto w-[700px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Số điện thoại...'
                                required
                            />
                        </div>

                        <div >
                            <label className='flex flex-col mb-2 font-semibold '>Địa chỉ Email</label>
                            <input type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-[700px] dark:text-[#101828] p-3 border border-gray-400 rounded-lg'
                                placeholder='Nhập email...'
                            />
                        </div>
                        <div className="p-2 cursor-pointer border text-center  text-white  border-gray-200 w-[200px] bg-primary rounded-lg">
                            <button type='submit' className="font-semibold ">Lưu thông tin</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ProfileInformation;
