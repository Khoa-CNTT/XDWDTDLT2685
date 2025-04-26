import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import NoPage from '../pages/NoPage'
import Popular from '../pages/Popular';
import BlogsDetail from '../pages/BlogsDetail'
import Login from '../pages/auth/Login/Login';
import Contact from '../pages/Contact';
import Tours from '../pages/Tours';
import TourGuide from '../pages/TourGuide';
import Profile from '../pages/Profile';
import Payment from '../pages/Payment';
import TourBooking from '../pages/TourBooking';
import Location from '../pages/Location';
import PrivateRoute from './PrivateRoute';
import Signup from '../pages/auth/Signup/Signup';
import ProfileChangePassword from '../components/Profile/ProfileChangePassword';
import Layout from '../layout/Layout';
import Search from '../pages/Search';

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />}></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/popular' element={<Popular />}></Route>
                        <Route path='/tours/:id' element={<BlogsDetail />}></Route>
                        <Route path='/location' element={<Location />}></Route>
                        <Route path='/contact' element={<Contact />}></Route>
                        <Route path='/tours' element={<Tours />}></Route>
                        <Route path='/tourguide' element={<TourGuide />}></Route>
                        <Route path='/profile' element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>}>
                        </Route>
                        <Route path='/payment' element={
                            <PrivateRoute>
                                <Payment />
                            </PrivateRoute>}>
                        </Route>
                        <Route path='/tourbooking' element={<TourBooking />}></Route>
                        <Route path='/changepassword' element={<ProfileChangePassword />}></Route>
                        <Route path='*' element={<NoPage />}></Route>
                        <Route path='/search' element={<Search />}></Route>

                    </Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;