import React from 'react';
import StarDisplay from '../Star/StarDisplay';

const BlogFeedback = ({ item }) => {
    return (
        <div className='pt-20'>
            <h1 className='text-2xl font-semibold'>Ý kiến của khách hàng</h1>
            <div className='mt-10 space-y-6 dark:text-[#101828]'>
                {/* {item.feedback.map((fb, index) => ( */}
                    <div /*key={index} */ className='w-[820px] h-[200px] bg-white border shadow-lg rounded-2xl relative p-10'>
                        {/* Avatar + Thông tin khách hàng */}
                        <div className='flex items-center '>
                            <img src={""} alt="Avatar" className="object-cover w-20 h-20 rounded-full" />
                            <div className='ml-8 space-y-2'>
                                <h3 className='font-semibold'>thanh</h3>
                                <StarDisplay rating={3} />
                                <p className='font-semibold'>25/4/2025</p>
                                <p className='text-lg'>quá đẹp</p>
                            </div>
                        </div>

                    </div>
                {/* ))} */}
            </div>
        </div>
    );
};

export default BlogFeedback;
