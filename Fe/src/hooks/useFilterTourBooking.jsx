import React, { useState, useEffect } from 'react';
import { getAllBookingId, getBookingtour } from '../services/tour';

const statusMap = {
    "Chưa xác nhận": "PENDING",
    "Đã xác nhận": "CONFIRMED",
    "Hoàn thành": "COMPLETED",
    "Đã hủy": "CANCELLED",
};

const useFilterTourBooking = () => {
    const [selected, setSelected] = useState("Tất cả");
    const [booking, setBooking] = useState([]);

    const userId = localStorage.getItem("user_id"); // Lấy từ localStorage

    useEffect(() => {
        if (userId) {
            filterBookingTours();
        }
    }, [selected, userId]);

    const filterBookingTours = async () => {
        try {
            if (selected === "Tất cả") {
                const res = await getAllBookingId(userId);
                setBooking(res.data);
            } else {
                const res = await getBookingtour(userId, statusMap[selected]);
                setBooking(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        selected,
        setSelected,
        booking,
    };
};

export default useFilterTourBooking;
