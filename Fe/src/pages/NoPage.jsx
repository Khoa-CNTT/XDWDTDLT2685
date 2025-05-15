import React from 'react';
import Logo2 from '../assets/Travel/Logo2.png';
import { useNavigate } from 'react-router-dom';

const NoPage = ({ onReset, redirectTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (redirectTo) {
            navigate(redirectTo); // nếu có redirectTo thì chuyển hướng
        } else if (onReset) {
            onReset(); // nếu có hàm onReset thì gọi
        }
    };

    return (
        <div>
            <div className='w-[700px] ml-[50px] mx-auto mt-5 border border-gray-200 rounded-2xl shadow-xl bg-white p-6 text-center'>
                <img src={Logo2} alt="Logo" className='w-[400px] h-[400px] mx-auto ' />
                <p className='mb-2 text-2xl font-semibold text-gray-800'>
                    Rất tiếc, GoViet không tìm thấy kết quả cho bạn
                </p>
                <p className='mb-4 text-lg text-gray-500'>
                    Nhấn OK để bắt đầu tìm kiếm mới.
                </p>
                <button
                    className='px-6 py-2 mt-2 text-white transition-all rounded-full bg-primary hover:bg-blue-600'
                    onClick={handleClick}
                >
                    OK →
                </button>
            </div>
        </div>
    );
};

export default NoPage;
