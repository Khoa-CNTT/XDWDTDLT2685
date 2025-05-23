import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiEyeSlash, PiEye } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import LoginImg from '../../../assets/Travel/Login.png';
import { toast } from 'react-toastify'
import Navbar from '../../../components/Navbar/Navbar';
import { signupApi } from '../../../services/authApi';
import { FaSyncAlt } from "react-icons/fa";

const Signup = () => {
    const [user_name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = Validation(user_name, email, password, passwordConfirm);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setLoading(true)
                const res = await signupApi({
                    user_name: user_name.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    confirm_password: passwordConfirm.trim(),
                    roleId: 1
                });
                if (res.data) {
                    setTimeout(() => {
                        toast.success("Đăng ký thành công");
                        navigate("/login");
                    }, 1500);
                }
            } catch (error) {
                console.error("Lỗi:", error.response?.data || error.message);
                toast.error("Tên hoặc Email của bạn đã tồn tại");
                setLoading(false)
            }

        }
    };
    const Validation = (user_name, email, password, passwordConfirm) => {
        const newErrors = {};
        if (!user_name) {
            toast.warning('Vui lòng nhập tên của bạn');
            newErrors.user_name = "Vui lòng nhập tên của bạn";
        }
        if (!email) {
            toast.warning('Vui lòng nhập email');
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
            toast.warning('Email không hợp lệ!');
            newErrors.email = "Email không hợp lệ";
        }

        if (!password) {
            newErrors.password = "Vui lòng nhập password";
            toast.warning('Vui lòng nhập password');
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu ít nhất có 6 ký tự";
            toast.warning('Mật khẩu ít nhất có 6 ký tự');
        }
        if (!passwordConfirm) {
            newErrors.passwordConfirm = "Vui lòng nhập lại password";
            toast.warning("Vui lòng nhập lại password");
        } else if (passwordConfirm !== password) {
            newErrors.passwordConfirm = "Mật khẩu không khớp";
            toast.warning("Mật khẩu không khớp");
        }
        return newErrors;
    };

    return (
        <>
            <Navbar />
            <div className='pt-[140px] dark:bg-[#101828] mb-4 dark:text-white'>
                <section className="container flex flex-col items-center w-full gap-5 px-4 md:flex-row sm:px-6 md:px-10 lg:px-20">
                    <div className="flex justify-center w-full md:w-1/2">
                        <img
                            className="object-cover h-[200px] sm:h-[300px] md:h-[450px] w-full max-w-xs sm:max-w-sm md:max-w-full"
                            src={LoginImg}
                            alt="Login"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="max-w-full sm:max-w-[500px] mx-auto text-left">
                            <h1 className="text-xl font-bold text-black sm:text-2xl dark:text-white">Đăng ký</h1>
                            <p className="mt-2 text-sm text-gray-500 sm:text-base dark:text-gray-300">
                                Bạn có thể đăng nhập tài khoản của mình để sử dụng dịch vụ của chúng tôi.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-3 max-w-full sm:max-w-[500px] mx-auto">
                            {/* Input: Họ và tên */}
                            <div className="mt-3">
                                <label className="block mb-2 text-sm text-gray-500 dark:text-white">Tên Tài Khoản</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    value={user_name}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="p-3 w-full dark:text-[#101828] border border-gray-400 rounded-lg"
                                    placeholder="Tên của bạn..."
                                />
                                {errors.user_name && <p className="mt-2 text-sm text-rose-500">{errors.user_name}</p>}
                            </div>

                            {/* Input: Email */}
                            <div className="mt-3">
                                <label className="block mb-2 text-sm text-gray-500 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="p-3 w-full dark:text-[#101828] border border-gray-400 rounded-lg"
                                    placeholder="Email của bạn..."
                                />
                                {errors.email && <p className="mt-2 text-sm text-rose-500">{errors.email}</p>}
                            </div>

                            {/* Input: Password */}
                            <div className="relative mt-3">
                                <label className="block mb-2 text-sm text-gray-500 dark:text-white">Mật khẩu</label>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-3 w-full dark:text-[#101828] border border-gray-400 rounded-lg"
                                    placeholder="Mật khẩu..."
                                />
                                {errors.password && <p className="mt-2 text-sm text-rose-500">{errors.password}</p>}
                                <div className="absolute top-[48px] right-4 cursor-pointer">
                                    {isShowPassword ? (
                                        <PiEye className="w-5 h-5" onClick={() => setIsShowPassword(false)} />
                                    ) : (
                                        <PiEyeSlash className="w-5 h-5" onClick={() => setIsShowPassword(true)} />
                                    )}
                                </div>
                            </div>

                            {/* Input: Confirm Password */}
                            <div className="relative mt-3">
                                <label className="block mb-2 text-sm text-gray-500 dark:text-white">Xác nhận mật khẩu</label>
                                <input
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    value={passwordConfirm}
                                    name="confirmPassword"
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    className="p-3 w-full dark:text-[#101828] border border-gray-400 rounded-lg"
                                    placeholder="Nhập lại mật khẩu..."
                                />
                                {errors.passwordConfirm && <p className="mt-2 text-sm text-rose-500">{errors.passwordConfirm}</p>}
                                <div className="absolute top-[48px] right-4 cursor-pointer">
                                    {isShowConfirmPassword ? (
                                        <PiEye className="w-5 h-5" onClick={() => setIsShowConfirmPassword(false)} />
                                    ) : (
                                        <PiEyeSlash className="w-5 h-5" onClick={() => setIsShowConfirmPassword(true)} />
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center justify-center w-full gap-2 p-3 text-white transition-all rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                                >
                                    {loading ? <FaSyncAlt className="w-5 h-5 animate-spin" /> : "Đăng ký"}
                                </button>
                            </div>
                        </form>

                        {/* Hoặc */}
                        <div className="grid items-center justify-center grid-cols-3 my-6 text-gray-500 max-w-[500px] mx-auto">
                            <hr className="border-gray-400" />
                            <p className="text-sm text-center">Hoặc</p>
                            <hr className="border-gray-400" />
                        </div>

                        {/* Link Đăng nhập */}
                        <div className="flex  ml-[20px]">
                            <Link
                                to="/login"
                                onClick={() => window.scrollTo(0, 0)}
                                className="px-5 py-2 text-white rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Signup;
