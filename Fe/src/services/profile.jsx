import axios from "./customize_axios";

export const putChangePasswordId = (id, data) => {
    const token = localStorage.getItem('token'); 
    return axios.put(`users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};




