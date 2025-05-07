import React from 'react';
import { useState, useEffect } from 'react';
import { getAllTour, getFilterSortTours } from '../services/tour';

// Map tên hiển thị -> region API
const regionMap = {
    "Miền Bắc": "NORTH",
    "Miền Trung": "CENTRAL",
    "Miền Nam": "SOUTH"
};
const useFilterRegion = () => {
    const [selected, setSelected] = useState("Tất cả");
    const [tours, setTours] = useState([]);
    
    useEffect(() => {
        filterTours();
    }, [selected]);

    const filterTours = async () => {
        try {
            if (selected === "Tất cả") {
                const res = await getAllTour(0, 20);
                setTours(res.data.tours);
            } else {
                const res = await getFilterSortTours(0, 20, regionMap[selected]);
                setTours(res.data.tours);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return {
        selected,
        setSelected,
        tours,
       
    };
};

export default useFilterRegion;