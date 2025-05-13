import React, { useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { hasRole } from '../services/authServices';

const PrivateRoute = ({ children, role }) => {
    // Kiểm tra trạng thái đăng nhập từ Local localStorage
    const isAuthenticated = localStorage.getItem("token");
    const hasShownToast = useRef(false); // đánh dấu đã hiển thị toast hay chưa
    const roleId = hasRole(role)

    useEffect(() => {
        if (!isAuthenticated && !hasShownToast.current) {
            toast.warn("Bạn cần đăng nhập để thực hiện");
            hasShownToast.current = true;
        }
    }, [isAuthenticated]);

    if(!isAuthenticated) return <Navigate to="/login" replace />;
    if(!roleId) return <Navigate to="/" replace />;
    return(
        <>{children ? children : <Outlet></Outlet>}</>
    );
};

export default PrivateRoute;
