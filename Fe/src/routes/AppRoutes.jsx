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
import RedirectPage from '../pages/auth/Login/RedirectPage';
import AdminLayout from '../layout/AdminLayout';
import TourBookingDetail from '../components/TourBookingDetail/TourBookingDetail';
import VnPayCallback from '../components/Payment/VnpayCallback';
import SendMail from '../components/Fogotpassword/SendMail';
import ChangePassword from '../components/Fogotpassword/ChangePassword';
import VerifyCode from '../components/Fogotpassword/VerifyCode';

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
                            <PrivateRoute role={1}>
                                <Profile />
                            </PrivateRoute>}>
                        </Route>
                        <Route path='/payment' element={
                            <PrivateRoute role={1}>
                                <Payment />
                            </PrivateRoute>}>
                        </Route>
                        <Route path='/tourbooking' element={<TourBooking />}></Route>
                        <Route path='/changepassword' element={<ProfileChangePassword />}></Route>
                        <Route path='*' element={<NoPage />}></Route>
                        <Route path='/search' element={<Search />}></Route>
                        <Route path='/tourbookingdetail/:id' element={<TourBookingDetail />} />
                        <Route path="/vnpay-payment-callback" element={<VnPayCallback />} />
                        <Route path='/forgot-password' element={<SendMail />} />
                        <Route path='/verify-Code' element={<VerifyCode />} />
                        <Route path='/change-password' element={<ChangePassword />} />

                    </Route>
                    <Route path='/admin' element={
                        <PrivateRoute role={2}>
                            <AdminLayout />

                        </PrivateRoute>}>

                    </Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path="/redirect" element={<RedirectPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;