import { del, edit, get, post } from "../util/requestserver";

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

// Tạo khách hàng mới
export const createDataUser = async (data) => {
    try {
        const res = await post("users", data);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Lỗi khi tạo khách hàng:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi tạo người dùng",
        };
    }
};

// Cập nhật thông tin khách hàng
export const editUser = async (id, option) => {
    try {
        const res = await edit(`users/${id}`, option);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi cập nhật khách hàng với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi cập nhật người dùng",
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
