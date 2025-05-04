import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import icons from "../../util/icon";

const { MdDelete } = icons;

function DeleteButton({
    onDelete,
    confirmText = "Bạn có chắc muốn xóa không?",
    successText = "Đã xóa thành công!",
    children, // nhận nội dung từ cha
}) {
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: confirmText,
            text: "Không thể quay lại sau khi xóa!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vẫn xóa!",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            const success = await onDelete();
            if (success) {
                Swal.fire({
                    title: successText,
                    text: "Dữ liệu đã được xóa.",
                    icon: "success",
                    timer: 5000,
                });
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="flex h-9 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[hsla(350,93%,61%,1)] to-[hsla(8,98%,59%,1)] px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:from-[hsla(350,93%,55%,1)] hover:to-[hsla(8,98%,50%,1)] focus:ring-2 focus:ring-red-400 focus:outline-none"
        >
            <MdDelete className="text-base" />
            {children && <span>{children}</span>}
        </button>
    );
}
export default DeleteButton;
