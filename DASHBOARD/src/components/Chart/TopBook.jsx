import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getDashboardData } from "../../services/dashboardService";

const { FaFire } = icons;

function TopbookedTour() {
    const [domesticData, setDomesticData] = useState([]);
    const [error, setError] = useState(null); // State để lưu thông báo lỗi

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDashboardData();
                console.log(res);

                // Kiểm tra response và tourStats
                if (!res || !res.data || !res.data.tourStats || !Array.isArray(res.data.tourStats)) {
                    throw new Error("Dữ liệu tour không hợp lệ hoặc không tồn tại");
                }
                const formattedData = res.data.tourStats
                    .map((tour) => ({
                        id: tour.tourId,
                        name: tour.tourName,
                        bookedSlots: tour.bookedSlots || 0,
                        availableSlots: tour.availableSlots || 0,
                        bookingCount: tour.bookingCount || 0,
                        price: tour.price ? tour.price.toLocaleString("vi-VN") : "N/A",
                        rating: tour.rating || 0,
                        duration: tour.duration || "Không xác định",
                    }))
                    .sort((a, b) => b.bookedSlots - a.bookedSlots); // Sắp xếp theo bookedSlots giảm dần

                setDomesticData(formattedData);
                setError(null); // Xóa lỗi nếu thành công
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
                setError("Không thể tải dữ liệu tour. Vui lòng thử lại sau.");
                setDomesticData([]); // Đặt dữ liệu rỗng để tránh lỗi bảng
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
            <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-[#019fb5] dark:bg-blue-600/20">
                    <FaFire size={26} />
                </div>
                <p className="card-title text-lg font-semibold">Tour được đặt nhiều nhất</p>
            </div>
            <div className="card-body flex flex-col gap-4 p-4">
                <h2 className="card-title text-sm font-bold">📋 Thông Tin Đặt Tour</h2>

                {error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : domesticData.length === 0 ? (
                    <div className="text-center text-gray-500">Không có dữ liệu tour để hiển thị.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse dark:text-amber-50">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-slate-800">
                                    <th className="border border-gray-300 px-4 py-2">ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Tên Tour</th>
                                    <th className="border border-gray-300 px-4 py-2">Lượt Booking</th>
                                    <th className="border border-gray-300 px-4 py-2">Chỗ đã đặt </th>
                                    <th className="border border-gray-300 px-4 py-2">Chỗ Trống</th>
                                    <th className="border border-gray-300 px-4 py-2">Giá (VND)</th>
                                    <th className="border border-gray-300 px-4 py-2">Đánh Giá</th>
                                    <th className="border border-gray-300 px-4 py-2">Thời Gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {domesticData.map((tour, index) => (
                                    <tr
                                        key={tour.id || index}
                                        className="text-center"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{tour.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.bookingCount}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.bookedSlots}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.availableSlots}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.rating}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopbookedTour;
