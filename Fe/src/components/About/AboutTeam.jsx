import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const teamMembers = [
    {
        name: "Nguyễn Trà Giang",
        role: "Founder",
        image: "https://mighty.tools/mockmind-api/content/human/125.jpg"
    },
    {
        name: "Phan Văn Thanh",
        role: "Founder",
        image: "https://mighty.tools/mockmind-api/content/human/80.jpg"
    },
    {
        name: "Trần Kiều My",
        role: "Tour guide",
        image: "https://mighty.tools/mockmind-api/content/human/108.jpg"
    },
    {
        name: "Lê Minh Tuấn",
        role: "Tour guide",
        image: "https://mighty.tools/mockmind-api/content/human/98.jpg"
    },
    {
        name: "Đỗ Hồng Nhung",
        role: "Tour guide",
        image: "https://mighty.tools/mockmind-api/content/human/87.jpg"
    },
    {
        name: "Bùi Văn Nam",
        role: "Tour guide",
        image: "https://mighty.tools/mockmind-api/content/human/112.jpg"
    }
];

const AboutTeam = () => {
    return (
        <div className='pt-20'>
            <div className='container'>
                <div className='flex flex-col items-center space-y-5'>
                    <h1 className='text-3xl'>Những Hướng Dẫn Viên Du Lịch Giàu Kinh Nghiệm Của Chúng Tôi</h1>
                    <p className='text-gray-500'>
                        Website <span className='px-1 text-center text-white rounded-full bg-primary'>34500+</span> trãi nghiệm phổ biến nhất bạn sẽ nhớ
                    </p>
                </div>
                <div className="grid items-center justify-center grid-cols-1 gap-5 mt-10 md:grid-cols-3 sm:grid-cols-2">
                    {teamMembers.map((member, index) => (
                        <div key={index} className='relative'>
                            <div className='p-2'>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-[300px] h-[290px] rounded-xl"
                                />
                            </div>
                            <div
                                data-aos="fade-up"
                                className='space-y-1 text-center absolute right-[70px] top-[190px] bg-white rounded-xl h-[100px] w-[260px] border shadow-md'
                            >
                                <h1 className='mt-2 font-semibold dark:text-[#101828]'>{member.name}</h1>
                                <p className='text-gray-400'>{member.role}</p>
                                <div className='flex justify-center space-x-3 text-center text-orange-500 cursor-pointer'>
                                    <FaFacebook className="text-2xl" />
                                    <FaTwitter className="text-2xl" />
                                    <FaInstagram className="text-2xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutTeam;
