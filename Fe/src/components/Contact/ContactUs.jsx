import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { RiMessengerLine } from "react-icons/ri";

const ImgUs = [
    "https://mighty.tools/mockmind-api/content/human/112.jpg",
    "https://mighty.tools/mockmind-api/content/human/128.jpg",
    "https://mighty.tools/mockmind-api/content/human/80.jpg",
    "https://mighty.tools/mockmind-api/content/human/125.jpg",
    "https://mighty.tools/mockmind-api/content/human/104.jpg",
    "https://mighty.tools/mockmind-api/content/human/124.jpg",
    "https://mighty.tools/mockmind-api/content/human/79.jpg"
]
const ContactUs = () => {
    return (
        <div className='pt-10 bg-gray-50 dark:bg-[#101828] dark:text-white'>
            <div className='container flex items-center gap-10 mt-10 '>
                <div data-aos="fade-left" className='w-1/3 mb-2 space-y-5'>
                    <h1 className='max-w-[360px] font-semibold text-3xl'>
                        Hãy Nói Chuyện Với Các Hướng Dẫn Viên Du Lịch Chuyên
                        Nghiệp Của Chúng Tôi
                    </h1>
                    <p className='text-gray-500 max-w-[400px]'>
                        Đội ngũ hỗ trợ tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn giải đáp mọi thắc mắc hoặc vấn đề,
                        cung cấp các giải pháp nhanh chóng và được cá nhân hóa để đáp ứng nhu cầu của bạn.
                    </p>
                    <div className='w-[300px] mx-auto p-3 text-center bg-white border border-gray-300 rounded-lg'>
                        <div className='space-y-3'>
                            <p className='font-semibold dark:text-[#101828]'>85+ Thành viên nhóm chuyên gia</p>
                            <hr className='border-gray-400' />
                            <div className='flex p-4'>
                                {ImgUs.map((img, index) => (
                                    <div key={index} className='-ml-2 first:ml-0' >
                                        <img src={img} alt="" className='w-12 h-8 border border-gray-300 rounded-full ' />
                                    </div>
                                ))}
                                <div className="w-10 h-8 -ml-2 border border-gray-300 rounded-full bg-primary ">
                                    <p className='text-xl font-bold text-center text-white '>+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-5 dark:text-[#101828]'>
                    <div data-aos="fade-up" >
                        {/* Email */}
                        <div className='flex items-center gap-10 '>
                            <div className='w-[300px] h-[200px] bg-gray-100 border border-gray-300 rounded-xl flex flex-col items-start px-6 py-4'>
                                <div className='flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full'>
                                    <MdEmail className='w-6 h-6 text-primary' />
                                </div>
                                <p className='mt-3 text-xl font-semibold'>Cần trợ giúp và hỗ trợ</p>
                                <div className='flex items-center gap-2 mt-2'>
                                    <CiMail className='w-5 h-5' />
                                    <p>phanthanh1023@gmail.com</p>
                                </div>
                            </div>
                            {/* phone */}
                            <div className='w-[300px] h-[200px] bg-gray-100 border border-gray-300 rounded-xl flex flex-col items-start px-6 py-4'>
                                <div className='flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full'>
                                    <FaPhone className='w-6 h-6 text-primary' />
                                </div>
                                <p className='mt-3 text-xl font-semibold'>Hãy liên hệ chúng tôi</p>
                                <div className='flex items-center gap-2 mt-2'>
                                    <FiPhone className='w-5 h-5' />
                                    <p>+000 (123) 4588</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        {/* Location */}
                        <div className='flex items-center gap-10'>
                            <div className='w-[300px] h-[200px] bg-gray-100 border border-gray-300 rounded-xl flex flex-col items-start px-6 py-4'>
                                <div className='flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full'>
                                    <FaLocationDot className='w-6 h-6 text-primary' />
                                </div>
                                <p className='mt-3 text-xl font-semibold'>Cần trợ giúp và hỗ trợ</p>
                                <div className='flex items-center gap-2 mt-2'>
                                    <CiLocationOn className='w-5 h-5' />
                                    <p>Núi Thành Hải Châu Đà Nẵng</p>
                                </div>
                            </div>
                            {/* messs*/}
                            <div className='w-[300px] h-[200px] bg-gray-100 border border-gray-300 rounded-xl flex flex-col items-start px-6 py-4'>
                                <div className='flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full'>
                                    <FaFacebookMessenger className='w-6 h-6 text-primary' />
                                </div>
                                <p className='mt-3 text-xl font-semibold'>Cần trợ giúp và hỗ trợ</p>
                                <div className='flex items-center gap-2 mt-2'>
                                    <RiMessengerLine className='w-5 h-5' />
                                    <p>Hổ trợ tư vấn khách hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ContactUs;