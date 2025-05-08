import DeleteButton from "../../Button/DeleteButton";
import { deleteUser } from "../../../services/userSevice";

function DeleteUser({ user, onReload }) {
    const handleDeleteUser = async () => {
        try {
            const success = await deleteUser(user.id);
            if (success && onReload) {
                onReload();
            }
            return success;
        } catch (error) {
            console.error("Delete user error:", error);
            throw error;
        }
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
