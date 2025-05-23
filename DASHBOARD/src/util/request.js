// api.js
import axios from "axios";

// Tạo một instance mặc định
const instance = axios.create({
    baseURL: "http://localhost:3002/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Xử lý response để chỉ trả về response.data
instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
);

// Các hàm gọi API
export const get = (path) => instance.get(path);
export const post = (path, data) => instance.post(path, data);
export const del = (path) => instance.delete(path);
export const edit = (path, data) => instance.put(path, data);
