import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getDashboardData } from "../../services/dashboardService";

const { FaRocket } = icons;

function TourRecent() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null); // State để lưu thông báo lỗi

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDashboardData();
                // Kiểm tra response và latestBookings
                if (!res || !res.data || !res.data.latestBookings || !Array.isArray(res.data.latestBookings)) {
                    throw new Error("Dữ liệu booking không hợp lệ hoặc không tồn tại");
                }

                // Ánh xạ latestBookings
                const formattedData = res.data.latestBookings.map((booking) => ({
                    id: booking.bookingId || "N/A",
                    customer_name: booking.customerName || "Không xác định",
                    tour_name: booking.tourName || "Không xác định",
                    price: booking.price || 0, // Sử dụng price thay vì total_price
                    status: booking.status || "Không xác định",
                    payment_method: booking.paymentMethod || "Không xác định",
                    region: booking.region || "Không xác định",
                    booking_date: booking.bookingDate || null,
                }));

                setData(formattedData);
                setError(null); // Xóa lỗi nếu thành công
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu tour:", error);
                setError("Không thể tải dữ liệu booking. Vui lòng thử lại sau.");
                setData([]); // Đặt dữ liệu rỗng để tránh lỗi bảng
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
                <p className="card-title text-lg font-semibold">Booking mới</p>
            </div>
            <div className="card-body p-4">
                <h2 className="card-title text-sm font-bold">📋 Thông Tin Booking</h2>
                <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 text-sm dark:text-amber-50">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-slate-800">
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">ID</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Khách Hàng</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Tên Tour</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Giá (VND)</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Trạng Thái</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Thanh Toán</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Khu Vực</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Ngày Đặt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-4 text-center text-red-500"
                                    >
                                        {error}
                                    </td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map((tour) => (
                                    <tr
                                        key={tour.id}
                                        className="text-center"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{tour.id}</td>
                                        <td className="max-w-[120px] truncate border border-gray-300 px-4 py-2">{tour.customer_name}</td>
                                        <td className="max-w-[100px] truncate border border-gray-300 px-4 py-2">{tour.tour_name}</td>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{tour.price.toLocaleString("vi-VN")}</td>
                                        <td
                                            className={`border border-gray-300 px-4 py-2 whitespace-nowrap ${
                                                tour.status === "PENDING"
                                                    ? "text-red-500"
                                                    : tour.status === "CONFIRMED"
                                                      ? "text-green-500"
                                                      : tour.status === "CANCELLED"
                                                        ? "text-red-500"
                                                        : "text-gray-500"
                                            }`}
                                        >
                                            {tour.status === "PENDING"
                                                ? "Chờ xác nhận"
                                                : tour.status === "CONFIRMED"
                                                  ? "Đã xác nhận"
                                                  : tour.status === "CANCELLED"
                                                    ? "Đã hủy"
                                                    : tour.status}
                                        </td>

                                        <td className="max-w-[100px] truncate border border-gray-300 px-4 py-2">
                                            {tour.payment_method === "OFFICE"
                                                ? "Văn phòng"
                                                : tour.payment_method === "VNPAY"
                                                  ? "VNPAY"
                                                  : tour.payment_method}
                                        </td>
                                        <td className="max-w-[100px] truncate border border-gray-300 px-4 py-2">{tour.region}</td>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                                            {tour.booking_date ? new Date(tour.booking_date).toLocaleDateString("vi-VN") : "N/A"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
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
