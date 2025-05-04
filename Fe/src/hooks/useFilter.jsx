import React, { useState, useEffect } from 'react';
import { getAllTour, getFilterTours } from '../services/tour';

const regionMap = {
    "Miền Bắc": "NORTH",
    "Miền Trung": "CENTRAL",
    "Miền Nam": "SOUTH"
};

const priceMap = {
    "1.000.000 - 3.000.000 Vnd": { min: 1000000, max: 3000000 },
    "3.000.000 - 6.000.000 Vnd": { min: 3000000, max: 6000000 },
    "6.000.000 - 8.000.000 Vnd": { min: 6000000, max: 8000000 },
    "8.000.000 - 10.000.000 Vnd": { min: 8000000, max: 10000000 }
};

const durationMap = {
    "3 ngày 2 đêm": "3 ngày 2 đêm",
    "4 ngày 3 đêm": "4 ngày 3 đêm",
    "5 ngày 4 đêm": "5 ngày 4 đêm"
};

const useFilter = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [tours, setTours] = useState([]);

    useEffect(() => {
        filterTours();
    }, [selectedRegion, selectedPrice, selectedDuration]);

    const filterTours = async () => {
        try {
            const region = regionMap[selectedRegion] || null; // Để giá trị `null` nếu không có region
            const priceRange = priceMap[selectedPrice] || {}; // Nếu không có giá trị price, mặc định là {}
            const duration = durationMap[selectedDuration] || null; // Để giá trị `null` nếu không có duration

            const { min: priceMin, max: priceMax } = priceRange;

            // Chỉ gửi tham số nếu có giá trị hợp lệ
            const params = {};
            if (region) params.region = region;
            if (priceMin) params.priceMin = priceMin;
            if (priceMax) params.priceMax = priceMax;
            if (duration) params.duration = duration;

            if (Object.keys(params).length === 0) {
                // Nếu không có tham số nào được chọn, lấy tất cả tours
                const res = await getAllTour(0, 6);
                setTours(res.data.tours);
            } else {
                // Gọi API với tham số lọc
                const res = await getFilterTours(0, 6, region, priceMin, priceMax, duration);
                setTours(res.data.tours);
            }
        } catch (error) {
            console.error("Lỗi khi lọc tour:", error);
        }
    };

    const resetFilters = async () => {
        setSelectedRegion(null);
        setSelectedPrice(null);
        setSelectedDuration(null);
        try {
            const res = await getAllTour(0, 6);
            setTours(res.data.tours);
        } catch (error) {
            console.error("Lỗi khi reset:", error);
        }
    };

    return {
        selectedRegion,
        setSelectedRegion,
        selectedPrice,
        setSelectedPrice,
        selectedDuration,
        setSelectedDuration,
        tours,
        resetFilters
    };
};

export default useFilter;
