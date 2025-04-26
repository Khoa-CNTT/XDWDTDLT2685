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
    return (
        <div className='container flex gap-10 '>
            {/* bên phải */}
            <div className='w-3/5'>
                <PaymentInformation />
                <PaymentQuality
                    countAdult={countAdult}
                    setCountAdult={setCountAdult}
                    countChildren={countChildren}
                    setCountChildren={setCountChildren} />
                <PaymentCheckbox agreed={agreed} onAgreeChange={setAgreed} />
                <PaymentMethod />
            </div>
            {/* bên trái */}
            <div className='w-2/5'>
                <div className="sticky top-14">
                    <PaymentSidebar
                        agreed={agreed}
                        countAdult={countAdult}
                        countChildren={countChildren}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentTour;