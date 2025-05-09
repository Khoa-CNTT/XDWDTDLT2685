import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children, route }) => {
    // Kiểm tra trạng thái đăng nhập từ Local localStorage
    const isAuthenticated = localStorage.getItem("token");
    const hasShownToast = useRef(false); // đánh dấu đã hiển thị toast hay chưa
    const roleId = parseInt(localStorage.getItem("role")); // thêm dòng này

    useEffect(() => {
        if (!isAuthenticated && !hasShownToast.current) {
            toast.warn("Bạn cần đăng nhập để thực hiện");
            hasShownToast.current = true;
        }
    }, [isAuthenticated]);

    // Chặn admin truy cập các route dành cho user
    if (isAuthenticated) {
        if (roleId === 2) {
            toast.error("Admin không được phép truy cập trang này");
            return <Navigate to="/admin" replace />;
        }
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
