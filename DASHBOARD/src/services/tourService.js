import { del, edit, get, post } from "../util/requestserver";

// Lấy tất cả tour
export const getDataTour = async () => {
    try {
        const res = await get("tours");
        console.log("Get tours response:", res.data); // Debug
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Error fetching tours:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy danh sách tour",
        };
    }
};

// Xóa tour theo ID
export const deleteTour = async (id) => {
    try {
        const res = await del(`tours/${id}`);
        console.log(`Delete tour ${id} response:`, res.data); // Debug
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Error deleting tour with ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi xóa tour",
        };
    }
};

// Cập nhật tour
export const updateTour = async (id, data) => {
    try {
        const res = await edit(`tours/${id}`, data);
        console.log(`Update tour ${id} response:`, res.data); // Debug
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Error updating tour with ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi cập nhật tour",
        };
    }
};

// Tạo tour mới
export const createDataTour = async (data) => {
    try {
        const res = await post("tours", data);
        console.log("Create tour response:", res.data); // Debug
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Error creating tour:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi tạo tour",
        };
    }
};

// Upload ảnh tour
export const uploadImageTour = async (tourId, formData) => {
    try {
        const token = localStorage.getItem("token");
        console.log("Token for upload request:", token); // Debug
        const res = await post(`tours/uploads/${tourId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(`Upload image response for tour ${tourId}:`, res.data); // Debug
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi upload ảnh tour cho tour ${tourId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi upload ảnh tour",
        };
    }
};
