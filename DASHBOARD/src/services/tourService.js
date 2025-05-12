import { del, edit, get, post } from "../util/requestserver";

// Lấy tất cả tour
export const getDataTour = async (page, limit = 10) => {
    try {
        const res = await get("tours", {
            params: { page, limit },
        });

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

// Lấy chi tiết tour theo ID
export const getTourById = async (id) => {
    try {
        const res = await get(`tours/${id}`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Error fetching tour with ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy thông tin tour",
        };
    }
};

// Xóa tour theo ID
export const deleteTour = async (id) => {
    try {
        const res = await del(`tours/${id}`);
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

// Cập nhật thông tin tour
export const updateTour = async (id, data) => {
    try {
        const res = await edit(`tours/${id}`, data);
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

// Cập nhật ảnh tour
export const updateTourImages = async (tourId, files) => {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file); // Tên field phải trùng với backend (`@RequestParam("files")`)
        });

        const res = await edit(`tours/${tourId}/images`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Error updating images for tour ${tourId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi cập nhật ảnh tour",
        };
    }
};

// Tạo tour mới
export const createDataTour = async (data) => {
    try {
        const res = await post("tours", data);
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
        const res = await post(`tours/uploads/${tourId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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
