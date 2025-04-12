import axios from "./customize_axios";

export const getTourById = (id) => {
    return axios.get(`tours/${id}`);
};

export const getAllTour = async () => {
    const token = localStorage.getItem("token"); // nếu lưu token ở đây
    const response = await axios.get("/tours", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

