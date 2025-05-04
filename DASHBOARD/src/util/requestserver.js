import axios from "axios";

// Tạo một instance của axios
const instance = axios.create({
    baseURL: "http://localhost:8088/api/v1/",
});

// Thêm interceptor để tự động thêm token vào header
instance.interceptors.request.use(
    function (config) {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        if (token) {
            // Thêm token vào header Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Xử lý lỗi trước khi gửi yêu cầu
        return Promise.reject(error);
    },
);

// Interceptor để xử lý phản hồi
instance.interceptors.response.use(
    function (response) {
        // Trả về dữ liệu nếu phản hồi thành công
        return response;
    },
    function (error) {
        // Xử lý lỗi phản hồi
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    },
);

// Các hàm gọi API
export const get = (path) => instance.get(path);
export const post = (path, data, config = {}) => instance.post(path, data, config);
export const del = (path) => instance.delete(path);
export const edit = (path, data) => instance.put(path, data);

export default instance;
