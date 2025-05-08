import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import icons from "../../util/icon";
import CopyPrintComponent from "../../components/Tool";
import { getDataTour } from "../../services/tourService";
import EntriesFilter from "../../components/Pagination";
import TourTable from "./TourTable";
import GoBack from "../../components/GoBack/Goback";
import CreateTour from "../../components/Tour/Create";

const { FaSearch } = icons;

function ShowTour() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                // Gọi API để lấy dữ liệu tour
                const res = await getDataTour();

                // Nếu API trả về dữ liệu tour hợp lệ, cập nhật vào state
                const dataArray = res.data?.tours && Array.isArray(res.data.tours) ? res.data.tours.reverse() : [];

                setData(dataArray); // Cập nhật dữ liệu tour vào state data
                setOriginalData(dataArray); // Cập nhật dữ liệu gốc vào state originalData
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setData([]); // Nếu có lỗi, set data thành mảng rỗng
                setOriginalData([]); // Nếu có lỗi, set originalData thành mảng rỗng
            }
        };
        fetchApi();
    }, []);

    // Hàm loại bỏ dấu tiếng Việt trong chuỗi
    const removeDiacritics = (str) => {
        if (!str || typeof str !== "string") return "";
        return str
            .normalize("NFD") // Chuẩn hóa chuỗi
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự dấu
            .replace(/đ/g, "d") // Thay thế chữ 'đ' thành 'd'
            .replace(/Đ/g, "D"); // Thay thế chữ 'Đ' thành 'D'
    };

    // Hàm xử lý tìm kiếm tour theo tên
    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || ""; // Lấy giá trị tìm kiếm và chuyển thành chữ thường
        if (!searchTerm) {
            setData(originalData); // Nếu không có từ tìm kiếm, hiển thị lại dữ liệu gốc
            return;
        }

        // Loại bỏ dấu cho từ tìm kiếm và các tên tour trong dữ liệu
        const searchTermNoDiacritics = removeDiacritics(searchTerm);
        const filteredData = originalData.filter((tour) => {
            const tourName = tour.title?.toLowerCase() || ""; // Lấy tên tour và chuyển thành chữ thường
            const tourNameNoDiacritics = removeDiacritics(tourName);
            // So sánh từ tìm kiếm với tên tour (có và không có dấu)
            return tourName.includes(searchTerm) || tourNameNoDiacritics.includes(searchTermNoDiacritics);
        });

        setData(filteredData); // Cập nhật lại dữ liệu tour sau khi lọc theo tìm kiếm
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Tour</h1>
            </div>

            <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <CopyPrintComponent
                    data={data}
                    type="tour"
                />
            </div>

            <div className="my-6 flex flex-col items-center gap-2.5 md:flex-row">
                <div className="mb-4 flex w-full items-center space-x-2 sm:mb-0 sm:w-auto">
                    <CreateTour />
                    <form
                        className="inline"
                        onSubmit={handleSubmit(onSearch)}
                    >
                        <div className="input flex items-center">
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
                                placeholder="Tìm kiếm theo tên tour"
                                className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50 dark:placeholder:text-slate-400"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Hiển thị bảng tour qua EntriesFilter + TourTable */}
            <EntriesFilter data={data}>{(currentEntries) => <TourTable currentEntries={currentEntries} />}</EntriesFilter>
            <div className="mb-4">
                <GoBack />
            </div>
        </div>
    );
}

export default ShowTour;
