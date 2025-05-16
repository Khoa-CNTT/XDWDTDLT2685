import Swal from "sweetalert2";
import { deleteUser } from "../../../services/userSevice";
import DeleteButton from "../../Button/DeleteButton";

function DeleteUser({ user, onReload }) {
    const handleDeleteUser = async () => {
        try {
            const response = await deleteUser(user.id);
            if (response.success) {
                onReload?.();
                return true;
            }
            // Kiểm tra lỗi 400
            if (response.status === 400) {
                Swal.fire({
                    title: "Lỗi!",
                    text: "Đang đặt tour, không thể xóa!",
                    icon: "error",
                });
                return false;
            }
            // Các lỗi khác
            Swal.fire({
                title: "Lỗi!",
                text: response.data || "Đã xảy ra lỗi khi xóa người dùng!",
                icon: "error",
            });
            return false;
        } catch (error) {
            // Xử lý lỗi từ Axios
            if (error.response?.status === 400) {
                Swal.fire({
                    title: "Lỗi!",
                    text: "Đang đặt tour, không thể xóa!",
                    icon: "error",
                });
            } else {
                Swal.fire({
                    title: "Lỗi!",
                    text: error.response?.data || "Đã xảy ra lỗi khi xóa người dùng!",
                    icon: "error",
                });
            }
            return false;
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
