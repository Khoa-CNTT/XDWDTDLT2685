import axios from "./customize_axios";

export const getTourById = (id) => {
    return axios.get(`tours/${id}`);
};

export const getAllTour = () => {
    return axios.get("tours");
};
