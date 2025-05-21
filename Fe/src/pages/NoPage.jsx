import React from 'react';
import Logo2 from '../assets/Travel/Logo2.png';
import { useNavigate } from 'react-router-dom';

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-[#101828] dark:text-white">
      <div className="w-[800px]  border border-gray-200 rounded-2xl shadow-xl bg-white p-4 text-center">
        <img src={Logo2} alt="Logo" className="w-[400px] h-[400px] mx-auto" />
        <p className="text-2xl font-semibold text-gray-800 ">
          Rất tiếc, GoViet không tìm thấy kết quả cho bạn
        </p>
      </div>
    </div>
  );
};

export default NoPage;
