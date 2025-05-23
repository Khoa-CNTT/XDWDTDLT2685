import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setToken, setRole } from '../../../services/authServices';

const RedirectPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); //useLocation: Lấy query params từ URL.


   useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const user_name = query.get('user_name');
    const email = query.get('email');
    const role = query.get('roleId');
    const userId = query.get('userId');

    if (token && user_name) {
        setToken(token);
        localStorage.setItem('user_name', user_name);
        if (email) localStorage.setItem('email', email);
        if (userId && userId !== 'null' && !isNaN(userId)) {
            localStorage.setItem('user_id', userId);
        }
        // console.log('userId:', userId);
        // console.log('user_name:', user_name);
        // console.log('email:', email);
        // console.log('roleId:', role);

        const roleId = role?.toUpperCase() === 'ADMIN' ? '2' : '1';
        setRole(roleId);
        localStorage.setItem('role_id', roleId);

        toast.success(`Đăng nhập ${roleId === '2' ? 'admin' : 'thành công'}!`);
        navigate(roleId === '2' ? '/admin' : '/', { replace: true });
    } else {
        toast.error('Đăng nhập thất bại: Thiếu thông tin xác thực');
        navigate('/login', { replace: true });
    }
}, [location, navigate]);

    return <p>Đang xử lý đăng nhập...</p>;
};

export default RedirectPage;