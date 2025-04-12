import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../pages/Layout'
import About from '../pages/About'
import Home from '../pages/Home'
import NoPage from '../pages/NoPage'
import Popular from '../pages/Popular';
import BlogsDetail from '../pages/BlogsDetail'
import Login from '../pages/auth/Login/Login';
import Signup from '../pages/auth/signup/Signup';
import Contact from '../pages/Contact';
import Tours from '../pages/Tours';
import TourGuide from '../pages/TourGuide';
import Profile from '../pages/Profile';
import Payment from '../pages/Payment';
import TourBooking from '../pages/TourBooking';
import Location from '../pages/Location';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />}></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/popular' element={<Popular />}></Route>
                        <Route path='/blog/:id' element={<BlogsDetail />}></Route>
                        <Route path='/location' element={<Location />}></Route>
                        <Route path='/contact' element={<Contact />}></Route>
                        <Route path='/tour' element={<Tours />}></Route>
                        <Route path='/tourguide' element={<TourGuide />}></Route>
                        <Route path='/profile' element={<Profile />}></Route>
                        <Route path='/payment' element={<PrivateRoute><Payment /></PrivateRoute>}></Route>
                        <Route path='/tourbooking' element={<TourBooking />}></Route>
                        <Route path='*' element={<NoPage />}></Route>

                    </Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;