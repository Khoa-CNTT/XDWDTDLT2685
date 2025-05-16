import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setToken, setRole } from '../../../services/authServices';

const RedirectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        const user_name = query.get('user_name');
        const email = query.get('email');
        const role = query.get('role');

        if (token && user_name && email && role) {
            setToken(token);
            localStorage.setItem('user_name', user_name);
            localStorage.setItem('email', email);
            // Giả sử role_id: USER=1, ADMIN=2
            const roleId = role.toUpperCase() === 'ADMIN' ? '2' : '1';
            setRole(roleId);
            localStorage.setItem('role_id', roleId);
            toast.success(`Đăng nhập ${role.toLowerCase() === 'admin' ? 'admin' : 'thành công'}!`);
            navigate(role.toUpperCase() === 'ADMIN' ? '/admin' : '/', { replace: true });
        } else {
            toast.error('Đăng nhập thất bại: Thiếu thông tin xác thực');
            navigate('/login', { replace: true });
        }
    }, [location, navigate]);

    return <p>Đang xử lý đăng nhập...</p>;
};

export default RedirectPage;