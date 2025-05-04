// src/services/tourService.js
import { del, edit, get, post } from "../util/requestserver";

// Lấy tất cả tour
export const getDataTour = async () => {
    try {
        return await get("tours");
    } catch (error) {
        console.error("Error fetching tours:", error);
        throw error;
    }
};

// Tạo tour mới
export const createDataTour = async (data) => {
    try {
        return await post("tours", data);
    } catch (error) {
        console.error("Error creating tour:", error);
        throw error;
    }
};

// Xóa tour theo ID
export const deleteTour = async (id) => {
    try {
        return await del(`tours/${id}`);
    } catch (error) {
        console.error(`Error deleting tour with ID ${id}:`, error);
        throw error;
    }
};

// Cập nhật tour
export const updateTour = async (id, data) => {
    try {
        return await edit(`tours/${id}`, data);
    } catch (error) {
        console.error(`Error updating tour with ID ${id}:`, error);
        throw error;
    }
};

// Lấy danh sách khu vực
export const getDataRegion = async () => {
    try {
        return await get("regions");
    } catch (error) {
        console.error("Error fetching regions:", error);
        throw error;
    }
};
// Upload ảnh cho tour
export const uploadImageTour = async (formData) => {
    try {
        return await post("tours/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error) {
        console.error("Error uploading tour images:", error);
        throw error;
    }
};
