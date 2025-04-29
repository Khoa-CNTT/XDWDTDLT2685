import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getDashboardData } from "../../services/tourStatistics";

const { GoPackage, MdTrendingUp, MdOnlinePrediction, MdDoNotDisturbOnTotalSilence, FaUsers, MdTrendingDown } = icons;

function TotalAll() {
    const [dashboardSummary, setDashboardSummary] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDashboardData();
                setDashboardSummary(res);
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
                value={dashboardSummary.total_active_tours?.current || "No data"}
                percentage={dashboardSummary.total_active_tours?.percentage_change || "N/A"}
            />

            {/* Bookings */}
            <Card
                icon={<MdDoNotDisturbOnTotalSilence size={26} />}
                title="Tổng số lượt booking"
                value={dashboardSummary.total_bookings?.current || "No data"}
                percentage={dashboardSummary.total_bookings?.percentage_change || "N/A"}
            />

            {/* Users */}
            <Card
                icon={<FaUsers size={26} />}
                title="Tổng số người đăng ký"
                value={dashboardSummary.total_users?.current || "No data"}
                percentage={dashboardSummary.total_users?.percentage_change || "N/A"}
            />

            {/* Revenue */}
            <Card
                icon={<GoPackage size={26} />}
                title="Tổng doanh thu"
                value={dashboardSummary.total_revenue?.current ? `${dashboardSummary.total_revenue.current.toLocaleString()} VNĐ` : "No data"}
                percentage={dashboardSummary.total_revenue?.percentage_change || "N/A"}
                valueClass="text-red-400"
            />
        </div>
    );
}

function Card({ icon, title, value, percentage, valueClass = "text-slate-900 dark:text-slate-50" }) {
    // Determine the icon based on percentage change
    const TrendIcon = percentage > 0 ? MdTrendingUp : MdTrendingDown;

    return (
        <div className="card">
            <div className="card-header">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-[#019fb5] transition-colors dark:bg-blue-600/20 dark:text-[#019fb5]">
                    {icon}
                </div>
                <p className="card-title">{title}</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
                <span className="bodr-[#019fb5] flex w-fit items-center gap-x-2 rounded-full border px-2 py-1 font-medium text-[#019fb5] dark:border-[#019fb5] dark:text-[#019fb5]">
                    <TrendIcon size={20} />
                    <span>{percentage}%</span>
                </span>
            </div>
        </div>
    );
}

export default TotalAll;
