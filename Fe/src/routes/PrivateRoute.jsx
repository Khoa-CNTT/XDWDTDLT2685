import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Kiểm tra trạng thái đăng nhập (ví dụ: từ Local Storage, Context API, Redux)
    const isAuthenticated = localStorage.getItem("token"); // Ví dụ: kiểm tra token

    return isAuthenticated ? (
        children // Nếu đã đăng nhập, render các component con được truyền vào
    ) : (
        <Navigate to="/login" replace /> // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    );
}
export default PrivateRoute