import { get, post, put } from "../util/requestserver";

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

export const getInvoiceById = async (id) => {
    try {
        const res = await get("invoices", {
            params: { bookingId: id },
        });

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin hóa đơn với booking ID ${id}:`, error.response || error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi lấy thông tin hóa đơn",
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
export const sendInvoiceEmail = async (bookingId, pdfFile) => {
    try {
        const formData = new FormData();
        formData.append("bookingId", bookingId);
        if (pdfFile) {
            formData.append("file", pdfFile);
        }

        const res = await post("/invoices/send", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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
// Xóa booking theo ID
export const deleteBooking = async (bookingId) => {
    try {
        const res = await delete `bookings/${bookingId}`;
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi xóa booking với ID ${bookingId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi xóa booking",
        };
    }
};
// Hủy booking theo ID
export const cancelBooking = async (bookingId) => {
    try {
        const res = await put(`/bookings/${bookingId}/cancel`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi hủy booking với ID ${bookingId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi hủy booking",
        };
    }
};
