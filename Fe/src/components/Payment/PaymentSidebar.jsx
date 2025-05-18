import React, { useEffect, useState } from 'react';
import { BsTicketPerforated } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postBooking } from '../../services/booking';
import { FaSyncAlt } from 'react-icons/fa';

const PaymentSidebar = ({
    agreed,
    countAdult,
    countChildren,
    full_name,
    email,
    phone_number,
    address,
    paymentMethod
}) => {
    const location = useLocation();
    const { item, startDate, endDate } = location.state || {};
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // Hàm chuyển chuỗi giá tiền sang số
    const cleanPrice = (priceStr) => {
        if (!priceStr) return 0;
        return Number(priceStr.replace(/[^0-9]/g, '')) || 0;
    };

    const priceAdult = cleanPrice(item?.price_adult);
    const priceChild = cleanPrice(item?.price_child);

    const total = countAdult * priceAdult + countChildren * priceChild;
    const total_quality = countAdult + countChildren;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!full_name || !email || !phone_number || !address) {
            toast.warning("Vui lòng nhập đầy đủ thông tin liên hệ");
            return;
        }

        const isValidPhone = /^0\d{9}$/.test(phone_number) && !/^(\d)\1{9}$/.test(phone_number);
        if (!isValidPhone) {
            toast.error('Số điện thoại không hợp lệ!');
            return;
        }

        if (countAdult === 0 && countChildren === 0) {
            toast.warning("Vui lòng chọn ít nhất một vé người lớn hoặc trẻ em");
            return;
        }

        if (!paymentMethod) {
            toast.warning("Vui lòng chọn phương thức thanh toán");
            return;
        }

        try {
            const tour_id = localStorage.getItem('tour_id');
            const user_id = localStorage.getItem('user_id');
            const data = {
                tour_id: tour_id,
                user_id: user_id,
                num_adults: countAdult,
                num_children: countChildren,
                total_quality: total_quality,
                total_price: total,
                booking_status: "PENDING",
                payment_method: paymentMethod,
                full_name: full_name,
                email: email,
                address: address,
                phone_number: phone_number
            };

            console.log("Sending data:", data);
            setLoading(true);
            const res = await postBooking(data);
            console.log("res", res);

            if (res.status === 200) {
                const { paymentUrl } = res.data;
                if (paymentMethod === "VNPAY" && paymentUrl) {
                    window.location.href = paymentUrl;
                    return;
                }

                // Lấy mảng hiện tại từ localStorage, hoặc tạo mới mảng rỗng
                const bookedTours = JSON.parse(localStorage.getItem('booked_tours') || '[]');
                // Thêm tour_id mới vào mảng (có thể trùng lặp)
                bookedTours.push(tour_id);
                // Lưu lại mảng vào localStorage
                localStorage.setItem('booked_tours', JSON.stringify(bookedTours));

                setTimeout(() => {
                    toast.success('Đặt tour thành công!');
                    navigate("/tourbooking");
                    window.scrollTo(0, 0);
                }, 1000);
            } else {
                setTimeout(() => {
                    toast.warning('Đặt tour không thành công!');
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đặt tour!');
            setLoading(false);
        }
    };

    return (
        <div className='pt-10'>
            <div className='w-full h-auto dark:bg-[#101828] dark:text-white border border-gray-200 p-10 rounded-lg shadow-xl bg-white'>
                <div className='space-y-4'>
                    <p className='text-xl font-bold'>{item?.title}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày khởi hành:</p>
                            <p className="text-lg ">{startDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold w-36">Ngày kết thúc:</p>
                            <p className="text-lg ">{endDate}</p>
                        </div>
                    </div>

                    <hr className='border-gray-400 ' />

                    <div className='flex flex-col space-y-6'>
                        <div className='flex justify-between text-lg'>
                            <p>Người lớn</p>
                            <p className='font-semibold'>{countAdult} x {priceAdult.toLocaleString()} VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Trẻ Em</p>
                            <p className='font-semibold'>{countChildren} x {priceChild.toLocaleString()} VND</p>
                        </div>
                        <div className='flex justify-between text-lg'>
                            <p>Giảm giá</p>
                            <p className='font-semibold'>0 VNĐ</p>
                        </div>
                    </div>

                    <hr className='border-gray-400 ' />
                    <div className='flex items-center gap-5'>
                        <input
                            type="text"
                            placeholder='Mã giảm giá'
                            className='p-2 border border-gray-300 rounded-lg'
                        />
                        <button className='p-2 px-4 text-lg font-normal text-white bg-orange-500 rounded-lg'>
                            Áp dụng
                        </button>
                    </div>

                    <hr className='border-gray-400 ' />
                    <div className='flex justify-between'>
                        <p className='text-xl font-semibold text-red-500'>Tổng cộng:</p>
                        <p className='text-xl font-bold text-red-500'>{total.toLocaleString()} VND</p>
                    </div>

                    <div className="relative">
                        <button
                            className={`w-full p-2 text-lg font-semibold text-white rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500'}`}
                            disabled={!agreed || loading}
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaSyncAlt className="animate-spin" />
                                </div>
                            ) : (
                                "Đặt Ngay"
                            )}
                        </button>

                        {!agreed && (
                            <div className="absolute inset-0 bg-white rounded-lg opacity-50 cursor-not-allowed"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSidebar;
