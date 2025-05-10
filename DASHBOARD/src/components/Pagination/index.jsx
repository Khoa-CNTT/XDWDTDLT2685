import { useState, useEffect } from "react";

function EntriesFilter({ data, children }) {
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEntries, setCurrentEntries] = useState([]);

    const totalPages = Math.ceil(data.length / entriesPerPage);

    useEffect(() => {
        const start = (currentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        setCurrentEntries(data.slice(start, end));
    }, [currentPage, entriesPerPage, data]);

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Show max 5 pages centered around currentPage
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <>
            <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center space-x-2">
                    <label
                        htmlFor="entries"
                        className="text-sm font-medium dark:text-white"
                    >
                        Hiển thị
                    </label>
                    <select
                        id="entries"
                        className="rounded-md border px-2 py-1 dark:bg-slate-800 dark:text-white"
                        value={entriesPerPage}
                        onChange={handleEntriesChange}
                    >
                        <option value={5}>5</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="text-sm dark:text-white">mục</span>
                </div>
            </div>

            {/* Render the table with paginated data */}
            {children(currentEntries)}

            {/* Pagination controls below the table */}
            {totalPages > 1 && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#019fb5] to-[#00c0d1] text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>

                    {getPageNumbers().map((number) => (
                        <button
                            key={number}
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                                currentPage === number
                                    ? "bg-gradient-to-r from-[#019fb5] to-[#00c0d1] text-white"
                                    : "bg-gradient-to-r from-[#019fb5]/80 to-[#00c0d1]/80 text-white hover:from-[#019fb5] hover:to-[#00c0d1]"
                            }`}
                            onClick={() => handlePageChange(number)}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#019fb5] to-[#00c0d1] text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            )}
        </>
    );
}

export default EntriesFilter;
