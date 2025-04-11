import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = () => {
    const pageCount = 3; // Số lượng trang bạn muốn hiển thị
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <div className='pt-20 '>
            <div className='container flex justify-center'>
                <nav className="flex items-center space-x-4">
                    {/* nút bên trái */}
                    <button
                        className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-300 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500"
                        aria-label="Previous page"
                    >
                        <AiOutlineLeft />
                    </button>

                    {/* số trang */}
                    {pages.map((page) => (
                        <button
                            key={page}
                            className={`flex items-center justify-center w-10 h-10 rounded-full border 
                                ${page === 1
                                    ? 'bg-orange-500 border-orange-500 text-white  hover:bg-orange-600'
                                    : 'text-gray-600 border-gray-300 dark:text-white dark:hover:bg-gray-500 hover:bg-gray-100'
                                }`}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* nút bên phải */}
                    <button
                        className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-300 rounded-full dark:hover:bg-gray-500 hover:bg-gray-100 dark:text-white"
                        aria-label="Next page"
                    >
                        <AiOutlineRight />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;
