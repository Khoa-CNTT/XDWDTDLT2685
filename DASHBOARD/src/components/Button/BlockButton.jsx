/* eslint-disable no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import icons from "../../util/icon";
const { IoIosLock } = icons;
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
                    window.location.reload();
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
            className={`flex h-9 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:from-red-600 hover:to-pink-600 focus:ring-2 focus:ring-red-400 focus:outline-none ${
                disabled || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleBlock}
            disabled={disabled || isLoading}
            aria-label="Khóa người dùng"
        >
            {isLoading ? (
                <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                    />
                </svg>
            ) : (
                <IoIosLock className="text-base" />
            )}
            {children || "Khóa"}
        </button>
    );
}

export default BlockButton;
