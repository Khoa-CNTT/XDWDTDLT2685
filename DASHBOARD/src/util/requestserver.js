import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8088/api/v1/",
    maxRedirects: 0, // Ngăn Axios tự động theo dõi chuyển hướng
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
    async function (error) {
        console.error("Lỗi API:", {
            message: error.message,
            response: error.response,
            request: error.request,
            config: error.config,
        });

        // Xử lý lỗi 401 (token hết hạn)
        if (error.response && error.response.status === 401) {
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }
                const refreshResponse = await axios.post("http://localhost:8088/api/v1/auth/refresh-token", {
                    refreshToken,
                });
                const newToken = refreshResponse.data.token;
                localStorage.setItem("token", newToken);
                // Thử lại yêu cầu gốc
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return instance(error.config);
            } catch (refreshError) {
                console.error("Không thể làm mới token:", refreshError);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(new Error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."));
            }
        }

        // Xử lý chuyển hướng (301, 302)
        if (error.response && [301, 302].includes(error.response.status)) {
            console.warn("Redirect detected. Check server authentication or endpoint configuration.");
            return Promise.reject(new Error("Server redirected the request. Please check authentication or server configuration."));
        }

        return Promise.reject(error);
    },
);

// API methods
export const get = (path, config = {}) => instance.get(path, config);
export const post = (path, data, config = {}) => instance.post(path, data, config);
export const del = (path, config = {}) => instance.delete(path, config);
export const edit = (path, data, config = {}) => instance.put(path, data, config);
export const put = (path, data, config = {}) => instance.put(path, data, config);

export default instance;
