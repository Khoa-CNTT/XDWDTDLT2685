import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const ResponsiveMenu = ({ setShowMenu, showMenu }) => {
    const navbarLinks = [
        {
            name: "Trang Chủ",
            link: "/"
        },
        {
            name: "Blogs",
            link: "/blogs"
        },
        {
            name: "Những Địa Điểm Nổi Tiếng",
            link: "/places"
        },
        {
            name: "Doanh Nghiệp",
            link: "/about"
        },
    ]
    return (
        <div className={`${showMenu ? "left-0" : "-left-[100%]"} 
        fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900
        dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}>
            <div className='Navbar_card'>
                {/* Top section */}
                <div>
                    <div className='flex items-center justify-start gap-4'>
                        <FaUserCircle size={50} className='text-gray-500' />
                        <div className='text-gray-500 '>
                            <h1>Xin Chào</h1>
                            <h1 className='text-base text-slate-500'>Thành Viên Bạc</h1>
                        </div>
                    </div>
                    <div className='mt-12 text-left text-black'>
                        <ul className='space-y-4 text-2xl font-normal'>
                            {navbarLinks.map(({ name, link }) => (
                                <li key={name}>
                                    <Link
                                        to={link}
                                        className='inline-block mb-5'
                                        onClick={() => setShowMenu(false)}>{name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveMenu;