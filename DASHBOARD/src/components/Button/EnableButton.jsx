/* eslint-disable no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import icons from "../../util/icon";
import "sweetalert2/src/sweetalert2.scss";
const { IoIosUnlock } = icons;

function EnableButton({ children, onEnable, disabled, confirmText = "Bạn có chắc muốn mở khóa không?", successText = "Đã mở khóa thành công!" }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleEnable = async () => {
        const result = await Swal.fire({
            title: confirmText,
            text: "Hành động này sẽ khôi phục quyền truy cập của người dùng!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Mở khóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            setIsLoading(true);
            try {
                const success = await onEnable();
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
                    text: "Không thể mở khóa. Vui lòng thử lại!",
                    icon: "error",
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <button
            className={`flex h-9 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-green-500 to-teal-500 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:from-green-600 hover:to-teal-600 focus:ring-2 focus:ring-green-400 focus:outline-none ${
                disabled || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleEnable}
            disabled={disabled || isLoading}
            aria-label="Mở khóa người dùng"
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
                <IoIosUnlock className="text-base" />
            )}
            {children || "Mở khóa"}
        </button>
    );
}

export default EnableButton;
