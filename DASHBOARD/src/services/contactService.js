import { get } from "../util/requestserver";

export const getDataContact = async () => {
    try {
        const res = await get("contact");
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Lỗi :", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy danh sách Liên hệ",
        };
    }
};
