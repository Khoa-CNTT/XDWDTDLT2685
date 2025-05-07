import { get } from "../util/requestserver";

// Lấy tất cả booking tour
export const getDataBookingTour = async () => {
    try {
        const res = await get("bookings");
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Lỗi khi lấy danh sách booking:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi lấy danh sách booking",
        };
    }
};

// Lấy thông tin booking theo ID
export const getDataBookingTourById = async (id) => {
    try {
        const res = await get(`bookings/${id}`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin booking với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi lấy thông tin booking",
        };
    }
};
