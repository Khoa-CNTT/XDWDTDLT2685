import React from 'react';
import Logo2 from '../../assets/Travel/Logo1.png'
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <div className='flex pt-20 dark:bg-[#101828] dark:text-white'>
                <div className='gap-3 grid h-auto md:grid-cols-3 w-full lg:grid-cols-4 bg-[#101828] dark:border dark:border-white'>
                    <div className='px-4 py-8 ml-5  text-white w-full max-w-[400px]'>
                        <h1 className="flex items-center gap-3 text-xl font-bold text-justify text-white sm:text-3xl sm:text-left">
                            <img src={Logo2} alt="GoViet" className="h-[100px] object-cover w-[200px]" />
                        </h1>
                        <div className='mt-5 space-y-5 text-base text-left'>
                            <p className='mt-3 '>Công ty TNHH Du Lịch và Dịch Vụ GoViet</p>
                            <p className=''>Kiệt 374/12 Núi Thành, Quận Hải Châu, Thành Phố Đà Nẵng</p>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="w-4 h-4" />
                                <p>Hotline: 0362137238</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <MdEmail className="w-4 h-4" />
                                <p>Email: info@GoViet.com</p>
                            </div>
                            {/* social */}
                            <div className="flex items-center gap-3 mt-6 cursor-pointer">
                                <a href="#">
                                    <FaInstagram className="text-3xl" />
                                </a>
                                <a href="https://www.facebook.com/share/153am77Q8f/?mibextid=wwXIfr">
                                    <FaFacebook className="text-3xl" />
                                </a>
                                <a href="#">
                                    <FaLinkedin className="text-3xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-2 gap-x-[300px]  md:pl-20">
                        <div className=' px-4 py-8 text-white cursor-pointer w-[300px]'>
                            <h1 className='mb-3 text-xl font-bold text-justify sm:text-left'>Giới Thiệu</h1>
                            <div className='space-y-5 text-left'>
                                <p>Về chúng tôi</p>
                                <p>Điều khoản và điều kiện</p>
                                <p>Chính sách riêng tư</p>
                                <p>Chính sách bảo mật</p>
                                <p>Hình thức thanh toán</p>
                            </div>
                        </div>
                        <div className='px-4 py-8 text-white cursor-pointer w-[300px]'>
                            <h1 className='mb-3 text-xl font-bold text-justify sm:text-left'>Thông Tin Du Lịch</h1>
                            <div className='space-y-5 text-left'>
                                <p>Cẩm nang du lịch</p>
                                <p>Kinh nghiệm du lịch</p>
                                <p>Tin tức</p>
                                <p>Tour du lịch</p>
                            </div>
                        </div>
                        <div className='px-4 py-8 text-white cursor-pointer w-[300px]'>
                            <h1 className='mb-3 text-xl font-bold text-justify sm:text-left'>Điểm Đến</h1>
                            <div className='space-y-5 text-left'>
                                <p>Vịnh Hạ Long</p>
                                <p>Đảo Cát Bà</p>
                                <p>Vịnh Lan Hạ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='' />
            <div className="py-5 text-center text-white bg-[#101828]">
                @copyright 2025 All rights reserved || Made with ❤️ by GoViet
            </div>
        </>
    );
};
export default Footer;