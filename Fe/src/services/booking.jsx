import axios from "./customize_axios";

export const postBooking = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`bookings`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {

        return {
            status: error.response?.status || 500,
            data: error.response?.data || 'Something went wrong',
        };
    }
};

export const getBookingId = (id) => {
    const token = localStorage.getItem("token");
    return axios.get(`bookings/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
// hủy tour
export const putBookingTour = async (id) => {
    const token = localStorage.getItem('token'); 

    try {
        const response = await axios.put(
            `bookings/${id}/cancel`,
            {}, // body rỗng (nếu không cần gửi gì)
            {
                headers: {
                    Authorization: `Bearer ${token}`, // 👈 BẮT BUỘC
                },
            }
        );

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response?.status || 500,
            data: error.response?.data || 'Something went wrong',
        };
    }
};
