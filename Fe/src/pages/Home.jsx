import React from 'react';
import MainVD from '../assets/Video/main.mp4';
import Hero from '../components/Hero/Hero';
import Places from '../components/Places/Places';
import Banner1 from '../assets/Travel/Banner.png'
import BannerImg from '../components/BannerImg/BannerImg';
import Banner from '../components/Banner/Banner';
import Evaluate from '../components/Evaluate/Evaluate';
import Popular from './Popular';
import ChatBoxImg from '../components/Chatbox/ChatBoxImg';

const Home = () => {
    return (
        <div className="relative">
            <div className="h-[700px] relative w-full">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute right-0 top-0 w-full h-[700px] object-cover z-[-1]"
                >
                    <source src={MainVD} type="video/mp4" />
                </video>
                <Hero />
            </div>
            <Places />
            <BannerImg img={Banner1} />
            <Popular />
            <Banner />
            <Evaluate />

            {/* Chat Box fixed bottom left */}
            <div className="fixed z-50 bottom-4 left-2">
                <ChatBoxImg />
            </div>
        </div>
    );
};

export default Home;
