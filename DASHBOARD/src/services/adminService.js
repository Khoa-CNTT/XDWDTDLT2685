import { edit, get, post } from "../util/requestserver";

// Đăng nhập ADMIN
export const login = async (user_name, password) => {
    try {
        return await post("users/login", { user_name, password });
    } catch (error) {
        console.error("Lỗi khi đăng nhập ADMIN:", error);
        throw error;
    }
};
// Lấy thông tin ADMIN
export const getInfoAdmin = async (id) => {
    try {
        const response = await get(`users/${id}`);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Something went wrong",
        };
    }
};
//Sửa thông tin ADMIN
export const putChangeInfoAdmin = async (id, data) => {
    try {
        const response = await edit(`users/${id}`, data);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Something went wrong",
        };
    }
};
//Thay đổi ảnh Admin
export const putProfileImg = async (id, formData) => {
    try {
        const response = await edit(`users/${id}/avatar`, formData);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(`Lỗi khi cập nhật ảnh đại diện cho user ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi tải ảnh lên",
        };
    }
};
