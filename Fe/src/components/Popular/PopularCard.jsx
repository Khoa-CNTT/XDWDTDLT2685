import React from 'react';
import { Link } from 'react-router-dom';
import { CiClock2 } from "react-icons/ci";

const PopularCard = ({ item }) => {

    return (
        <Link className='mt-10'>
            <div className='p-5 transition-all h-[400px] duration-500  cursor-pointer  rounded-[32px] hover:shadow-xl border border-gray-300'>
                <div className='overflow-hidden'>
                    <Link to={`/tours/${item.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <img src={item.image} alt={item.title}
                            className='mx-auto h-[220px] w-full rounded-[32px] object-cover transition duration-700 hover:skew-x-2 hover:scale-110' />
                    </Link>
                </div>
                <div className='p-2'>
                    <h1 className='text-xl font-bold text-left line-clamp-1 '>{item.title}</h1>
                    <div className='flex items-center gap-2 mx-auto mt-3'>
                        <CiClock2 className='w-4 h-4' />
                        <p>{item.duration}</p>
                    </div>

                </div>
                <div className="flex justify-center mt-5">
                    <Link
                        to={`/tours/${item.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        type="button"
                        className="px-5 py-2 text-white transition-all rounded-full duration-600 bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:text-white hover:bg-gray-400"
                    >
                        Xem ngay
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default PopularCard;