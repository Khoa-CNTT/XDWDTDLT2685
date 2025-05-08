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
            console.log("Delete tour response:", result); // Debug

            if (result.status === 200 || result.status === 204) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tour đã được xóa thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                onReload(); // Reload danh sách tour
                return true;
            } else {
                throw new Error(result.data || "Lỗi khi xóa tour");
            }
        } catch (error) {
            console.error("Error deleting tour:", error);
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
