import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiEyeSlash, PiEye } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaSyncAlt } from 'react-icons/fa';
import LoginImg from '../../../assets/Travel/Login.png';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar/Navbar';
import { loginApi } from '../../../services/authApi';
import { setToken, setRole } from '../../../services/authServices';

const Login = () => {
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
        const query = new URLSearchParams(location.search); //url giúp đọc giá trị
        if (query.get('error')) {
            toast.error('Đăng nhập Google/Facebook thất bại. Vui lòng thử lại.');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = Validation(user_name, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setLoading(true);
                const res = await loginApi(user_name, password);
                if (res.data && res.data.token) {
                    setToken(res.data.token);
                    localStorage.setItem("user_id", res.data.user_id);
                    setRole(res.data.role_id);
                    const role = Number(res.data.role_id);
                    if (role === 1) {
                        setTimeout(() => {
                            toast.success("Đăng nhập thành công!");
                            navigate("/");
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            toast.success("Đăng nhập admin thành công!");
                            navigate('/admin');
                        }, 1500);
                    }
                }
            } catch (error) {
                toast.error("Tên đăng nhập hoặc mật khẩu không đúng");
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    const Validation = (user_name, password) => {
        const newErrors = {};
        if (!user_name) {
            toast.warning('Vui lòng nhập tên của bạn');
            newErrors.user_name = "Vui lòng nhập tên của bạn";
        }
        if (!password) {
            toast.warning('Vui lòng nhập password');
            newErrors.password = "Vui lòng nhập password";
        } else if (password.length < 6) {
            toast.warning('Mật khẩu ít nhất có 6 ký tự');
            newErrors.password = "Mật khẩu ít nhất có 6 ký tự";
        }
        return newErrors;
    };

    return (
        <>
            <Navbar />
            <div className='pt-[150px] mb-6 px-4 dark:bg-[#101828] dark:text-white'>
                <section className='flex flex-col-reverse lg:flex-row items-center gap-10 w-full max-w-[1200px] mx-auto'>
                    <div className='w-full lg:w-2/5'>
                        <img className='w-full object-cover max-h-[400px] md:max-h-[500px]' src={LoginImg} alt="Login" />
                    </div>
                    <div className='w-full lg:w-3/5'>
                        <div className='max-w-full text-left'>
                            <h1 className='text-xl font-bold text-black sm:text-2xl dark:text-white'>Đăng nhập hoặc tạo tài khoản</h1>
                            <p className='mt-2 text-sm text-gray-500 sm:text-base'>Bạn có thể đăng nhập tài khoản của mình để sử dụng dịch vụ của chúng tôi.</p>
                        </div>
                        <form onSubmit={handleSubmit} className='mt-3 w-full max-w-[500px]'>
                            <label className='block mb-2 text-sm text-gray-500 dark:text-white'>Tên tài khoản</label>
                            <input
                                type="text"
                                value={user_name}
                                onChange={(e) => setUserName(e.target.value)}
                                className='p-3 w-full dark:text-[#101828] border border-gray-400 rounded-lg'
                                placeholder='Tên của bạn...'
                            />
                            {errors.user_name && <div className='mt-2 text-sm text-rose-500'>{errors.user_name}</div>}

                            <label className='block mt-4 mb-2 text-sm text-gray-500 dark:text-white'>Mật khẩu</label>
                            <div className='relative'>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='p-3 w-full dark:text-[#101828] border border-gray-400 rounded-lg'
                                    placeholder='Mật khẩu...'
                                />
                                <div className='absolute cursor-pointer top-3 right-3'>
                                    {isShowPassword ? (
                                        <PiEye className='w-5 h-5 dark:text-[#101828]' onClick={() => setIsShowPassword(false)} />
                                    ) : (
                                        <PiEyeSlash className='w-5 h-5 dark:text-[#101828]' onClick={() => setIsShowPassword(true)} />
                                    )}
                                </div>
                            </div>
                            {errors?.password && <div className='mt-2 text-sm text-rose-500'>{errors.password}</div>}

                            <button
                                type='submit'
                                disabled={loading}
                                className='flex items-center justify-center w-full gap-2 p-3 mt-6 text-white transition-all rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary'
                            >
                                {loading ? (
                                    <FaSyncAlt className='w-5 h-5 animate-spin' />
                                ) : (
                                    "Đăng nhập"
                                )}
                            </button>

                            <Link
                                to="/forgot-password"
                                onClick={() => window.scrollTo(0, 0)}
                                className='block mt-3 text-sm text-right text-blue-600'
                            >
                                Quên mật khẩu?
                            </Link>
                        </form>

                        <div className='grid grid-cols-3 items-center gap-2 max-w-[500px] mt-5 text-gray-500'>
                            <hr className='border-gray-400' />
                            <p className='text-sm text-center'>Hoặc</p>
                            <hr className='border-gray-400' />
                        </div>

                        <div className='flex flex-col gap-4 mt-4 w-full max-w-[500px]'>
                            <a
                                href='http://localhost:8088/oauth2/authorization/google'
                                className='flex items-center justify-center gap-3 p-3 border rounded-xl bg-white dark:text-[#101828] font-medium hover:scale-[1.01] transition-transform'
                            >
                                <FcGoogle className='w-6 h-6' />
                                Đăng nhập với Google
                            </a>
                            <a
                                href='#!'
                                className='flex items-center justify-center gap-3 p-3 border rounded-xl bg-white dark:text-[#101828] font-medium hover:scale-[1.01] transition-transform'
                            >
                                <FaFacebookF className='w-6 h-6 text-blue-700' />
                                Đăng nhập với Facebook
                            </a>
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between items-center mt-6 text-sm max-w-[500px]'>
                            <p className='mb-2 text-base text-center sm:text-left sm:mb-0'>Nếu bạn chưa có tài khoản? hãy đăng ký</p>
                            <Link
                                onClick={() => window.scrollTo(0, 0)}
                                to="/signup"
                                className='px-5 py-2 text-white rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary'
                            >
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Login;
