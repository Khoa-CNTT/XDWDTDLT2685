import React from 'react';
import StarDisplay from '../Star/StarDisplay';

const BlogReview = ({ item }) => {

    return (
        <div className='pt-20'>
            <h1 className='text-2xl font-semibold'>Đánh giá của khách hàng</h1>
            <div className='mt-6'>
                <div className='w-[820px] h-[300px] bg-black rounded-2xl relative'>
                    <div className='w-[200px] h-[200px] bg-gray-900 rounded-xl absolute top-[50px] left-40  transform -translate-x-1/2'>
                        <div className='flex flex-col items-center p-5 space-y-3 text-center text-white '>
                            <p className='text-6xl font-bold'>{item.average_rating.toFixed(1)}</p>  
                            {/* {highestStar.toFixed(1)} */}
                            <p>({item.total_reviews} đánh giá)</p> 
                            {/* totalReviews */}
                            <StarDisplay rating={5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogReview;
