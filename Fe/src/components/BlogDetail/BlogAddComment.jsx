import React from 'react';
import Button from '../Button/Button';
import StarRating from '../Star/StarRating';

const BlogAddComment = () => {
    return (
        <div className='pt-20'>
            <h1 className='text-2xl font-semibold'>Thêm đánh giá</h1>
            <div className='mt-10'>
                <div className='w-[820px] h-[500px] bg-gray-100 p-10 border shadow-lg rounded-2xl dark:bg-[#101828] dark:text-white'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-2xl font-semibold'>Đánh giá</h1>
                        <StarRating onRatingChange={(rating) => console.log("Bạn đã chọn: ", rating)} />
                    </div>
                    <hr className='mt-10 border-gray-400' />
                    <div className='mt-6 space-y-3 font-semibold'>
                        <h1 className='text-xl '>Để lại phản hồi</h1>
                        <p>Nội dung</p>
                        <textarea className='w-full h-[150px] px-6 rounded-lg'></textarea>
                    </div>
                    <Button text="Gửi đánh giá" width="max-w-[200px]" />
                </div>
            </div>

        </div>
    );
};

export default BlogAddComment;