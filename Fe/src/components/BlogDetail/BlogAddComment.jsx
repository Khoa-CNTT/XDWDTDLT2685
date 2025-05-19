import React, { useEffect, useState } from 'react';
import StarRating from '../Star/StarRating';
import { toast } from 'react-toastify';
import { postReview } from '../../services/reviews';
import { FiArrowUpRight } from "react-icons/fi";

const BlogAddComment = () => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const tour_id = localStorage.getItem('tour_id');
    const user_id = localStorage.getItem('user_id');

    

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
      
        if (!comment || !rating) {
            toast.warning('Vui lòng nhập đầy đủ thông tin đánh giá.');
            return;
        }
        try {
            // Tạo dữ liệu đánh giá
            const data = {
                tour_id: tour_id,
                user_id: user_id,
                booking_id: localStorage.getItem('booking_id'),
                comment: comment,
                rating: rating,
            };

            const res = await postReview(data);
            console.log(res.data);
            if (res.status === 201) {
                toast.success('Đánh giá của bạn đã được gửi!');
                setComment('');
                setRating(0);
            } else {
                toast.warning('Có lỗi xảy ra khi gửi đánh giá.');
            }
        } catch (error) {
            toast.warning('Bạn đã đánh giá tour này rồi hoặc chưa đặt tour.Vui lòng đặt tour để đánh giá.');
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className='pt-20'>
            <h1 className='text-2xl font-semibold'>Thêm đánh giá</h1>
            <div className='mt-10'>
                <div className='w-[820px] h-[500px] bg-gray-100 p-10 border shadow-lg rounded-2xl dark:bg-[#101828] dark:text-white'>
                    <div className='flex items-center gap-5'>
                        <h1 className='text-2xl font-semibold'>Đánh giá</h1>
                        <StarRating onRatingChange={(rating) => setRating(rating)} />
                    </div>
                    <hr className='mt-10 border-gray-400' />
                    <div className='mt-6 space-y-3 font-semibold'>
                        <h1 className='text-xl '>Để lại phản hồi</h1>
                        <p>Nội dung</p>
                        <textarea
                            className='w-full h-[150px] px-6 rounded-lg'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleCommentSubmit}
                        className="flex items-center gap-2 px-6 py-3 mt-4 font-semibold text-white transition duration-300 rounded-lg bg-primary"
                    >
                        Gửi Đánh Giá <FiArrowUpRight className='w-6 h-6' />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default BlogAddComment;
