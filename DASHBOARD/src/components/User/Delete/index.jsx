import React from "react";
import DeleteButton from "../../Button/DeleteButton";
import { deleteUser } from "../../../services/userSevice";

function DeleteUser({ user, onReload }) {
    const handleDeleteUser = async () => {
        const success = await deleteUser(user.id);
        if (success) {
            onReload();
        }
        return success;
    };

    return (
        <DeleteButton
            onDelete={handleDeleteUser}
            confirmText="Bạn có chắc muốn xóa người dùng này không?"
            successText="Người dùng đã được xóa thành công!"
        >
            Xóa
        </DeleteButton>
    );
}

export default DeleteUser;
