import axios from "./customize_axios";

export const postReview = (data) => {
    const token = localStorage.getItem("token");
    return axios.post(`reviews`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllReview = async () => {
    return axios.get('reviews');
};