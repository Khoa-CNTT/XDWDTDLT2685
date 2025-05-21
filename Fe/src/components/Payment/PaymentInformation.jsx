import React from 'react';

const PaymentInformation = ({ full_name, setFullName, email, setEmail, phone_number, setPhoneNumber, address, setAddress,disabled = false }) => {
    
    return (
        <div className='pt-10 '>
            <div className=''>
                <h1 className='text-2xl font-semibold'>Thông tin liên lạc</h1>
                <div className='w-full h-[270px] mt-5 bg-gray-100 rounded-lg dark:bg-[#101828] dark:border dark:border-white dark:text-white'>
                    <form className='items-center p-5 mt-3 space-y-4 '>
                        <div className='flex justify-between '>
                            {/* Họ và tên */}
                            <div className='mt-3'>
                                <div className='flex gap-2'>
                                    <label className='flex flex-col mb-2 font-semibold '>Họ và tên</label>
                                    <span className='text-red-500'>*</span>
                                </div>
                                <input type='full_name' name="text"
                                    value={full_name}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className='h-auto p-3  border dark:text-black border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Tên của bạn...'
                                    disabled={disabled}

                                />
                            </div>
                            {/* email */}
                            <div className='mt-3'>
                                <div className='flex gap-2'>
                                    <label className='flex flex-col mb-2 font-semibold '>Địa chỉ Email</label>
                                    <span className='text-red-500'>*</span>
                                </div>
                                <input type='email' name="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className=' p-3 border dark:text-black border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Nhập email liên hệ...'
                                    disabled={disabled}

                                />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            {/* sdt*/}
                            <div className='mt-3'>
                                <div className='flex gap-2'>
                                    <label className='flex flex-col mb-2 font-semibold '>Số điện thoại</label>
                                    <span className='text-red-500'>*</span>
                                </div>
                                <input type='number' name="text"
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className='h-auto p-3  border dark:text-black border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Nhập số điện thoại liên hệ...'
                                    disabled={disabled}

                                />
                            </div>
                            {/* address */}
                            <div className='mt-3'>
                                <div className='flex gap-2'>
                                    <label className='flex flex-col mb-2 font-semibold '>Địa chỉ</label>
                                    <span className='text-red-500'>*</span>
                                </div>
                                <input type='address' name="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className=' p-3 border dark:text-black border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Nhập địa chỉ liên hệ...'
                                    disabled={disabled}

                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentInformation;