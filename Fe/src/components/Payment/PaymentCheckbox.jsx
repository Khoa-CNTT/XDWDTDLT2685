import React from 'react';

const PaymentCheckbox = ({ agreed, onAgreeChange }) => {
    return (
        <div className='pt-10'>
            <div className='bg-gray-100 p-6 w-full h-[200px] rounded-md'>
                <p className='text-lg text-gray-500'>
                    Bằng cách nhấp chuột vào nút "ĐỒNG Ý" dưới đây, Khách hàng đồng ý rằng các Điều kiện điều khoản này sẽ được áp dụng. Vui lòng đọc kỹ Điều kiện điều khoản trước khi lựa chọn sử dụng dịch vụ của GoViet Tours.
                </p>
                <div className='flex items-center justify-center gap-2 mt-5'>
                    <input
                        checked={agreed}
                        onChange={(e) => onAgreeChange(e.target.checked)}
                        type="checkbox" 
                        className='w-4 h-4' />
                    <p className='text-gray-500 '>
                        Tôi đã đọc và đồng ý với Điều khoản thanh toán
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckbox;