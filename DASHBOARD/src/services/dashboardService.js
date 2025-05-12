import { get } from "../util/requestserver";

export const getDashboardData = async () => {
    try {
        const res = await get("dashboard");
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy dữ liệu dashboard",
        };
    }
};
