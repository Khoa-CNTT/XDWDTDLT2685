import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import icons from "../../util/icon";
import { getDataMonths } from "../../services/tourStatistics";
const { FaChartBar } = icons;
function DataChartMonth() {
    const [dataChart, setDatachart] = useState([]);
    useEffect(() => {
        const FetchApi = async () => {
            const res = await getDataMonths();
            setDatachart(res);
        };
        FetchApi();
    }, []);
    return (
        <>
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
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        borderRadius: "8px",
                                        border: "1px solid #ddd",
                                    }}
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
                </div>
            </div>
            {/* <div className="card-word rounded-lg p-4">
                        <h2 className="card-title mt-8 mb-5">✈️ Ngoài nước</h2>
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart data={dataChart.international}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#FF9800"
                                    fill="#FFCC80"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div> */}
        </>
    );
}
export default DataChartMonth;
