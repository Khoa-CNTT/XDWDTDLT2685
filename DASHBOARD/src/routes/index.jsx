import Admin from "../pages/Admin";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import Customer from "../pages/Users";
import Tour from "../pages/Tour";
import BookingDetail from "../pages/Booking/BookingDetail";
import ShowBookingTour from "../pages/Booking/ShowBooking";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import PrivateRoutes from "../components/PrivateRoutes";
import ChangePass from "../pages/Admin/ChangePass";
import NotFound from "../pages/Error";

export const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "admin",
                children: [
                    { index: true, element: <Admin /> },
                    { path: "change-password", element: <ChangePass /> },
                ],
            },
            { path: "user", element: <Customer /> },
            { path: "tour", element: <Tour /> },
            {
                path: "booking",
                element: <Booking />,
                children: [
                    { index: true, element: <ShowBookingTour /> },
                    { path: ":id", element: <BookingDetail /> },
                ],
            },
            { path: "logout", element: <Logout /> },
            { path: "*", element: <NotFound /> },
        ],
    },
    { path: "*", element: <NotFound /> },
];
