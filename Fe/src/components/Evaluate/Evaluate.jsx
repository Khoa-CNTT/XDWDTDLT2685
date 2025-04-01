import React, { useEffect, useState } from 'react';
import EvaluateImg from '../../assets/Travel/dauphay.webp';
import axios from 'axios';
import EvaluateCard from './EvaluateCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Evaluate = () => {
    const [evaluate, setEvaluate] = useState([])
    const getEvaluate = async () => {
        try {
            const res = await axios.get("https://67b48e00392f4aa94fab5b59.mockapi.io/Review")
            setEvaluate(res.data)
        } catch {
            console.log("lỗi")
        }
    }
    useEffect(() => {
        getEvaluate();
    }, [])
    var settings = {
        dots: true, //hiển thị dấu chấm
        arrows: false, // ẩn nút trái phải
        infinite: true, //chạy lặp vô hạn
        speed: 1000, // tốc độ chuyển slide
        slidesToShow: 2, //Hiển thị 2 slide cùng lúc
        slidesToScroll: 1, //cuộn 1 slide mỗi lần
        autoplay: true, // tự động chạy slide
        autoplaySpeed: 2000,// thời gian tự đông chuyển
        cssEase: "linear", // Hiệu ứng chuyển mượt
        pauseOnHover: true, // Dừng autoplay khi di chuột vào
        pauseOnFocus: true, // Dừng autoplay khi focus vào slider
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            <div data-aos="fade-up" data-aos-duration="300" className='py-10 dark:bg-[#101828] dark:text-white'>
                <div className='container'>
                    <div className='flex justify-between mt-10 '>
                        <h4 className='text-4xl font-bold text-left'>Đánh giá từ những
                            <br />
                            người đã trải nghiệm</h4>
                        <p className='text-gray-600 max-w-[390px] text-lg text-left dark:text-white '>Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi.</p>
                    </div>
                    <div>
                        <img className='w-[100px] h-auto mt-10' src={EvaluateImg} alt="" />
                    </div>
                    <Slider className='mt-10 ' {...settings}>
                        {
                            evaluate.map((item, index) => (
                                <EvaluateCard key={item.id} item={item} />
                            ))
                        }
                    </Slider>
                </div>

            </div>
        </>
    );
};

export default Evaluate;