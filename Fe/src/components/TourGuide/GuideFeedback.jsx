import React from 'react';
import StarDisplay from '../Star/StarDisplay';

const GuideFeedback = () => {
    return (
        <div className='pt-20 mb-20'>
            <div className='container flex gap-5'>
                <div className='w-1/2'>
                    {/* bên trái */}
                    <div className='relative'>
                        <img
                            className='object-cover w-[500px] h-[600px] rounded-lg'
                            src="https://img.freepik.com/free-photo/young-beautiful-woman-traveling-mountains_23-2149063268.jpg?uid=R81351970&ga=GA1.1.1528150706.1741229786&semt=ais_hybrid&w=740" alt="" />
                        <div className='w-[260px] h-[260px] rounded-lg border border-gray-300 absolute left-1/2 top-[70%] translate-x-[10%]  text-white p-6  bg-primary'>
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
                    {/* bên phải */}
                </div>
                <div className='flex-1 p-10'>
                    <div className='flex gap-3'>
                        <div className='w-[100px] p-2 h-[50px] flex justify-center items-center text-center bg-orange-500 text-white rounded-full'>
                            <p className='text-3xl font-semibold'>5280</p>
                        </div>
                        <p className='text-3xl font-semibold'>
                            Global Clients Say About Us Services
                        </p>
                    </div>
                    <div className='flex items-center justify-between mt-10 '>
                        <div className='flex justify-center w-10 h-10 text-4xl text-white bg-primary'>""</div>
                        <p className='text-2xl font-semibold'>Quality Services</p>
                        <div className=' flex items-center mt-3 p-2 justify-center bg-gray-200 w-[120px] h-[30px] rounded-full bottom-3 left-[140px]'>
                            <StarDisplay rating={5} />
                        </div>
                    </div>
                    <p className='mt-10 text-xl'>
                        "Our trip was absolutely a perfect, thanks
                        this travel agency! They took care of every detail, from to accommodations, and even suggested incredible experiences"
                    </p>
                    <div className='mt-[100px]'>
                        <div className='flex items-center gap-2'>
                            <img className='w-12 h-12 rounded-full'
                                src="https://mighty.tools/mockmind-api/content/human/128.jpg" alt="" />
                            <div className='text-lg'>
                                <p className='font-semibold'>Nguyễn Thị Tường Vy</p>
                                <p>Digital Marketting</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideFeedback;