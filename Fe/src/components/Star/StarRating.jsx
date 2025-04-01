import React, { useState } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';

const StarRating = ({ onRatingChange }) => {
    const [rating, setRating] = useState(0); // lưu số sao được chon
    const [hover, setHover] = useState(0); // lưu số sao khi hover vào
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <MdOutlineStarPurple500
                        key={index}
                        onClick={() => {
                            setRating(starValue); // khi click sao đc cập nhật
                            onRatingChange(starValue); // gởi giá trị hiện có lên phần cha
                        }}
                        onMouseEnter={() => setHover(starValue)} // khi đưa chuột vào hiển thị
                        onMouseLeave={() => setHover(0)} // khi rời đi reset hover = 0
                        className={`text-4xl cursor-pointer ${hover >= starValue || rating >= starValue ? "text-yellow-500" : "text-gray-400"}`}
                        // khi hover và chọn sao thì màu vàng còn ch có gì màu xám
                    />
                );
            })}
        </div>
    );
};

export default StarRating;