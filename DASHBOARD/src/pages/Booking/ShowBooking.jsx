import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import icons from "../../util/icon";
import CopyPrintComponent from "../../components/Tool";
import EntriesFilter from "../../components/Pagination";
import { getDataBookingTour } from "../../services/bookingService";
import BookingTourTable from "./BookingTable";
import GoBack from "../../components/GoBack/Goback";

const { FaSearch } = icons;

function ShowBookingTour() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]); // Lưu dữ liệu gốc để tìm kiếm
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại, bắt đầu từ 0 giống ShowTour
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [totalItems, setTotalItems] = useState(0); // Tổng số booking
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
    const limit = 10;

    const { register, handleSubmit } = useForm();

    const fetchApi = async (page = 0) => {
        try {
            setIsLoading(true); // Bắt đầu loading
            const res = await getDataBookingTour(page, limit);
            console.log(res);

            const dataArray = res.data?.content && Array.isArray(res.data.content) ? res.data.content : [];

            setData(dataArray);
            setOriginalData(dataArray);
            setTotalPages(res.data?.totalPages || 1);
            setTotalItems(res.data?.totalElements || 0);
            setCurrentPage(res.data?.number || page);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            setData([]);
            setOriginalData([]);
            setTotalPages(1);
            setTotalItems(0);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApi(currentPage);
    }, [currentPage]);

    const removeDiacritics = (str) => {
        if (!str || typeof str !== "string") return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };

    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || "";
        if (!searchTerm) {
            setData(originalData); // Khôi phục dữ liệu gốc nếu không có từ khóa
            return;
        }

        const searchTermNoDiacritics = removeDiacritics(searchTerm);
        const filteredData = originalData.filter((booking) => {
            const tourName = booking.title?.toLowerCase() || "";
            const userName = booking.full_name?.toLowerCase() || "";

            const tourNameNoDiacritics = removeDiacritics(tourName);
            const userNameNoDiacritics = removeDiacritics(userName);
            return (
                tourName.includes(searchTerm) ||
                userName.includes(searchTerm) ||
                tourNameNoDiacritics.includes(searchTermNoDiacritics) ||
                userNameNoDiacritics.includes(searchTermNoDiacritics)
            );
        });

        setData(filteredData);
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý Booking</h1>
            </div>

            <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <CopyPrintComponent
                    data={data}
                    type="booking"
                />
            </div>

            <div className="my-6 flex flex-col items-center gap-2.5 md:flex-row">
                <div className="mb-4 flex w-full items-center space-x-2 sm:mb-0 sm:w-auto">
                    <form
                        onSubmit={handleSubmit(onSearch)}
                        className="inline"
                    >
                        <div className="input flex items-center rounded-md border px-2 py-1">
                            <button
                                type="submit"
                                className="cursor-pointer"
                            >
                                <FaSearch
                                    size={20}
                                    className="text-slate-300"
                                />
                            </button>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Tìm kiếm theo tên tour hoặc người dùng"
                                className="w-full bg-transparent whitespace-nowrap text-slate-900 outline-none placeholder:text-slate-300 dark:text-slate-50 dark:placeholder:text-slate-400"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-10">
                    <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
                    <span className="ml-4 text-lg text-gray-700 dark:text-gray-200">Đang tải...</span>
                </div>
            ) : data.length === 0 ? (
                <p className="text-center text-gray-500">Không có dữ liệu booking</p>
            ) : (
                <BookingTourTable currentEntries={data} />
            )}

            <EntriesFilter
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={(page) => setCurrentPage(page)}
            />

            <div className="mb-4">
                <GoBack />
            </div>
        </div>
    );
}

export default ShowBookingTour;
