import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../../assets/Travel/Logo.png";
import { FaCaretDown, FaPhoneAlt } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "../Navbar/ResponsiveMenu";

import "flowbite";
import { FaUserAlt } from "react-icons/fa";
import useDarkMode from "../../hooks/useDarkMode";


const DropdownLinks = [
    {
        name: "Tour",
        link: "/tour",
    },
    {
        name: "Hướng Dẫn Viên",
        link: "/tourguide",
    },

];
const UserLinks = [
    {
        name: "Thông tin cá nhân",
        link: "/profile"
    },
    {
        name: "Tour đã đặt",
        link: "/tourbooking"
    },
    {
        name: "Đăng xuất",
        link: ""
    }
]
const Navbar = () => {
    const [isDarkMode, toggleDarkMode] = useDarkMode()
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <>
            <div className="fixed top-0 right-0 w-full text-black bg-white shadow-md dark:bg-gray-900 dark:text-white z-[999]">
                <div className="hidden text-white bg-gradient-to-r from-primary to-secondary sm:block">
                    <div className="container py-[2px] flex items-center justify-between">
                        <p className="text-lg font-normal">Giảm giá 20% cho lần đặt tiếp theo</p>
                        <div className="flex items-center justify-end gap-5">
                            <FaPhoneAlt className="w-4 h-4" />
                            <p className="text-lg font-normal">Hotline: 0922222016</p>
                        </div>
                    </div>
                </div>
                <div className="container py-3 sm:py-0">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div>
                            <Link to="/" >
                                <img src={LogoImg} alt="MixiTravel" className="h-16 mt-2 mb-2" />
                            </Link>
                        </div>

                        {/* Desktop Navbar */}
                        <div className="hidden md:block">
                            <ul className="flex items-center gap-6">
                                <li className="py-4 text-lg font-normal">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                        to="/"
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        Trang Chủ
                                    </NavLink>
                                </li>
                                {/* Dropdown section */}
                                <li className="relative py-4 group">
                                    <div className="flex items-center cursor-pointer dropdown">
                                        <span>Tour</span>
                                        <span>
                                            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180:" />
                                        </span>
                                        <div className="absolute -left-9 z-[9999] hidden w-[200px] top-[57px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
                                            <ul className="space-y-3">
                                                {DropdownLinks.map((data) => (
                                                    <li key={data.name}>
                                                        <a
                                                            className="inline-block w-full p-2 text-lg font-medium rounded-md hover:bg-primary/20"
                                                            href={data.link}
                                                        >
                                                            {data.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4 text-lg font-normal">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                        to="/about"
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        Giới Thiệu
                                    </NavLink>
                                </li>
                                <li className="py-4 text-lg font-normal">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                        to="/places"
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        Điểm Đến
                                    </NavLink>
                                </li>
                                <li className="py-4 text-lg font-normal">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                        to="/contact"
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        Liên Hệ
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center gap-6">
                            {/* Toggle Dark Mode */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 bg-gray-200 rounded-full dark:bg-gray-700"
                            >
                                {isDarkMode ? <FiSun className="w-5 h-5 text-yellow-500" /> : <FiMoon className="w-5 h-5" />}
                            </button>
                            {/* ĐN && ĐK */}

                            <Link
                                to='/login'
                                type="button"
                                className="px-5 py-2 text-white transition-all rounded-full duration-600 bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:bg-primary"
                            >
                                Book Now
                            </Link>
                            <div className="relative py-4 group">
                                <div className="flex items-center cursor-pointer dropdown">
                                    <FaUserAlt className="w-6 h-6" />
                                    <span>
                                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180:" />
                                    </span>
                                    <div className="absolute -left-9 z-[9999] hidden w-[200px] top-[57px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
                                        <ul className="space-y-3">
                                            {UserLinks.map((data) => (
                                                <li key={data.name}>
                                                    <a
                                                        className="inline-block w-full p-2 text-lg font-medium rounded-md hover:bg-primary/50"
                                                        href={data.link}
                                                    >
                                                        {data.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="block md:hidden">
                            {showMenu ? (
                                <HiMenuAlt1
                                    className="transition-none cursor-pointer"
                                    onClick={toggleMenu}
                                    size={30}
                                >
                                </HiMenuAlt1>
                            ) : (
                                <HiMenuAlt3
                                    onClick={toggleMenu}
                                    className="transition-all cursor-pointer"
                                    size={30}
                                >
                                </HiMenuAlt3>
                            )}
                        </div>
                    </div>
                </div>
                <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu}></ResponsiveMenu>
            </div>
        </>
    );
};

export default Navbar;
