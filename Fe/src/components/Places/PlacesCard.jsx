import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import StarDisplay from '../Star/StarDisplay';

const PlacesCard = ({ item, booking = true, size = "default", left = false, star = false }) => {
    const sizeClasses = size === "small" ? "w-[300px]" : size === "large" ? "w-full" : "";
    return (
        <div className={`p-5 transition-all   duration-500  shadow-2xl cursor-pointer rounded-[32px] hover:shadow-xl border border-gray-300 h-full flex flex-col ${sizeClasses} ${left ? 'ml-[16px]' : ''}`}>          
            <div className='relative overflow-hidden '>
                <img src={item.img[0]} alt={item.title[0]}
                    className='mx-auto h-[220px] w-full rounded-[32px] object-cover transition duration-700 hover:skew-x-2 hover:scale-110' />
                <div className='absolute flex items-center justify-center w-6 h-6 bg-white rounded-full right-[20px] top-[10px]'>
                    <MdFavorite className='w-4 h-4 text-center text-orange-500' />
                </div>
                {star && (
                    <div className='absolute flex items-center p-2 justify-center bg-white w-[100px] h-[25px] rounded-full bottom-3 left-[140px]'>
                        <StarDisplay rating={item.star} />
                    </div>
                )}
            </div>
            {/* Phần nội dun*/}
            <div className='flex-grow p-2 mt-2 space-y-2'>
                <div className='flex gap-2 opacity-70 '>
                    <IoLocationOutline className='w-6 h-6' />
                    <p className='max-w-[700px]'>{item.location}</p>
                </div>
                <Link
                    to={`/blog/${item.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className='flex-grow text-lg min-h-[10px] font-bold text-left hover:underline '>{item.title[0]}

                </Link>
                <p className='flex items-end flex-1 text-sm'>{item.date} ngày</p>
            </div>

            {/* Phần giá và nút, luôn nằm ở dưới */}
            <div className='flex items-center justify-between py-3 mt-3 border-t-2 '>
                <div className='opacity-70'>
                    <p className='text-base font-bold'>{item.price} VND/người</p>
                </div>
                {booking && (
                    <div className='flex items-center gap-2'>
                        <Link
                            to={`/blog/${item.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                            className="font-semibold "
                        >
                            Đặt ngay
                        </Link>
                        <Link
                            to={`/blog/${item.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                            className="p-1 text-white rounded-full shadow-md bg-gradient-to-r from-primary to-secondary">
                            <AiOutlineRight className='w-4 h-4' />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlacesCard;
