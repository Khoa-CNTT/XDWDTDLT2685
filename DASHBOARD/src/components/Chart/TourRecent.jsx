import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getTourRecent } from "../../services/tourStatistics";

const { FaRocket } = icons;

function TourRecent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getTourRecent();
                setData(res || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu tour:", error);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="card col-span-1 min-w-[300px] md:col-span-2 lg:col-span-4">
            <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-[#019fb5] transition-colors dark:bg-blue-600/20">
                    <FaRocket size={26} />
                </div>
                <p className="card-title text-lg font-semibold">Tour mới</p>
            </div>
            <div className="card-body p-4">
                <h2 className="card-title text-sm font-bold">📋 Thông Tin Đặt Tour</h2>
                <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 text-sm dark:text-amber-50">
                        <thead>
                            <tr className="bg-blue-100 text-black">
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">ID</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Khách Hàng</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Tên Tour</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Giá (VND)</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Trạng Thái</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Thanh Toán</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Khu Vực</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Ngày Đặt</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Email</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">SĐT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((tour) => (
                                    <tr
                                        key={tour.id}
                                        className="text-center"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{tour.id}</td>
                                        <td className="max-w-[120px] truncate border border-gray-300 px-4 py-2">{tour.customer_name}</td>
                                        <td className="max-w-[100px] truncate border border-gray-300 px-4 py-2">{tour.tour_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{tour.total_price.toLocaleString()}</td>
                                        <td
                                            className={`border border-gray-300 px-4 py-2 whitespace-nowrap ${
                                                tour.status === "Chưa xác nhận" ? "text-red-500" : "text-green-500"
                                            }`}
                                        >
                                            {tour.status}
                                        </td>
                                        <td className="max-w-[100px] truncate border border-gray-300 px-4 py-2">{tour.payment_method}</td>
                                        <td className="max-w-[100px] truncate border border-gray-300 px-4 py-2">{tour.location}</td>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                                            {new Date(tour.booking_date).toLocaleDateString()}
                                        </td>
                                        <td className="max-w-[120px] truncate border border-gray-300 px-4 py-2 text-[#019fb5] underline">
                                            {tour.user_email}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-green-500">{tour.user_phone}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="py-4 text-center text-gray-500"
                                    >
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TourRecent;
