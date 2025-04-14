import React from 'react';
import Logo2 from '../../assets/Travel/logo2.webp'
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <div className='flex pt-20 dark:bg-[#101828] dark:text-white'>
                <div className='gap-3 grid h-[400px] md:grid-cols-3 w-full lg:grid-cols-4 bg-[#101828] dark:border dark:border-white'>
                    <div className='px-4 py-8 ml-5  text-white w-[350px]'>
                        <h1 className="flex items-center gap-3 text-xl font-bold text-justify text-white sm:text-3xl sm:text-left">
                            <img src={Logo2} alt="" className="max-h-[60px]" />
                        </h1>
                        <div className='mt-5 space-y-5 text-base text-left'>
                            <p className='mt-3 '>Công ty TNHH Du Lịch và Dịch Vụ Mixivivu</p>
                            <p className=''>Tầng 7, số nhà 25, ngõ 38 phố Yên Lãng, phường Láng Hạ, quận Đống Đa, TP. Hà Nội</p>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="w-4 h-4" />
                                <p>Hotline: 0922222016</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <MdEmail className="w-4 h-4" />
                                <p>Email: info@mixivivu.com</p>
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
                    <div className="grid grid-cols-2 col-span-2 gap-x-[300px] sm:grid-cols-3 md:pl-20">
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
                @copyright 2025 All rights reserved || Made with ❤️ by Mixivivu
            </div>
        </>
    );
};

export default Footer;