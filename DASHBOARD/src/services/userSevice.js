import { del, get } from "../util/requestserver";

// Lấy danh sách khách hàng
export const getDataUser = async () => {
    try {
        const res = await get("users");
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy danh sách người dùng",
        };
    }
};

// Lấy thông tin khách hàng theo ID
export const getDataUserById = async (id) => {
    try {
        const res = await get(`users/${id}`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin khách hàng với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy thông tin người dùng",
        };
    }
};

// Xóa khách hàng theo ID
export const deleteUser = async (id) => {
    try {
        const res = await del(`users/${id}`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi xóa khách hàng với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi xóa người dùng",
        };
    }
};

// Khóa khách hàng theo ID
export const blockUser = async (id) => {
    try {
        const res = await del(`users/${id}/block`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi khóa khách hàng với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi khóa người dùng",
        };
    }
};
export const getAvatar = async (id) => {
    try {
        const res = await get(`users/${id}/avatar`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi lấy ảnh đại diện của khách hàng với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy ảnh đại diện của người dùng",
        };
    }
};
