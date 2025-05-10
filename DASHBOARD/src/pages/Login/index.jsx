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

    const validate = (user_name, password) => {
        const newErrors = {};
        if (!user_name) newErrors.user_name = "Vui lòng nhập tên của bạn";
        // Optional: Add format validation (e.g., alphanumeric or email)
        else if (!/^[a-zA-Z0-9_]+$/.test(user_name)) {
            newErrors.user_name = "Tên đăng nhập chỉ chứa chữ, số hoặc dấu _";
        }
        if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
        else if (password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate(user_name, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Thiếu thông tin",
                text: Object.values(newErrors)[0],
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
            });
            return;
        }

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
            } else {
                throw new Error("No token received");
            }
        } catch (error) {
            setLoading(false);
            let errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng";
            if (error.response?.status === 400) {
                errorMessage = error.response?.data?.message || "Yêu cầu không hợp lệ. Vui lòng kiểm tra thông tin đăng nhập.";
                // Check for lockout message (adjust based on actual server response)
                if (error.response?.data?.message?.includes("lock")) {
                    errorMessage = "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.";
                }
            } else if (error.response?.status === 403) {
                errorMessage = "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.";
            }
            Swal.fire({
                icon: "error",
                title: "Đăng nhập thất bại",
                text: errorMessage,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/");
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
                        {errors.user_name && <p className="mt-1 text-sm text-red-500">{errors.user_name}</p>}
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
