import React, { useState } from 'react';
import img1 from '../../assets/Travel/ContactImg1.jpg'
import img2 from '../../assets/Travel/ContactImg2.jpg'
import img3 from '../../assets/Travel/ContactImg3.jpg'
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from 'react-router-dom';

const ContactInfo = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [description, setDescription] = useState('');
    return (
        <div className='pt-20 '>
            <div className='container'>
                {/* bên trái */}
                <div className='flex gap-10'>
                    <div className='w-1/2 h-full px-6 py-2 shadow-md bg-gray-50 dark:bg-[#101828] dark:text-white dark:border dark:border-white rounded-xl'>
                        <div data-aos="fade-left">
                            <div className='space-y-2'>
                                <h1 className='text-3xl font-semibold'>Liên Hệ</h1>
                                <p className='text-gray-500'>
                                    Địa chỉ email của bạn sẽ không được công bố. Các trưởng bắt buộc được đánh dấu <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <form className='items-center mt-3'>
                                <div className='flex gap-4'>
                                    <div className='mt-3'>
                                        <div className='flex gap-2'>
                                            <label className='flex flex-col mb-2 font-semibold '>Họ và tên</label>
                                            <span className='text-red-500'>*</span>
                                        </div>
                                        <input type='name' name="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className='h-auto p-3  border border-gray-400 rounded-lg w-[250px]'
                                            placeholder='Tên của bạn...'
                                        />
                                    </div>

                                    <div className='mt-3'>
                                        <div className='flex gap-2'>
                                            <label className='flex flex-col mb-2 font-semibold '>Số điện thoại</label>
                                            <span className='text-red-500'>*</span>
                                        </div>
                                        <input
                                            type="tel"
                                            pattern="[0-9]{10,11}"
                                            value={sdt}
                                            onChange={(e) => setSdt(e.target.value)}
                                            className='h-auto w-[250px] p-3  border border-gray-400 rounded-lg'
                                            placeholder='số điện thoại...'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <div className='flex gap-2'>
                                        <label className='flex flex-col mb-2 font-semibold '>Địa chỉ Email</label>
                                        <span className='text-red-500'>*</span>
                                    </div>
                                    <input type='email' name="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full p-3 border border-gray-400 rounded-lg'
                                        placeholder='Nhập email...'
                                    />
                                </div>
                                <div className='mt-3'>
                                    <div className='flex gap-2'>
                                        <label className='flex flex-col mb-2 font-semibold '>Nội dung</label>
                                        <span className='text-red-500'>*</span>
                                    </div>
                                    <textarea type='textarea' name="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className='w-full p-3 border border-gray-400 rounded-lg h-[150px]'
                                        placeholder='Nội dung...'
                                    />
                                </div>
                                <div className="p-2 border text-center mt-3 text-white mb-2 border-gray-200 w-[100px] bg-primary  rounded-full ">
                                    <button type='submit' className="font-semibold">Gửi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div data-aos="fade-right" className='mx-auto space-y-4'>
                        <img src={img1} className='object-cover w-[600px] rounded-xl h-[250px]' alt="" />
                        <div className='flex gap-6'>
                            <img src={img2} className='w-[250px] h-[300px] object-cover rounded-xl' alt="" />
                            <img src={img3} className='w-[250px] h-[300px] object-cover rounded-xl' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;