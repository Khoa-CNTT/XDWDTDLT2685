/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Swal } from "sweetalert2/dist/sweetalert2";

function BlockButton({ children, onBlock, disabled, confirmText = "Bạn có chắc muốn khóa không?", successText = "Đã khóa thành công!" }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleBlock = async () => {
        const result = await Swal.fire({
            title: confirmText,
            text: "Hành động này có thể được hoàn tác sau!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Khóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            setIsLoading(true);
            try {
                const success = await onBlock();
                if (success) {
                    Swal.fire({
                        title: successText,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Lỗi",
                    text: "Không thể khóa. Vui lòng thử lại!",
                    icon: "error",
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <button
            className={`focus:ring-opacity-50 w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-200 hover:bg-gradient-to-l focus:ring-2 focus:ring-red-500 focus:outline-none ${
                disabled || isLoading ? "cursor-not-allowed opacity-50" : ""
            } flex items-center justify-center gap-2`}
            onClick={handleBlock}
            disabled={disabled || isLoading}
            aria-label="Khóa người dùng"
        >
            {children || "Khóa"}
        </button>
    );
}

export default BlockButton;
