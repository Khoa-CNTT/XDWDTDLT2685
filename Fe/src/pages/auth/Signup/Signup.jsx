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
                if (res) {
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
    const Validation = (name, email, password, passwordConfirm) => {
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
            <div className='pt-[100px] dark:bg-[#101828] dark:text-white'>
                <section className='flex container items-center sm:flex-row flex-col sm:h-[500px] md:h-[700px] gap-5 w-full'>
                    <div className='w-1/2'>
                        <img className='object-cover h-[450px]' src={LoginImg} alt="Login" />
                    </div>
                    <div className='w-1/2'>
                        <div className='max-w-[900px] text-left'>
                            <h1 className='text-2xl font-bold text-black dark:text-white'>Đăng ký</h1>
                            <p className='mt-2 text-gray-500 -text-lg max-w-[550px]'>Bạn có thể đăng nhập tài khoản của mình để sử dụng dịch vụ của chúng tôi.</p>
                        </div>
                        <form onSubmit={handleSubmit} className='items-center mt-3 '>
                            <div className='mt-3'>
                                <label className='flex flex-col mb-2 text-gray-500 dark:text-white'>Họ và tên</label>
                                <input type='text' name="user_name"
                                    value={user_name}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className='p-3 w-full dark:text-[#101828] max-w-[500px] h-auto mx-auto border border-gray-400 rounded-lg'
                                    placeholder='Tên của bạn...'
                                />
                                {errors.user_name && <div className='mt-2 text-sm text-rose-500'>{errors.user_name}</div>}
                            </div>
                            <div className='mt-3'>
                                <label className='flex flex-col mb-2 text-gray-500 dark:text-white'>Email</label>
                                <input type="email" name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='p-3 dark:text-[#101828] w-full max-w-[500px] h-auto mx-auto border border-gray-400 rounded-lg'
                                    placeholder='Email của bạn...'
                                />
                                {errors.email && <div className='mt-2 text-sm text-rose-500'>{errors.email}</div>}
                            </div>
                            <div className='relative mt-3'>
                                <label className='flex flex-col mb-2 text-gray-500 dark:text-white '>Mật Khẩu</label>
                                <input type={isShowPassword ? "text" : "password"} name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='p-3 dark:text-[#101828] w-full max-w-[500px] h-auto mx-auto border border-gray-400 rounded-lg'
                                    placeholder='Mật khẩu...'
                                />
                                {errors?.password && <div className='mt-2 text-sm text-rose-500'>{errors.password}</div>}
                                <div className='absolute top-[48px] right-[80px] cursor-pointer'>
                                    {isShowPassword ? (
                                        <PiEye className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowPassword(false)} />
                                    ) : (
                                        <PiEyeSlash className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowPassword(true)} />
                                    )}
                                </div>
                            </div>
                            <div className='relative mt-3'>
                                <label className='flex flex-col mb-2 text-gray-500 dark:text-white '>Xác nhận mật khẩu</label>

                                <input value={passwordConfirm} type={isShowConfirmPassword === true ? "text" : "password"} name='confirmPassword'
                                    className='p-3 dark:text-[#101828] w-full max-w-[500px] h-auto mx-auto border border-gray-400 rounded-lg'
                                    placeholder='Nhập lại mật khẩu...'
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                />
                                {errors.passwordConfirm && <div className='pt-2 ml-2 text-sm text-rose-500'>{errors.passwordConfirm}</div>}
                                <div className='absolute top-[48px] right-[80px] cursor-pointer'>
                                    {isShowConfirmPassword ? (
                                        <PiEye className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowConfirmPassword(false)} />
                                    ) : (
                                        <PiEyeSlash className='w-6 h-6 dark:text-[#101828]' onClick={() => setIsShowConfirmPassword(true)} />
                                    )}
                                </div>

                            </div>
                            <div className='mt-6'>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full p-3 max-w-[500px] text-white transition-all rounded-lg duration-600 bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:bg-primary flex items-center justify-center gap-2'
                                >
                                    {loading ? (
                                        <>
                                            <FaSyncAlt className='w-5 h-5 text-white animate-spin' />
                                        </>
                                    ) : (
                                        "Đăng ký"
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className='grid items-center max-w-[500px] justify-center grid-cols-3 p-5 text-gray-500 '>
                            <hr className='-mr-10 border-gray-400' />
                            <p className='text-center'>Hoặc</p>
                            <hr className='-ml-10 border-gray-400' />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex'>
                                <a href="#!" className="p-2 mr-5 border border-gray-400 border-solid rounded-lg">
                                    <FcGoogle className="w-8 h-8" />
                                </a>
                                <a href="#!" className="p-2 mr-5 border border-gray-400 border-solid rounded-lg">
                                    <FaFacebookF className='w-8 h-8 text-blue-700' />
                                </a>
                            </div>
                            <div className='mr-[50px]'>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/login" className='px-5 py-2 text-white transition-all rounded-full duration-600 bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:bg-primary'>Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default Signup;
