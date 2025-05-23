import React from 'react';
import { FaFacebookMessenger } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import BlogSidebar from './BlogSidebar';
import BlogSchedule from './BlogSchedule';
import BlogReview from './BlogReview';
import BlogFeedback from './BlogFeedback';
import BlogAddComment from './BlogAddComment';
const BlogContentCard = ({ item }) => {
    return (
        <div className='pt-10'>
            <div className='container'>
            <h1 className='text-3xl font-semibold'>Khám phá Tours</h1>
                <div className='flex gap-5 mt-5'>
                    <div className='w-3/4'>
                        <h1 className='mt-2 text-xl font-semibold'>Điểm nhấn</h1>
                        <div className='items-center mt-2 space-y-2 text-lg'>
                            <div className='items-center mt-2 space-y-2 text-lg'>
                                {item.description.split('|').map((part, index) => (
                                    <p key={index} className="text-gray-500">
                                        <span className="font-semibold text-black dark:text-white">
                                            {part.trim().split(':')[0]}:
                                        </span>{' '}
                                        {part.trim().split(':').slice(1).join(':').trim()}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-6 mt-10'>
                            {/* bên trái */}
                            <div className='w-[400px] p-5 h-[400px] border border-gray-200 shadow-md rounded-xl'>
                                <h1 className="text-xl font-semibold">Bao gồm và không bao gồm</h1>
                                <div className='gap-2 mt-5 space-y-5 '>
                                    {item.include.map((incl, index) => (
                                        <div key={index} className='flex items-center gap-3'>
                                            <FaCheck className='w-4 h-4 text-primary' />
                                            <p>{incl}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* bên trái */}
                            <div className='w-[400px] p-5 h-[350px] border border-gray-200 shadow-md rounded-xl'>
                                <h1 className="text-xl font-semibold">Không bao gồm</h1>
                                <div className='gap-2 mt-5 space-y-5 '>
                                    {item.notinclude.map((notincl, index) => (
                                        <div key={index} className='flex items-center gap-3'>
                                            <IoCloseSharp className='w-4 h-4 text-orange-500' />
                                            <p>{notincl}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <BlogSidebar item={item} />
                    </div>
                </div>
                <BlogSchedule item={item} />
                <BlogReview  item={item}  />
                <BlogFeedback item={item} />
                <BlogAddComment item={item} />
            </div>
        </div>

    );
};

export default BlogContentCard;