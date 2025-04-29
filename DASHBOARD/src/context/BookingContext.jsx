import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [bookingData, setBookingData] = useState([]);

    return <BookingContext.Provider value={{ bookingData, setBookingData }}>{children}</BookingContext.Provider>;
}

export function useBooking() {
    return useContext(BookingContext);
}
