import React, { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import StarDisplay from '../Star/StarDisplay';
import { FiClock } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllBookingId } from '../../services/tour';

const TourHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                const res = await getAllBookingId(userId);
                setBookings(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu tour:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='pt-10'>
            <div className='container space-y-10'>
                {bookings.map((item, index) => (
                    <div key={index} className='w-full bg-gray-100 p-6 h-[300px] rounded-lg shadow-xl'>
                        <div className='relative flex space-x-10'>
                            <Link to={`/tourbookingdetail/${item.bookingId}`}>
                                <img
                                    onClick={() => {
                                        localStorage.setItem('booking_id', item.bookingId);
                                        window.scrollTo(0, 0);
                                    }}
                                    src={item.image}
                                    alt=""
                                    className='w-[300px] h-[230px] rounded-xl object-cover'
                                />
                            </Link>
                            <div className='w-[120px] absolute top-4 left-[-30px] h-8 px-4 py-2 flex justify-center items-center bg-yellow-400 rounded-2xl shadow-sm'>
                                <p className='text-sm font-semibold text-white'>Chờ xác nhận</p>
                            </div>
                            {/* <div
                                className={`w-[120px] absolute top-4 left-[-30px] h-8 px-4 py-2 flex justify-center items-center rounded-2xl shadow-sm 
        ${item.status === 'PENDING' ? 'bg-yellow-400' : item.status === 'COMPLETED' ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <p className='text-sm font-semibold text-white'>
                                    {item.status === 'PENDING' ? 'Chờ xác nhận' : item.status === 'COMPLETED' ? 'Đã xác nhận' : 'Không xác định'}
                                </p> */}
                            {/* </div> */}
                            <div className='flex flex-col space-y-2'>
                                <div className='flex items-center gap-6'>
                                    <div className='flex gap-2 opacity-70'>
                                        <IoLocationOutline className='w-6 h-6' />
                                        <p>Hà Nội</p>
                                    </div>
                                    <div className='flex items-center p-2 justify-center bg-white w-[100px] h-[25px] rounded-full'>
                                        <StarDisplay rating={5} />
                                    </div>
                                </div>
                                <Link
                                    to={`/tourbookingdetail/${item.bookingId}`}
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
                                        <span className='ml-1'>3</span>
                                    </div>
                                </div>
                                <hr className='border-gray-300' />
                                <div className='flex items-center justify-between'>
                                    <div className=' opacity-70'>
                                        <p className='mt-4 text-xl font-bold'>{item.price_adult.toLocaleString('vi-VN')}/VNĐ</p>
                                    </div>
                                    <button className='w-[100px] text-lg rounded-xl h-10 border bg-primary text-white border-gray-200'>Đánh giá</button>
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
