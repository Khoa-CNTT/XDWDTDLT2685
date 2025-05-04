import { del, edit, get, post } from "../util/requestserver";

// Lấy danh sách khách hàng
export const getDataUser = async () => {
    try {
        const response = await get("users");
        console.log("Dữ liệu người dùng:", response);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        throw error;
    }
};

// Lấy thông tin khách hàng theo ID
export const getDataUserById = async (id) => {
    try {
        return await get(`users/${id}`);
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin khách hàng với ID ${id}:`, error);
        throw error;
    }
};

// Tạo khách hàng mới
export const createDataUser = async (data) => {
    try {
        return await post("users", data);
    } catch (error) {
        console.error("Lỗi khi tạo khách hàng:", error);
        throw error;
    }
};

// Cập nhật thông tin khách hàng
export const editUser = async (id, option) => {
    try {
        return await edit(`users/${id}`, option);
    } catch (error) {
        console.error(`Lỗi khi cập nhật khách hàng với ID ${id}:`, error);
        throw error;
    }
};

// Xóa khách hàng theo ID
export const deleteUser = async (id) => {
    try {
        return await del(`users/${id}`);
    } catch (error) {
        console.error(`Lỗi khi xóa khách hàng với ID ${id}:`, error);
        throw error;
    }
};
