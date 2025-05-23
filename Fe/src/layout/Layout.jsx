import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer';
import ChatBox from '../components/Chatbox/ChatBox';
const Layout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <div className="fixed z-50 bottom-4 left-2">
                <ChatBox />
            </div>
        </>
    );
};

export default Layout;