import { get, post } from "../util/requestserver";

export const getDataBookingTour = async (page, limit = 10, keyword = "") => {
    try {
        const res = await get("bookings", {
            params: { page, limit, keyword },
        });

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy danh sách booking",
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

// Xác nhận thanh toán và cập nhật trạng thái booking sang CONFIRMED
export const confirmPaymentAndBooking = async (bookingId) => {
    try {
        const res = await post(`/bookings/${bookingId}/confirm-payment-and-booking`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi xác nhận thanh toán và booking với ID ${bookingId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi xác nhận thanh toán và booking",
        };
    }
};
// Gửi email hóa đơn kèm PDF
export const sendInvoiceEmail = async (bookingId) => {
    try {
        const res = await post(`/bookings/${bookingId}/send-invoice`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi gửi email hóa đơn với booking ID ${bookingId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi gửi email hóa đơn",
        };
    }
};
