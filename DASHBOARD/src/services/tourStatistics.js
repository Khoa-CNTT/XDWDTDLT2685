import { get } from "../util/request";

export const getTourStatistics = async () => {
    const result = await get("destination_statistics");
    return result;
};
export const getTourRecent = async () => {
    const result = await get("recent_bookings");
    return result;
};
export const getTopBooked = async () => {
    const result = await get("top_booked_tours");
    return result;
};
export const getDashboardData = async () => {
    const result = await get("dashboard_summary");
    return result;
};
export const getDataMonths = async () => {
    const result = await get("monthlyRevenue");
    return result;
};
export const getDataPayment = async () => {
    const result = await get("booking_payments");
    return result;
};
