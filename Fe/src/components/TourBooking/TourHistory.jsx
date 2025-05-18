import React, { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import StarDisplay from '../Star/StarDisplay';
import { FiClock } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllBookingId } from '../../services/tour';
import NoPage from '../../pages/NoPage';
import { FiArrowUpRight } from "react-icons/fi";

const TourHistory = () => {
    const [bookings, setBookings] = useState([]);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            const res = await getAllBookingId(userId);
            const data = Array.isArray(res.data) ? res.data : [];
            const validBookings = data.filter(item =>
                ['PENDING', 'CONFIRMED', 'COMPLETED'].includes(item.booking_status)
            );
            setBookings(validBookings);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu tour:", error);
            setBookings([]);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    if (!Array.isArray(bookings) || bookings.length === 0) {
        return <NoPage redirectTo="/tour" />;
    }

    return (
        <div className='pt-10'>
            <div className='container space-y-10'>
                {bookings.map((item, index) => (
                    <div key={index} className='w-full bg-gray-100 p-6 h-[300px] rounded-lg shadow-xl'>
                        <div className='relative flex space-x-10'>
                            <Link to={`/tourbookingdetail/${item.booking_id}`}>
                                <img
                                    onClick={() => {
                                        localStorage.setItem('tour_id', item.tourId);
                                        localStorage.setItem('booking_id', item.booking_id);
                                        window.scrollTo(0, 0);
                                    }}
                                    src={item.image}
                                    alt=""
                                    className='w-[300px] h-[230px] rounded-xl object-cover'
                                />
                            </Link>

                            <div
                                className={`w-[120px] absolute top-4 left-[-30px] h-8 px-4 py-2 flex justify-center items-center rounded-2xl shadow-sm
                                    ${item.booking_status === 'PENDING' ? 'bg-yellow-400' :
                                        item.booking_status === 'CONFIRMED' ? 'bg-blue-500' :
                                            item.booking_status === 'COMPLETED' ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <p className='text-sm font-semibold text-white'>
                                    {
                                        item.booking_status === 'PENDING' ? 'Chờ xác nhận' :
                                            item.booking_status === 'CONFIRMED' ? 'Đã xác nhận' :
                                                item.booking_status === 'COMPLETED' ? 'Hoàn thành' :
                                                    'Không xác định'}
                                </p>
                            </div>

                            <div className='flex flex-col space-y-2'>
                                <div className='flex items-center gap-6'>
                                    <div className='flex gap-2 opacity-70'>
                                        <IoLocationOutline className='w-6 h-6' />
                                        <p>{item.destination}</p>
                                    </div>
                                    <div className='flex items-center p-2 justify-center bg-white w-[100px] h-[25px] rounded-full'>
                                        <StarDisplay rating={item.rating} />
                                    </div>
                                </div>
                                <Link
                                    to={`/tourbookingdetail/${item.booking_id}`}
                                    className='text-xl cursor-pointer hover:underline'>
                                    {item.title}
                                </Link>
                                <p className='text-lg font-semibold'>Điểm Nhấn:</p>
                                <p className='text-base opacity-70 line-clamp-2'>
                                    <span>{item.description.split('|')[0].split(' ')[0]}</span>{' '}
                                    {item.description.split('|')[0].split(' ').slice(1).join(' ')}
                                </p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-1'>
                                        <FiClock className='w-4 h-4' />
                                        <p>{item.duration}</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <FaRegUser />
                                        <span className='ml-1'>{item.num_adults + item.num_children}</span>
                                    </div>
                                </div>
                                <hr className='border-gray-300' />
                                <div className='flex items-center justify-between'>
                                    <div className='opacity-70'>
                                        <p className='mt-4 text-xl font-bold'>{item.total_price.toLocaleString('vi-VN')}</p>
                                    </div>
                                    {item.booking_status === 'COMPLETED' && (
                                        <Link to={`/tours/${item.tourId}`}
                                            onClick={() => {
                                                localStorage.setItem('booking_id', item.booking_id);
                                                localStorage.setItem('tour_id', item.tourId);
                                                window.scrollTo(0, 0);
                                            }}
                                            className='w-[120px] h-10 p-2 flex items-center justify-center gap-1 text-lg rounded-2xl border border-black bg-white text-black font-normal hover:bg-green-600 hover:text-white hover:border-gray-200 '
                                        >
                                            Đánh giá <FiArrowUpRight className="w-5 h-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourHistory;
