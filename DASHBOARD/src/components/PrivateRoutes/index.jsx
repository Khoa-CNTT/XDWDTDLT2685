import { Navigate, Outlet } from "react-router-dom";
import LayoutDefault from "../../layout/LayoutDefaut";

function PrivateRoutes() {
    const token = localStorage.getItem("token"); // Kiểm tra token từ localStorage

    // Nếu có token, render LayoutDefault và các route con
    if (token) {
        return (
            <LayoutDefault>
                <Outlet /> {/* Render các route con */}
            </LayoutDefault>
        );
    }

    // Nếu không có token, chuyển hướng đến trang đăng nhập
    return (
        <Navigate
            to="/login"
            replace
        />
    );
}

export default PrivateRoutes;
