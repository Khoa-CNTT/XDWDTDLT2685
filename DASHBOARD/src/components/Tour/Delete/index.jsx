import React from "react";
import { deleteTour } from "../../../services/tourService";
import DeleteButton from "../../Button/DeleteButton";

function DeleteTour({ item, onReload }) {
    const handleDeleteTour = async () => {
        const success = await deleteTour(item.id);
        if (success) {
            onReload(); // Reload lại danh sách sau khi xóa thành công
        }
        return success;
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
