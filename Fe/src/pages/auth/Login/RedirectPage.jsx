import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const RedirectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        const user_name = query.get('user_name');
        const email = query.get('email');
        

        if (token && user_name && email) {
            localStorage.setItem("token", token);
            localStorage.setItem("user_name", user_name);
            localStorage.setItem("email", email);
            toast.success("Đăng nhập Google thành công");
            navigate("/");
        } else {
            toast.error("Đăng nhập Google thất bại");
            navigate("/login");
        }
    }, [location]);

    return <p>Đang xử lý đăng nhập Google...</p>;
};

export default RedirectPage;
