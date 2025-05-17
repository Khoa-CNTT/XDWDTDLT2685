function EntriesFilter({ currentPage, totalPages, onPageChange }) {
    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages.push(0, 1, 2, -1, totalPages - 1);
            } else if (currentPage >= totalPages - 3) {
                pages.push(0, -1, totalPages - 3, totalPages - 2, totalPages - 1);
            } else {
                pages.push(0, -1, currentPage, -2, totalPages - 1);
            }
        }
        return pages;
    };
    if (totalPages <= 1) return null;
    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {/* Nút Prev */}
            <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#065863] to-[#00c0d1] text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                ‹
            </button>

            {/* Các nút số trang */}
            {getPageNumbers().map((number, index) =>
                number === -1 || number === -2 ? (
                    <span
                        key={index}
                        className="w-8 text-center text-gray-500 dark:text-gray-300"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={index}
                        onClick={() => handlePageChange(number)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                            currentPage === number
                                ? "bg-gradient-to-r from-[#058091] to-[#00c0d1] text-white"
                                : "bg-gradient-to-r from-[#019fb5]/80 to-[#00c0d1]/80 text-white hover:from-[#019fb5] hover:to-[#00c0d1]"
                        }`}
                    >
                        {number + 1}
                    </button>
                ),
            )}

            {/* Nút Next */}
            <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#019fb5] to-[#00c0d1] text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                ›
            </button>
        </div>
    );
}

export default EntriesFilter;
