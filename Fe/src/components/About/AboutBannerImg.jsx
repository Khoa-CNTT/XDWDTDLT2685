import React from 'react';
import About1 from '../../assets/Travel/AbouImg1.jpg'
import About2 from '../../assets/Travel/AboutImg2.jpg'
import { GiLaurelCrown } from "react-icons/gi";
import { GiWorld } from "react-icons/gi";


const AboutBannerImg = () => {
    return (
        <div className='pt-20'>
            <div className='container' data-aos="fade-up">
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
                    <div className=''>
                        <img src={About1} className='h-[500px] w-full rounded-2xl' alt="" />
                    </div>
                    <div>
                        <img src={About2} className='h-[500px] w-full rounded-2xl' alt="" />
                    </div>
                    <div className='grid gap-6 md:grid-rows-2'>
                        <div className='flex flex-col items-center justify-center bg-orange-500 rounded-3xl'>
                            <div className='flex items-center justify-center gap-6 mx-auto'>
                                <GiLaurelCrown className='text-white h-14 w-14' />
                                <p className='text-xl font-semibold text-white'>Chúng tôi là công ty
                                    <br />
                                    đạt giải thưởng
                                </p>
                            </div>
                            <div className='mt-4 ml-5 text-white '>
                                <p>Tại Pinnacle Business Solutions cam kết về
                                    <br />
                                    sự xuất sắc và đổi mới đã đạt được
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center bg-primary rounded-3xl'>
                            <div className='flex items-center justify-center gap-6 mx-auto'>
                                <GiWorld className='text-white h-14 w-14' />
                                <p className='text-xl font-semibold text-white'>5000+ Điểm đến du
                                    <br />
                                    lịch nổi tiếng
                                </p>
                            </div>
                            <div className='mt-4 ml-5 text-white '>
                                <p className='max-w-[300px]'>
                                    Đội ngũ chuyên gia của chúng tôi tận tâm phát triển các chiến lược tiên tiến thúc đẩy thành công
                                </p>
                            </div> 
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AboutBannerImg;