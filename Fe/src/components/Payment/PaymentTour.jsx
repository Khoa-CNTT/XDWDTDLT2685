import React, { useState } from 'react';
import PaymentInformation from './PaymentInformation';
import PaymentQuality from './PaymentQuality';
import PaymentCheckbox from './PaymentCheckbox';
import PaymentMethod from './PaymentMethod';
import PaymentSidebar from './PaymentSidebar';

const PaymentTour = () => {
    const [agreed, setAgreed] = useState(false);
    const [countAdult, setCountAdult] = useState(0);
    const [countChildren, setCountChildren] = useState(0);

    // thông tin người dùng
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    // phương thức thanh toán
    const [paymentMethod, setPaymentMethod] = useState('');

    return (
        <div className='container flex gap-10 '>
            {/* bên phải */}
            <div className='w-3/5'>
                <PaymentInformation
                    full_name={full_name} setFullName={setFullName}
                    email={email} setEmail={setEmail}
                    phone_number={phone_number} setPhoneNumber={setPhoneNumber}
                    address={address} setAddress={setAddress}
                />
                <PaymentQuality
                    countAdult={countAdult}
                    setCountAdult={setCountAdult}
                    countChildren={countChildren}
                    setCountChildren={setCountChildren} />
                <PaymentCheckbox agreed={agreed} onAgreeChange={setAgreed} />
                <PaymentMethod setPaymentMethod={setPaymentMethod} />
            </div>
            {/* bên trái */}
            <div className='w-2/5'>
                <div className="sticky top-14">
                    <PaymentSidebar
                        agreed={agreed}
                        countAdult={countAdult}
                        countChildren={countChildren}
                        full_name={full_name}
                        email={email}
                        phone_number={phone_number}
                        address={address}
                        paymentMethod={paymentMethod}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentTour;