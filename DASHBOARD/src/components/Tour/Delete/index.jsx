import React from "react";
import Swal from "sweetalert2";
import { deleteTour } from "../../../services/tourService";
import DeleteButton from "../../Button/DeleteButton";

function DeleteTour({ item, onReload }) {
    const handleDeleteTour = async () => {
        // Hiển thị xác nhận trước khi xóa
        const confirmResult = await Swal.fire({
            title: "Bạn có chắc muốn xóa tour này không?",
            text: `Tour: ${item.title || "ID " + item.id}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (!confirmResult.isConfirmed) {
            return false;
        }

        try {
            const result = await deleteTour(item.id);

            if (result.status === 200) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: result.data.message || "Tour đã được xóa thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                onReload(); // Reload danh sách tour
                return true;
            } else if (result.status === 404) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: result.data.error || "Lỗi",
                    text: result.data.message || "Không tìm thấy tour",
                    confirmButtonColor: "#d33",
                });
            } else if (result.status >= 500) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Lỗi máy chủ",
                    text: result.data.details || result.data.error || "Có lỗi xảy ra khi xóa tour do vấn đề cơ sở dữ liệu. Vui lòng kiểm tra lại.",
                    confirmButtonColor: "#d33",
                });
            } else {
                throw new Error(result.data.details || result.data.error || "Lỗi không xác định");
            }
        } catch (error) {
            console.error("Error deleting tour with ID", item.id, ":", error);
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Lỗi khi xóa tour",
                text: error.message || "Vui lòng thử lại sau",
                confirmButtonColor: "#d33",
            });
            return false;
        }
    };

    return (
        <DeleteButton
            onDelete={handleDeleteTour}
            confirmText="Bạn có chắc muốn xóa tour này không?"
            successText="Tour đã được xóa thành công!"
        />
    );
}

export default DeleteTour;
