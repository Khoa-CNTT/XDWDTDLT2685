import React, { useState } from 'react';
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogSidebar = ({ item }) => {
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState('');

    const handleClick = () => {
        if (!startDate) {
            toast.warning("Vui lòng chọn ngày bắt đầu tour!");
            return;
        }
    
        const daysMatch = item.duration.match(/(\d+)\s*ngày/);
        const numDays = daysMatch ? parseInt(daysMatch[1]) : 0;
    
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + numDays - 1); // Trừ 1 vì ngày bắt đầu tính là ngày 1
    
        // Format lại dd/mm/yyyy
        const format = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };
    
        navigate('/payment', {
            state: {
                item: item,
                startDate: format(start),
                endDate: format(end)
            },
        })
        
    }
    return (
        <div data-aos="fade-up" className='bg-gray-100 border dark:bg-[#101828] dark:text-white border-gray-200 rounded-xl shadow-lg w-[310px] h-[450px]'>
            <div className='p-5 '>
                <h1 className='text-xl font-semibold '>Tour Booking</h1>
                <hr className='mt-5 border-gray-300' />
                <div className='flex flex-col pt-5 space-y-10'>
                    <div className='flex gap-3'>
                        <label className='text-base font-semibold'>Ngày bắt đầu</label>
                        <input
                            type="date"
                            className='w-[150px] px-2 border border-gray-300 '
                            value={startDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                </div>
                <hr className='mt-5 border-gray-300' />
                <div className='flex items-center justify-between mt-5'>
                    <p className='font-semibold '>Thời gian:</p>
                    <p className='text-gray-500 dark:text-white'>{item.duration}</p>
                </div>
                <hr className='mt-5 border-gray-300' />
                <div className='mt-5 space-y-4'>
                    <h1 className='font-semibold'>Vé</h1>
                    <div className='space-y-3'>
                        <div className='flex items-center justify-between ' >
                            <p className='font-semibold'>Người lớn</p>
                            <p className='text-gray-500 dark:text-white'>{item.price_adult}VNĐ</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='font-semibold'>Trẻ em(5 đến 11 tuổi)</p>
                            <p className='text-gray-500 dark:text-white'>{item.price_child}VNĐ</p>
                        </div>
                    </div>
                </div>
                {/* <Button text="Đặt Ngay"  width="max-w-[500px]" /> */}
                <button
                    onClick={handleClick}
                    className="w-full py-2 mt-5 font-semibold text-white rounded-lg bg-primary"
                >
                    Đặt ngay
                </button>
                <p className='mt-2 text-center cursor-pointer hover:underline'>Bạn cần trợ giúp không?</p>
            </div>

            <div className='p-5 w-[310px] h-[200px]  dark:bg-[#101828] dark:text-white dark:border dark:border-white bg-gray-100 shadow-lg rounded-lg mt-10'>
                <p className='text-xl font-semibold '>Bạn cần trợ giúp</p>
                <div className='mt-8 space-y-6'>
                    <div className='flex items-center gap-2'>
                        <MdOutlineMail className='w-6 h-6 text-orange-500' />
                        <p className='text-base text-gray-500'>phanthanh10203@gmail.com</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FiPhoneCall className='w-6 h-6 text-orange-500' />
                        <p className='text-base text-gray-500'>+000 (123) 4588</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BlogSidebar;