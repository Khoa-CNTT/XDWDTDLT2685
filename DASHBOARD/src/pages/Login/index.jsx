/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import icons from "../../util/icon";

import InputPassword from "../../components/InputPass";
import { login } from "../../services/adminService";

const { FaUserAlt } = icons;

function Login() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [user_name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Validation = (user_name, password) => {
        const newErrors = {};
        if (!user_name) {
            newErrors.user_name = "Vui lòng nhập tên của bạn";
            Swal.fire({
                icon: "warning",
                title: "Thiếu thông tin",
                text: "Vui lòng nhập tên của bạn",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
            });
        }
        if (!password) {
            newErrors.password = "Vui lòng nhập password";
            Swal.fire({
                icon: "warning",
                title: "Thiếu thông tin",
                text: "Vui lòng nhập password",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
            });
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu ít nhất có 6 ký tự";
            Swal.fire({
                icon: "warning",
                title: "Lỗi mật khẩu",
                text: "Mật khẩu ít nhất có 6 ký tự",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
            });
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = Validation(user_name, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setLoading(true);
                const res = await login(user_name, password);
                if (res.data?.token) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user_id", res.data.user_id);

                    Swal.fire({
                        icon: "success",
                        title: "Đăng nhập thành công!",
                        showConfirmButton: false,
                        timer: 1500,
                        position: "top-end",
                    });
                    setTimeout(() => navigate("/"), 1600);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Đăng nhập thất bại",
                    text: "Tên đăng nhập hoặc mật khẩu không đúng",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    position: "top-end",
                });
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/");
    }, [navigate]);

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md rounded-lg bg-slate-950 p-8 shadow-2xl shadow-gray-500/30 backdrop-blur-md">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <h1 className="text-center text-3xl font-bold text-[#019fb5]">ĐĂNG NHẬP</h1>

                    <div className="relative">
                        <input
                            type="text"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Tên đăng nhập"
                            className={`h-12 w-full rounded-full border-2 ${
                                errors.user_name ? "border-red-500" : "border-[#019fb5]"
                            } bg-transparent px-5 pr-12 text-lg text-white placeholder-[#019fb5] focus:outline-none`}
                        />
                        <FaUserAlt className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#019fb5]" />
                    </div>

                    <InputPassword
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`h-12 w-full cursor-pointer rounded-full font-semibold text-white transition duration-300 ${
                            loading ? "bg-gray-600" : "bg-[#019fb5] hover:bg-[#01484f]"
                        }`}
                    >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
