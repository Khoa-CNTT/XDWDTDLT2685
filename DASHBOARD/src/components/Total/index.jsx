import { useEffect, useState } from "react";
import icons from "../../util/icon";

import Card from "../Card";
import { getDashboardData } from "../../services/dashboardService";

const { GoPackage, MdOnlinePrediction, MdDoNotDisturbOnTotalSilence, FaUsers } = icons;

function TotalAll() {
    const [dashboardSummary, setDashboardSummary] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDashboardData();
                if (res.status === 200) {
                    setDashboardSummary(res.data);
                } else {
                    console.error("Không thể lấy dữ liệu dashboard:", res);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            }
        };

        fetchApi();
    }, []);

    if (!dashboardSummary) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Active Tours */}
            <Card
                icon={<MdOnlinePrediction size={26} />}
                title="Tour đang hoạt động"
                value={dashboardSummary.activeTours ?? "No data"}
                percentage="N/A"
            />

            {/* Bookings */}
            <Card
                icon={<MdDoNotDisturbOnTotalSilence size={26} />}
                title="Tổng số lượt booking"
                value={dashboardSummary.totalBookings ?? "No data"}
                percentage="N/A"
            />

            {/* Users */}
            <Card
                icon={<FaUsers size={26} />}
                title="Tổng số người đăng ký"
                value={dashboardSummary.totalUsers ?? "No data"}
                percentage="N/A"
            />

            {/* Revenue */}
            <Card
                icon={<GoPackage size={26} />}
                title="Tổng doanh thu"
                value={dashboardSummary.totalRevenue != null ? `${dashboardSummary.totalRevenue.toLocaleString()} VNĐ` : "No data"}
                percentage="N/A"
                valueClass="text-red-400"
            />
        </div>
    );
}

export default TotalAll;
