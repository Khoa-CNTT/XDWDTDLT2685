import React from 'react';

const PaymentInformation = ({ full_name, setFullName, email, setEmail, phone_number, setPhoneNumber, address, setAddress }) => {
    // const Validation = (full_name, email, aaddress,phone_number) => {
    //         const newErrors = {};
    //         if (!full_name) {
    //             toast.warning('Vui lòng nhập tên của bạn');
    //             newErrors.full_name = "Vui lòng nhập tên của bạn";
    //         }
    //         if (!email) {
    //             toast.warning('Vui lòng nhập email');
    //             newErrors.email = "Vui lòng nhập email";
    //         } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
    //             toast.warning('Email không hợp lệ!');
    //             newErrors.email = "Email không hợp lệ";
    //         }
    
    //         if (!phone_number) {
    //             toast.warning('Vui lòng nhập số điện thoại');
    //             newErrors.phone_number = "Vui lòng nhập số điện thoại";
    //         } else if (phone_number.length !== 10) {
    //             toast.warning('Số điện thoại phải đủ 10 số');
    //             newErrors.phone_number = "Số điện thoại phải đủ 10 số";
    //         }
    //         if (!address) {
    //             toast.warning('Vui lòng nhập địa chỉ');
    //             newErrors.address = "Vui lòng nhập địa chỉ";
    //         }
    //         return newErrors;
    //     };
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
                                    className='h-auto p-3  border border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Tên của bạn...'
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
                                    className=' p-3 border border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Nhập email liên hệ...'
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
                                    className='h-auto p-3  border border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Nhập số điện thoại liên hệ...'
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
                                    className=' p-3 border border-gray-400 rounded-lg w-[300px]'
                                    placeholder='Nhập địa chỉ liên hệ...'
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