import React, { useState } from 'react';

const LocationList = () => {
    const regions = ["Tất cả", "Miền Bắc", "Miền Trung", "Miền Nam"];
    const [selected, setSelected] = useState("Tất cả");

    // const handleTabClick = (region) => {
    //     setSelectedRegion(region);
    //     onFilterChange(region); // Gửi dữ liệu lọc lên cha hoặc trực tiếp đến component danh sách
    //   };
    return (
        
        <div className='pt-10 dark:bg-[#101828] dark:text-white'>
            <div className='container flex justify-center '>
                <div className="inline-flex items-center justify-center p-3 bg-white border border-gray-300 rounded-full dark:bg-[#101828] dark:border-white shadow-sm">
                    {regions.map((region) => (
                        <button
                            key={region}
                            onClick={() => setSelected(region)}
                            className={`px-5 text-lg py-2 rounded-full font-semibold transition-all duration-200 ${selected === region
                                    ? "bg-primary text-white"
                                    : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LocationList;