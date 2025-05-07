import React, { useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegClock, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const destinations = [
    { value: "", label: "Chọn điểm đến" },
    { value: "Huế", label: "Huế" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
    { value: "Hội An", label: "Hội An" },
    { value: "Quảng Bình", label: "Quảng Bình" },
    { value: "Tây Nguyên", label: "Tây Nguyên" },
    { value: "Nha Trang", label: "Nha Trang" },
    { value: "Ninh Thuận", label: "Ninh Thuận" },
    { value: "Quảng Trị", label: "Quảng Trị" },
    { value: "Pleiku", label: "Pleiku" },
    { value: "Nghệ An", label: "Nghệ An" },
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "Hạ Long", label: "Hạ Long" },
    { value: "Ninh Bình", label: "Ninh Bình" },
    { value: "Tây Bắc", label: "Tây Bắc" },
    { value: "Sapa", label: "Sapa" },
    { value: "Đông Bắc", label: "Đông Bắc" },
    { value: "Sơn La", label: "Sơn La" },
    { value: "Điện Biên", label: "Điện Biên" },
    { value: "Lai Châu", label: "Lai Châu" },
    { value: "Lào Cai", label: "Lào Cai" },
    { value: "Hòa Bình", label: "Hòa Bình" },
    { value: "TP Hồ Chí Minh", label: "TP Hồ Chí Minh" },
    { value: "Côn Đảo", label: "Côn Đảo" },
    { value: "Phú Quốc", label: "Phú Quốc" }
];

const durations = [
    { value: "", label: "Số ngày" },
    { value: "3 ngày 2 đêm", label: "3 ngày 2 đêm" },
    { value: "4 ngày 3 đêm", label: "4 ngày 3 đêm" },
    { value: "5 ngày 4 đêm", label: "5 ngày 4 đêm" }
];

const prices = [
    { value: "", label: "Tất cả mức giá" },
    { value: "1.000.000 - 3.000.000 Vnd", label: "1.000.000 - 3.000.000 Vnd" },
    { value: "3.000.000 - 6.000.000 Vnd", label: "3.000.000 - 6.000.000 Vnd" },
    { value: "6.000.000 - 8.000.000 Vnd", label: "6.000.000 - 8.000.000 Vnd" },
    { value: "8.000.000 - 10.000.000 Vnd", label: "8.000.000 - 10.000.000 Vnd" }
];

const Hero = () => {
    const navigate = useNavigate();

    const [selectedDestination, setSelectedDestination] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [loading, setLoading] = useState(false)


    const handleSearch = () => {
        if (!selectedDestination && !selectedDuration && !selectedPrice) {
            toast.warning("Vui lòng chọn thông tin tìm kiếm", {
            });
            return;
        }
            setLoading(true)
            const queryParams = new URLSearchParams();

            if (selectedDestination) {
                queryParams.append('title', selectedDestination);
            }

            if (selectedDuration) {
                queryParams.append('duration', selectedDuration);
            }

            if (selectedPrice) {
                queryParams.append('priceRange', selectedPrice);
            }
            setTimeout(() => {
                navigate(`/search?${queryParams.toString()}`);
                setLoading(false)
            }, 1500)
        };

        return (
            <div className='h-full'>
                <div className='flex items-center justify-center w-full h-full p-4'>
                    <div className='container grid grid-cols-1 gap-4'>
                        <div className='text-left text-white'>
                            <p data-aos="fade-up" className='text-sm'>Các gói của chúng tôi</p>
                            <p
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className='text-3xl font-bold'>
                                Tìm kiếm Điểm đến của bạn
                            </p>
                        </div>
                        {/* form section */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="600"
                            className="relative p-4 space-y-4 bg-white rounded-xl dark:bg-[#101828] dark:text-white"
                        >
                            <div className='text-center'>
                                <label htmlFor="destination" className="text-3xl font-medium text-gray-400">
                                    Bạn lựa chọn điểm đến nào?
                                </label>
                                <p className="mt-2 mb-6 text-xl text-gray-500">Hàng nghìn điểm đến hấp dẫn với giá tốt nhất đang chờ bạn</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
                                <div className='relative flex items-center'>
                                    <MdLocationOn className='absolute w-6 h-6 ml-2 text-gray-600 -translate-y-1/2 top-1/2' />
                                    <select
                                        className="w-full p-3 my-2 text-gray-500 bg-gray-100 rounded-full pl-9 focus:outline-primary outline-1"
                                        value={selectedDestination}
                                        onChange={(e) => setSelectedDestination(e.target.value)}
                                    >
                                        {destinations.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='relative flex items-center'>
                                    <FaRegClock className='absolute w-6 h-6 ml-2 text-gray-800 -translate-y-1/2 top-1/2' />
                                    <select
                                        className="w-full p-3 my-2 text-gray-500 bg-gray-100 rounded-full pl-9 focus:outline-primary outline-1"
                                        value={selectedDuration}
                                        onChange={(e) => setSelectedDuration(e.target.value)}
                                    >
                                        {durations.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='relative flex items-center'>
                                    <AiOutlineDollarCircle className='absolute w-6 h-6 ml-2 text-gray-800 -translate-y-1/2 top-1/2' />
                                    <select
                                        className="w-full p-3 my-2 text-gray-500 bg-gray-100 rounded-full pl-9 focus:outline-primary outline-1"
                                        value={selectedPrice}
                                        onChange={(e) => setSelectedPrice(e.target.value)}
                                    >
                                        {prices.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    className="absolute px-6 py-3 text-white duration-200 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105 -bottom-6 left-1/2"
                                    onClick={handleSearch}
                                >
                                    {loading ? (
                                        <>
                                            <FaSyncAlt className='w-5 h-5 text-white animate-spin' />
                                        </>
                                    ) : (
                                        "Tìm kiếm"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Hero;
