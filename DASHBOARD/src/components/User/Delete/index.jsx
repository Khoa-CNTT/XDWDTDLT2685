import Swal from "sweetalert2";
import { deleteUser } from "../../../services/userSevice";
import DeleteButton from "../../Button/DeleteButton";

function DeleteUser({ user, onReload }) {
    const handleDeleteUser = async () => {
        const response = await deleteUser(user.id);
        if (response.success) {
            onReload?.(); // Gọi reload nếu có callback
            return true; // Trả về true để hiển thị thông báo thành công
        }
        Swal.fire({
            title: "Lỗi!",
            text: response.message,
            icon: "error",
        });
        return false;
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
