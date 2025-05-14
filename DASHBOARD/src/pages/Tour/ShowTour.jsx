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
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
    const limit = 10; // số tour mỗi trang

    const { register, handleSubmit } = useForm();

    const fetchApi = async (page = 0) => {
        try {
            setIsLoading(true); // Bắt đầu loading
            const res = await getDataTour(page, limit);
            if (res.status !== 200) throw new Error(res.data?.error || "Lỗi không xác định");

            const dataArray = res.data?.tours && Array.isArray(res.data.tours) ? res.data.tours : [];

            const updatedData = dataArray.map((tour) => {
                const startDate = tour.startDate ? new Date(tour.startDate) : null;
                const today = new Date();
                const isAvailable = startDate && startDate >= today ? tour.availability : false;
                return { ...tour, availability: isAvailable };
            });

            setData(updatedData);
            setOriginalData(updatedData);

            setTotalPages(res.data.totalPages || Math.ceil((res.data.totalItems || 0) / limit));
            setCurrentPage(res.data.currentPage || page);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            setData([]);
            setOriginalData([]);
            setTotalPages(0);
        } finally {
            setIsLoading(false); // Kết thúc loading
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
            setData(originalData);
            return;
        }

        const searchTermNoDiacritics = removeDiacritics(searchTerm);
        const filteredData = originalData.filter((tour) => {
            const tourName = tour.title?.toLowerCase() || "";
            const tourNameNoDiacritics = removeDiacritics(tourName);
            return tourName.includes(searchTerm) || tourNameNoDiacritics.includes(searchTermNoDiacritics);
        });

        setData(filteredData);
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
                        onSubmit={handleSubmit(onSearch)}
                        className="inline"
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

            {isLoading ? (
                <div className="flex items-center justify-center py-10">
                    <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
                    <span className="ml-4 text-lg text-gray-700 dark:text-gray-200">Đang tải...</span>
                </div>
            ) : (
                <TourTable currentEntries={data} />
            )}

            <EntriesFilter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />

            <div className="mb-4">
                <GoBack />
            </div>
        </div>
    );
}

export default ShowTour;
