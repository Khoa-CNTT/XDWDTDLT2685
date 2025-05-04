import { get, post } from "../util/requestserver";

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
        const token = localStorage.getItem("token");
        const res = await get(`users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin ADMIN với ID ${id}:`, error);
        throw error;
    }
};
