import React from 'react';
import StarDisplay from '../Star/StarDisplay';

const BlogReview = ({ item }) => {
    if (!item || !item.feedback || item.feedback.length === 0) return null;
    // nếu kh có item hoặc feedback hoặc feedback rỗng sẽ kh hiển thị

    // Tổng số lượt đánh giá
    const totalReviews = item.feedback.length;

    // Số sao cao nhất
    const highestStar = Math.max(...item.feedback.map(f => f.star));

    return (
        <div className='pt-20'>
            <h1 className='text-2xl font-semibold'>Đánh giá của khách hàng</h1>
            <div className='mt-6'>
                <div className='w-[820px] h-[300px] bg-black rounded-2xl relative'>
                    <div className='w-[200px] h-[200px] bg-gray-900 rounded-xl absolute top-[50px] left-40  transform -translate-x-1/2'>
                        <div className='flex flex-col items-center p-5 space-y-3 text-center text-white '>
                            <p className='text-6xl font-bold'>{highestStar.toFixed(1)}</p>
                            <p>({totalReviews} đánh giá)</p>
                            <StarDisplay rating={highestStar} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogReview;
