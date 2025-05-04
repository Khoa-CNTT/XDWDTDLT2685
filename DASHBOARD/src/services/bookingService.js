import { get } from "../util/requestserver";

export const getDataBookingTour = async () => {
    const result = await get("bookings");
    return result;
};
export const getDataBookingTourById = async (id) => {
    const result = await get(`bookings/${id}`);
    return result;
};
