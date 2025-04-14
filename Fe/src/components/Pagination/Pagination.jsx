import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = ({ totalPages, getAllTours }) => {
    const pageCount = totalPages;
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    const [currentPage, setCurrentPage] = useState(1);


    const handlePageClick = (page) => {
        setCurrentPage(page);
        console.log(page)
        getAllTours(page - 1);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => {
            const newPage = prev > 1 ? prev - 1 : prev;
            if (newPage !== prev) getAllTours(newPage -1);
            return newPage;
        });
    };

    const handleNext = () => {
        setCurrentPage((prev) => {
            const newPage = prev < pageCount ? prev + 1 : prev;
            if (newPage !== prev) getAllTours(newPage -1);
            return newPage;
        });
    };

    return (
        <div className='pt-20'>
            <div className='container flex justify-center'>
                <nav className="flex items-center space-x-4">
                    {/* nút bên trái */}
                    <button
                        onClick={handlePrev}
                        className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-300 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500"
                        aria-label="Previous page"
                    >
                        <AiOutlineLeft />
                    </button>

                    {/* số trang */}
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full border 
                                ${currentPage === page
                                    ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'
                                    : 'text-gray-600 border-gray-300 dark:text-white dark:hover:bg-gray-500 hover:bg-gray-100'
                                }`}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* nút bên phải */}
                    <button
                        onClick={handleNext}
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
