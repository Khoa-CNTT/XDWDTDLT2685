import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getTourStatistics } from "../../services/tourStatistics";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const { FaMap } = icons;

function TourStatistics() {
    const [domesticData, setDomesticData] = useState([]);
    // const [internationalData, setInternationalData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getTourStatistics();
                setDomesticData(res?.domestic || []);
                // setInternationalData(res?.international || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            }
        };
        fetchApi();
    }, []);

    const getTotal = (data) => data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="card col-span-1 md:col-span-2 lg:col-span-5">
            <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-[#019fb5] dark:bg-blue-600/20">
                    <FaMap size={26} />
                </div>
                <p className="card-title text-lg font-semibold">Điểm đến</p>
            </div>

            <div className="card-body p-4">
                {/* Biểu đồ Trong nước */}
                <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start">
                    {/* Biểu đồ */}
                    <div className="flex w-full flex-col items-center justify-center sm:w-1/2">
                        <div className="flex items-center justify-center">
                            <ResponsiveContainer
                                width={300}
                                height={300}
                            >
                                <PieChart>
                                    <Pie
                                        data={domesticData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={3}
                                        dataKey="value"
                                        nameKey="name"
                                    >
                                        {domesticData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bảng - ẩn khi nhỏ hơn sm */}
                    <div className="hidden w-full sm:block sm:w-1/2">
                        <table className="w-full border-collapse text-left dark:text-amber-50">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2">Tên</th>
                                    <th className="py-2 text-center">Số lượt đặt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {domesticData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b"
                                    >
                                        <td className="flex items-center gap-2 py-2">
                                            <span
                                                className="inline-block h-3 w-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            ></span>
                                            {item.name}
                                        </td>
                                        <td className="py-2 text-center">{item.value}</td>
                                    </tr>
                                ))}
                                <tr className="border-t font-bold">
                                    <td className="py-2">Tổng</td>
                                    <td className="py-2 text-center">{getTotal(domesticData)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TourStatistics;
