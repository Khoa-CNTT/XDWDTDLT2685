import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getTopBooked } from "../../services/tourStatistics";

const { FaFire } = icons;

function TopbookedTour() {
    const [domesticData, setDomesticData] = useState([]);
    // const [internationalData, setInternationalData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getTopBooked();
                setDomesticData(res?.domestic || []);
                // setInternationalData(res?.international || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            }
        };
        fetchApi();
    }, []);

    return (
        <>
            <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                    <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-[#019fb5] dark:bg-blue-600/20">
                        <FaFire size={26} />
                    </div>
                    <p className="card-title text-lg font-semibold">Tour được đặt nhiều nhất</p>
                </div>
                <div className="card-body flex gap-4">
                    <h2 className="card-title text-sm font-bold">📋 Thông Tin Đặt Tour</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse dark:text-amber-50">
                            <thead>
                                <tr className="bg-blue-100 text-black">
                                    <th className="border border-gray-300 px-4 py-2">ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Tên Tour</th>
                                    <th className="border border-gray-300 px-4 py-2">Chỗ Đã Đặt</th>
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
                                        <td className="border border-gray-300 px-4 py-2">{tour.seats_booked || tour.bookings}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.seats_available || "-"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.rating}</td>
                                        <td className="border border-gray-300 px-4 py-2">{tour.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopbookedTour;
