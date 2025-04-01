import React from 'react';
import ContactUs from '../components/Contact/ContactUs';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactLocation from '../components/Contact/ContactLocation';
import HeaderImg from '../components/HeaderImg/HeaderImg';

const Contact = () => {
    return (
        <div className='dark:bg-[#101828] dark:text-white' >
            <HeaderImg title="Liên Hệ" currenPage="Liên hệ" />
            <ContactUs />
            <ContactInfo />
            <ContactLocation />
        </div>
    );
};

export default Contact;