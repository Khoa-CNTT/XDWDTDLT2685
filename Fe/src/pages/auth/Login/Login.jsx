import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiEyeSlash, PiEye } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import LoginImg from '../../../assets/Travel/Login.png';
import { toast } from 'react-toastify'
import Navbar from '../../../components/Navbar/Navbar';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [errors, setErrors] = useState({}); // Khai báo errors để tránh lỗi
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = Validation(email, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:4000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) throw new Error("Tài khoản không tồn tại");

                toast.success("Đăng nhập thành công!");
                navigate("/");
            } catch (error) {
                toast.error("Đăng nhập thất bại");
                console.log(error);
            }
        }
    };
    const Validation = (email, password) => {
        const newErors = {};
        if (!email) {
            toast.warning('Vui lòng nhập email');
            newErors.email = "Vui lòng nhập email";
        } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
            toast.warning('Email không hợp lệ!');
            newErors.email = "Email không hợp lệ";
        }

        if (!password) {
            newErors.password = "Vui lòng nhập password";
            toast.warning('Vui lòng nhập password');
        } else if (password.length < 6) {
            newErors.password = "Mật khẩu ít nhất có 6 ký tự";
            toast.warning('Mật khẩu ít nhất có 6 ký tự');
        }
        return newErors;
    }

    return (
        <>
            <Navbar />
            <div className='pt-[110px] dark:bg-[#101828] dark:text-white '>
                <section className='flex container  items-center sm:flex-row flex-col sm:h-[500px] md:h-[700px] gap-10 w-full '>
                    <div className='w-2/5'>
                        <img className='object-cover h-[430px]' src={LoginImg} alt="Login" />
                    </div>
                    <div className='w-1/2 '>
                        <div className='max-w-[900px] text-left '>
                            <h1 className='text-2xl font-bold text-black dark:text-white '>Đăng nhập hoặc tạo tài khoản</h1>
                            <p className='mt-2 text-gray-500 -text-lg max-w-[600px]'>Bạn có thể đăng nhập tài khoản của mình để sử dụng dịch vụ của chúng tôi.</p>
                        </div>
                        <form onSubmit={handleSubmit} className='items-center mt-3'>
                            <label className='flex flex-col mb-2 text-gray-500 dark:text-white'>Email</label>
                            <input type="email" name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='p-3 w-full dark:text-[#101828] max-w-[500px] h-auto mx-auto border border-gray-400 rounded-lg'
                                placeholder='Email của bạn...'
                            />
                            {errors.email && <div className='mt-2 text-sm text-rose-500'>{errors.email}</div>}
                            <div className='relative mt-3'>
                                <label className='flex flex-col mb-2 text-gray-500 dark:text-white '>Mật Khẩu</label>
                                <input type={isShowPassword ? "text" : "password"} name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='p-3 w-full dark:text-[#101828] max-w-[500px] h-auto mx-auto border border-gray-400 rounded-lg'
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
                            <div className='mt-6'>
                                <button className='w-full p-3 max-w-[500px] text-white transition-all rounded-lg duration-600 bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:bg-primary'
                                >Đăng nhập</button>
                            </div>
                            <p className='mt-3 font-medium cursor-pointer text-right text-blue-600 text-leftg max-w-[500px]'>Quên mật khẩu?</p>
                        </form>
                        <div className='grid items-center max-w-[500px] justify-center grid-cols-3 p-5 text-gray-500 '>
                            <hr className='-mr-10 border-gray-400' />
                            <p className='text-center'>Hoặc</p>
                            <hr className='-ml-10 border-gray-400' />
                        </div>
                        <div className='flex flex-col gap-5 '>
                            <a href='#!' className=' flex items-center dark:text-[#101828] justify-center gap-2 p-3 border max-w-[500px] rounded-xl bg-white cursor-pointer font-medium active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out hover:transition-all'>
                                <FcGoogle className='w-8 h-8 ' />
                                Login with Google
                            </a>
                            <a href='#!' className=' flex items-center dark:text-[#101828] justify-center gap-2 p-3 border max-w-[500px] rounded-xl bg-white cursor-pointer font-medium active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out hover:transition-all'>
                                <FaFacebookF className='w-8 h-8 text-blue-700' />
                                Login with Facebook
                            </a>

                        </div>
                        <div className='flex items-center justify-between mt-5 text-sm font-medium max-w-[500px]'>
                            <p className='text-lg font-normal'>Nếu bạn chưa có tài khoản? hãy đăng ký</p>
                            <Link to="/signup" className='px-5 py-2 text-white transition-all rounded-full duration-600 bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:bg-primary'>Đăng ký</Link>
                        </div>
                    </div>
                </section>

            </div>
        </>

    );
};

export default Login;
