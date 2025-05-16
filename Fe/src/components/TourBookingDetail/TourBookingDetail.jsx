import React, { useState, useEffect } from 'react';
import PaymentInformation from '../Payment/PaymentInformation';
import PaymentQuality from '../Payment/PaymentQuality';
import PaymentMethod from '../Payment/PaymentMethod';
import PaymentSidebar from '../Payment/PaymentSidebar';
import HeaderImg from '../HeaderImg/HeaderImg';
import BookingDetailSibar from './BookingDetailSibar';
import { getBookingId } from '../../services/booking';

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};
const TourBookingDetail = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priceAdult, setPriceAdult] = useState(0);
    const [priceChild, setPriceChild] = useState(0);
    const [countAdult, setCountAdult] = useState(0);
    const [countChildren, setCountChildren] = useState(0);


    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [title, setTitle] = useState('');
    const [total_price, setTotalPrice] = useState(0);
    const [bookingStatusLabel, setBookingStatusLabel] = useState('');

    useEffect(() => {
        const fetchBookingDetail = async () => {
            const bookingId = localStorage.getItem("booking_id");
            if (!bookingId) return;

            try {
                const res = await getBookingId(bookingId);
                const data = res.data;

                setTitle(data.title || '');
                setTotalPrice(data.total_price || 0);
                setFullName(data.full_name || '');
                setEmail(data.email || '');
                setAddress(data.address || '');
                setPhoneNumber(data.phone_number || '');
                setCountAdult(data.num_adults || 0);
                setCountChildren(data.num_children || 0);
                setStartDate(data.start_date || '');
                setEndDate(data.end_date || '');
                setPriceAdult(data.price_adult || 0);
                setPriceChild(data.price_child || 0);


                if (data.booking_status === 'PENDING') {
                    setPaymentMethod('Văn phòng');
                    setBookingStatusLabel('Văn phòng');
                } else {
                    setPaymentMethod('VNPAY');
                    setBookingStatusLabel('VNPAY');
                }

            } catch (error) {
                console.error("Lỗi khi lấy chi tiết booking:", error);
            }
        };

        fetchBookingDetail();
    }, []);

    return (
        <>
            <HeaderImg title="Chi tiết tour đã đặt" currenPage="chi tiết tour đã đặt" />
            <div className='pt-5'>
                <div className='container flex gap-10 '>
                    {/* Bên phải */}
                    <div className='w-3/5'>
                        <PaymentInformation
                            full_name={full_name} setFullName={setFullName}
                            email={email} setEmail={setEmail}
                            phone_number={phone_number} setPhoneNumber={setPhoneNumber}
                            address={address} setAddress={setAddress}
                            disabled={true}
                        />
                        <PaymentMethod
                            value={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            disabled={true}
                        />
                    </div>

                    {/* Bên trái */}
                    <div className='w-2/5'>
                        <div className="sticky top-14">
                            <BookingDetailSibar
                                title={title}
                                total_price={total_price}
                                start_date={formatDate(startDate)}
                                end_date={formatDate(endDate)}
                                price_adult={priceAdult}
                                price_child={priceChild}
                                num_adults={countAdult}
                                num_children={countChildren}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourBookingDetail;
