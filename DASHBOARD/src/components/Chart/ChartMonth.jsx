import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import icons from "../../util/icon";
import { getDashboardData } from "../../services/dashboardService";

const { FaChartBar } = icons;

function DataChartMonth() {
    const [dataChart, setDataChart] = useState({ domestic: [] });
    const [error, setError] = useState(null); // State để lưu thông báo lỗi

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDashboardData();
                // Kiểm tra response và monthlyRevenues
                if (!res || !res.data || !res.data.monthlyRevenues || !Array.isArray(res.data.monthlyRevenues)) {
                    throw new Error("Dữ liệu doanh thu không hợp lệ hoặc không tồn tại");
                }

                // Ánh xạ monthlyRevenues thành dữ liệu cho biểu đồ
                const formattedData = res.data.monthlyRevenues.map((item) => ({
                    month: formatMonth(item.monthYear),
                    revenue: item.revenue || 0, // Đảm bảo revenue là số, mặc định là 0 nếu không có
                }));

                // Sắp xếp theo thứ tự tháng (January -> December)
                const monthOrder = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ];
                formattedData.sort((a, b) => {
                    const monthA = res.data.monthlyRevenues.find((item) => formatMonth(item.monthYear) === a.month)?.monthYear;
                    const monthB = res.data.monthlyRevenues.find((item) => formatMonth(item.monthYear) === b.month)?.monthYear;
                    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
                });

                setDataChart({ domestic: formattedData });
                setError(null); // Xóa lỗi nếu thành công
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu dashboard:", error);
                setError("Không thể tải dữ liệu doanh thu. Vui lòng thử lại sau.");
                setDataChart({ domestic: [] }); // Đặt dữ liệu rỗng để tránh lỗi biểu đồ
            }
        };
        fetchApi();
    }, []);

    // Hàm định dạng tháng sang tiếng Việt
    const formatMonth = (monthYear) => {
        const monthMap = {
            January: "Tháng 1",
            February: "Tháng 2",
            March: "Tháng 3",
            April: "Tháng 4",
            May: "Tháng 5",
            June: "Tháng 6",
            July: "Tháng 7",
            August: "Tháng 8",
            September: "Tháng 9",
            October: "Tháng 10",
            November: "Tháng 11",
            December: "Tháng 12",
        };
        return monthMap[monthYear] || monthYear || "Không xác định"; // Xử lý trường hợp monthYear không hợp lệ
    };

    return (
        <div className="card col-span-1 rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg md:col-span-2 lg:col-span-8 dark:bg-slate-800">
            {/* Card Header */}
            <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-[#019fb5] transition-colors hover:bg-blue-500/30 dark:bg-blue-600/20 dark:text-[#019fb5] dark:hover:bg-blue-600/30">
                    <FaChartBar size={24} />
                </div>
                <p className="card-title text-xl font-semibold text-gray-800 dark:text-white">Doanh thu theo tháng</p>
            </div>

            {/* Card Body */}
            <div className="card-body p-6">
                {error ? (
                    <div className="text-center text-red-500">{error}</div> // Hiển thị thông báo lỗi
                ) : (
                    <div className="card-domestic rounded-lg bg-[#f1f5f9] p-6 dark:bg-slate-950">
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart data={dataChart.domestic}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#ccc"
                                />
                                <XAxis
                                    dataKey="month"
                                    stroke="#A5D6A7"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={{ stroke: "#ccc" }}
                                />
                                <YAxis
                                    stroke="#A5D6A7"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={{ stroke: "#ccc" }}
                                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} // Hiển thị doanh thu dạng triệu VNĐ
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                    formatter={(value) => `${value.toLocaleString("vi-VN")} VNĐ`} // Định dạng tooltip
                                    labelStyle={{ color: "#333" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#4CAF50"
                                    strokeWidth={2}
                                    fill="#A5D6A7"
                                    fillOpacity={0.6}
                                    activeDot={{ r: 6, fill: "#4CAF50", stroke: "#fff", strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DataChartMonth;
