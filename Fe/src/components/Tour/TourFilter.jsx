import React from 'react';
import StarDisplay from '../Star/StarDisplay';

const region = ["Miền Bắc", "Miền Trung", "Miền Nam"];
const prices = ["1.000.000 - 3.000.000", "3.000.000 - 6.000.000", "6.000.000 - 8.000.000", "8.000.000 - 10.000.000"]
const times = ['3 ngày 2 đêm', '4 ngày 3 đêm', '5 ngày 4 đêm']
const TourFilter = () => {
    return (
        <div className='pt-10 '>
            <div className=''>
                <div className='w-full h-full p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-[#101828] dark:text-white'>
                    <div className='ml-[200px] text-white '>
                        <button className='px-6 py-1 border border-gray-100 rounded-lg bg-primary'>Xóa</button>
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>Lọc theo giá</h1>
                        <div className='mt-3 space-y-2'>
                            {prices.map((pri, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input type="radio" className="w-4 h-4" />
                                    <span className='text-base'>{pri} Vnd</span>
                                </div>
                            ))}
                        </div>
                        <hr className='mt-5 text-gray-500' />
                        <div>
                            <h1 className='text-lg font-semibold'>Điểm đến</h1>
                            <div className='mt-3 space-y-2'>
                                {region.map((re, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input type="radio" className="w-4 h-4" name="destination" />
                                        <span className='text-base'>{re}</span>
                                    </div>
                                ))}
                            </div>
                            <hr className='mt-5 text-gray-500' />
                            <div>
                                <h1 className='text-lg font-semibold'>Đánh giá</h1>
                                <div className='mt-3 space-y-2'>
                                    {[5, 4, 3, 2, 1].map((rating, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <input type="radio" className="w-4 h-4" name="rating" />
                                            <StarDisplay rating={rating} />
                                        </div>
                                    ))}
                                </div>
                                <hr className='mt-5 text-gray-500' />
                                <div>
                                    <h1 className='text-lg font-semibold'>Thời gian</h1>
                                    <div className='mt-3 space-y-2'>
                                        {times.map((time, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <input type="radio" className="w-4 h-4" />
                                                <span className='text-base'>{time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className='mt-5 text-gray-400' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourFilter;