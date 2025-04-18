import axios from "./customize_axios";

export const getTourById = (id) => {
    return axios.get(`tours/${id}`);
};

export const getAllTour = async (page, limit = 6) => {
    return axios.get('tours', {
        params: { page, limit }
    });
};


