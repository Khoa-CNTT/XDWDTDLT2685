import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8088/api/v1/",
    // Prevent Axios from automatically following redirects
    maxRedirects: 0,
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.error("Lỗi API:", {
            message: error.message,
            response: error.response,
            request: error.request,
            config: error.config,
        });
        // Handle redirect responses (e.g., 302)
        if (error.response && [301, 302].includes(error.response.status)) {
            console.warn("Redirect detected. Check server authentication or endpoint configuration.");
            return Promise.reject(new Error("Server redirected the request. Please check authentication or server configuration."));
        }
        return Promise.reject(error);
    },
);

// API methods
export const get = (path) => instance.get(path);
export const post = (path, data, config = {}) => instance.post(path, data, config);
export const del = (path) => instance.delete(path);
export const edit = (path, data) => instance.put(path, data);
export const put = (path, data, config = {}) => instance.put(path, data, config);

export default instance;
