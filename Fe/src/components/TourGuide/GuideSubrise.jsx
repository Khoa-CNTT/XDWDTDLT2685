import React from 'react';
import Button from '../Button/Button';

const GuideSubrise = () => {
    return (
        <div className='pt-20 dark:bg-[#101828] dark:text-white'>
            <div className='flex '>
                {/* Bên trái */}
                <div className='w-1/2 bg-blue-300 h-[500px] p-8 text-white'>
                    <div data-aos="fade-right">
                        <h2 className="mb-4 text-3xl font-semibold leading-snug md:text-4xl">
                            Đăng Ký Nhận Bản Tin Của<br />
                            Chúng Tôi Để Nhận Thêm<br />
                            Nhiều Ưu Đãi & Mẹo
                        </h2>
                        <p className="mb-6 text-xl">
                            Website <span className="bg-orange-400 px-2  py-0.5 rounded-xl font-semibold">34500+</span> trải nghiệm phổ biến nhất mà bạn sẽ nhớ
                        </p>
                        <div className="flex items-center justify-center max-w-[600px] bg-white rounded-full overflow-hidden">
                            <input
                                type="email"
                                placeholder="Email của bạn..."
                                className="flex-1 px-5 h-[50px] outline-none"
                            />
                            <button className="flex items-center gap-2 h-[40px] px-4 mr-1 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600">
                                Subscribe
                                <span className="text-lg">➤</span>
                            </button>
                        </div>
                        <p className="mt-4 ml-3 text-lg">Không yêu cầu thẻ tín dụng. Không cam kết</p>
                    </div>

                </div>
                {/* Bên phải */}
                <div data-aos="fade-left" className='w-1/2 '>
                    <img
                        className='o w-full h-[500px]'
                        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTpX2lfTAVHCpLV_Y0xnru8K2ADndMi9T2njswm2uiFngwahbfw" alt="" />
                </div>
            </div>
        </div>
    );
};

export default GuideSubrise;