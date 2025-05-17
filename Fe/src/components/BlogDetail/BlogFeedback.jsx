import React from 'react';
import { FaUserAlt } from 'react-icons/fa'; // Import the icon
import StarDisplay from '../Star/StarDisplay';

const BlogFeedback = ({ item }) => {
    return (
        <div className='pt-20'>
            <h1 className='text-2xl font-semibold'>Ý kiến của khách hàng</h1>
            <div className='mt-10 space-y-6 dark:text-[#101828]'>
                {item.reviews.map((fb, index) => (
                    <div key={index} className='w-[820px] h-[200px] bg-white border shadow-lg rounded-2xl relative p-10'>
                        {/* Avatar + Thông tin khách hàng */}
                        <div className='flex items-center'>
                            {fb.avatar ? (
                                <img src={fb.avatar} alt="Avatar" className="object-cover w-20 h-20 rounded-full" />
                            ) : (
                                <FaUserAlt className="w-20 h-20 text-gray-400" /> 
                            )}
                            <div className='ml-8 space-y-2'>
                                <h3 className='font-semibold'>{fb.user_name}</h3>
                                <StarDisplay rating={fb.rating} />
                                <p className='text-lg'>{item.duration}</p>
                                <p className='text-lg'>{fb.comment}</p>
                                <p className='font-semibold'>
                                    {(() => {
                                        const date = new Date(fb.created_at);
                                        const day = String(date.getDate()).padStart(2, '0');
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${day}-${month}-${year}`;
                                    })()}
                                </p>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogFeedback;
