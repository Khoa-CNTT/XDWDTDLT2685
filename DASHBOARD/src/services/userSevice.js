import { del, get, put } from "../util/requestserver"; // Import put thay vì patch

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
            success: true,
            message: res.data || "Xóa thành công",
        };
    } catch (error) {
        console.error(`Lỗi khi xóa user ${id}:`, error);
        return {
            success: false,
            message: error.response?.data?.message || "Lỗi không xác định",
        };
    }
};

// Khóa khách hàng theo ID
export const blockUser = async (id) => {
    try {
        const res = await put(`users/block/${id}/0`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi khóa khách hàng với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi khóa người dùng",
            message: error.response?.data === "User not found." ? "Không tìm thấy người dùng" : "Lỗi khi khóa người dùng",
        };
    }
};

// Mở khóa khách hàng theo ID (tùy chọn, nếu cần mở khóa)
export const enableUser = async (id) => {
    try {
        const res = await put(`users/block/${id}/1`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi mở khóa khách hàng với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi mở khóa người dùng",
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
