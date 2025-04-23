import React, { useState, useEffect } from 'react';

import HeaderImg from '../components/HeaderImg/HeaderImg';
import PaymentTour from '../components/Payment/PaymentTour';

const Payment = () => {
    return (
        <div className='dark:bg-[#101828] dark:text-white'>
            <HeaderImg title="Đặt Tour" currenPage="Đặt Tour" />
            <PaymentTour />
        </div>
    );
};

export default Payment;
