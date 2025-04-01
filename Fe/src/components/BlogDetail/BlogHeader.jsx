import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaShareAlt } from "react-icons/fa";
import { MdFavorite } from 'react-icons/md';
import StarDisplay from '../Star/StarDisplay';

const BlogHeader = ({ item }) => {
    return (
        <div className='flex justify-between pt-10 space-y-2 '>
            <div data-aos="fade-left">
                <div className='flex items-center gap-2'>
                    <IoLocationOutline className='w-6 h-6' />
                    <p className='text-lg'>{item.location}</p>
                </div>
                <div className='flex flex-col space-y-3'>
                    <h1 className='text-3xl font-semibold max-w-[600px]'>{item.title[0]}</h1>
                    <StarDisplay rating={item.star} />
                </div>
            </div>

            {/* Bên phải */}
            <div  data-aos="fade-right" className='flex items-center gap-6 '>
                {/* Nút Share Tour */}
                <div className='flex items-center justify-center gap-2 bg-white p-1 w-[120px] border border-gray-300 shadow-md h-[40px] rounded-2xl '>
                    <div className='flex items-center justify-center w-6 h-6 rounded-full bg-primary'>
                        <FaShareAlt className='w-4 h-4 text-white' />
                    </div>
                    <span className='dark:text-[#101828]'>Share Tour</span>
                </div>

                {/* Nút yêu thích */}
                <div className='flex items-center gap-2 p-1 justify-center bg-white w-[120px] border border-gray-300 shadow-md h-[40px] rounded-2xl'>
                    <div className='flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full'>
                        <MdFavorite className='w-4 h-4 text-white' />
                    </div>
                    <span className='dark:text-[#101828]'>Tour list</span>
                </div>
            </div>
        </div>

    );
};

export default BlogHeader;