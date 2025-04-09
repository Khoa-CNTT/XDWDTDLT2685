import React from 'react';
import StarDisplay from '../Star/StarDisplay';

const GuideFeedback = () => {
    return (
        <div className='pt-20'>
            <div className='container'>
                <div>
                    {/* bên trái */}
                    <div className='relative'>
                        <img
                            className='object-cover  w-[500px] h-[600px] rounded-lg'
                            src="https://img.freepik.com/free-photo/young-beautiful-woman-traveling-mountains_23-2149063268.jpg?uid=R81351970&ga=GA1.1.1528150706.1741229786&semt=ais_hybrid&w=740" alt="" />
                        <div className='w-[270px] h-[270px] rounded-lg border border-gray-300 absolute left-[42%] top-[70%] translate-x-[-50%]  text-white p-6  bg-primary'>
                            <p className="text-base font-semibold">850K+ Khách hàng hài lòng</p>
                            <div className="flex items-center gap-2 mt-3">
                                <div className="flex -space-x-3">
                                    <img className="object-cover w-12 h-12 border-2 border-white rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                                    <img className="object-cover w-12 h-12 border-2 border-white rounded-full" src="https://randomuser.me/api/portraits/women/45.jpg" alt="" />
                                    <img className="object-cover w-12 h-12 border-2 border-white rounded-full" src="https://randomuser.me/api/portraits/men/50.jpg" alt="" />
                                    <span className="flex items-center justify-center w-12 h-12 text-xs font-semibold text-white bg-orange-500 border-2 border-white rounded-full">4k+</span>
                                </div>
                            </div>
                            <hr className='mt-6 border-white' />
                            <div className="mt-8 ">
                                <p className='text-lg'>
                                    Đánh giá tích cực
                                </p>
                                <div className=' flex items-center mt-3 p-2 justify-center bg-white w-[120px] h-[30px] rounded-full bottom-3 left-[140px]'>
                                    <StarDisplay rating={5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GuideFeedback;