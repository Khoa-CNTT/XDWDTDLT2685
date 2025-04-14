import React from 'react';
import { MdOutlineStarPurple500 } from "react-icons/md";

const StarDisplay = ({ rating }) => {
    return (
        <div className="flex text-yellow-500">
            {[...Array(5)].map((_, index) => (
                <MdOutlineStarPurple500 key={index} className={index < rating ? "text-lg" : "text-gray-300 text-lg"} />
            ))}
        </div>
    );
};

export default StarDisplay;