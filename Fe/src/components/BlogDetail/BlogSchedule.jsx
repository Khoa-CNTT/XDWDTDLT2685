import React, { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronRight } from "react-icons/fa";

const BlogSchedule = ({ item }) => {
    const [openDay, setOpenDay] = useState(null);

    const toggleDropdown = (day) => {
        setOpenDay(openDay === day ? null : day);
    };

    return (
        <div className="pt-16">
            <div className="">
                <h1 className="text-2xl font-semibold">Lịch Trình</h1>
                <div className="w-3/4 mt-10 space-y-4 dark:text-[#101828]">
                    {item.itinerary.map((dayItem) => (
                        <div key={dayItem.day} className="border border-gray-200 max-w-[820px] bg-white p-4 rounded-lg">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleDropdown(dayItem.day)}
                            >
                                <div className="flex items-center">
                                    <FaCheckCircle className="text-xl text-orange-500" />
                                    <span className="ml-2 text-lg font-semibold">
                                        Ngày {dayItem.day}: {dayItem.title}
                                    </span>
                                </div>
                                {/* Icon mũi tên */}
                                {openDay === dayItem.day ? (
                                    <FaChevronDown className="text-xl text-gray-600" />
                                ) : (
                                    <FaChevronRight className="text-xl text-gray-600" />
                                )}
                            </div>
                            {/* Nội dung của ngày, chỉ hiển thị khi mở */}
                            {openDay === dayItem.day && (
                                <ul className="mt-3 ml-8 space-y-2 text-gray-600 list-disc">
                                    {dayItem.content.map((line, index) => (
                                        <li key={index}>{line}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSchedule;
