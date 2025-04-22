import axios from "./customize_axios";

export const putChangeInformation = async (id, data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`users/${id}`, data, {
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
export const getAllProfile = (id) => { // lấy ra all thông tin trừ pass
    const token = localStorage.getItem("token");
    return axios.get(`users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const putProfileImg = (id, formData) => {
    const token = localStorage.getItem("token");
    return axios.put(`users/${id}/avatar`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};









