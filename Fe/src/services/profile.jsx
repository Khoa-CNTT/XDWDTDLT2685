import axios from "./customize_axios";

export const putChangeInformation = (id, data) => { // sửa thông tin và pass
    const token = localStorage.getItem('token');
    return axios.put(`users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllProfile = (id) => { // lấy ra all thông tin trừ pass
    const token = localStorage.getItem("token");
    return axios.get(`users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// export const getProfileImg = (id) => {
//     const token = localStorage.getItem("token");
//     return axios.get("users/avatars", {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };








