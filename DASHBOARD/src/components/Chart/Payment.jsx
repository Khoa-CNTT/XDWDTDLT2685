import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import icons from "../../util/icon";
import { getDataPayment } from "../../services/tourStatistics";

const { MdPayment } = icons;
const PaymentDataCard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataPayment();
                setData(res || []);
            } catch (error) {
                console.error("Error fetching payment data:", error);
                setData([]);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="card col-span-1 overflow-hidden rounded-lg bg-white shadow-md md:col-span-2 lg:col-span-3 dark:bg-slate-900">
            <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-[#019fb5] transition-colors dark:bg-blue-600/20">
                    <MdPayment size={26} />
                </div>
                <p className="card-title">Dữ liệu thanh toán</p>
            </div>
            <div className="card-body p-4">
                <h3 className="title mb-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">Phương thức thanh toán</h3>

                {data.length > 0 ? (
                    <div className="flex w-full justify-center">
                        <div className="w-full max-w-md">
                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={3}
                                        dataKey="percentage"
                                        nameKey="method"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ) : (
                    <p className="py-4 text-center text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
};

export default PaymentDataCard;
