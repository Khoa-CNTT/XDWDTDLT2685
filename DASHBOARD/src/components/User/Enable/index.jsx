import { enableUser } from "../../../services/userSevice";
import EnableButton from "../../Button/EnableButton";

function EnableUser({ user, onReload }) {
    const handleEnableUser = async () => {
        try {
            const response = await enableUser(user.id);
            if (response.status === 200 && onReload) {
                onReload();
            }
            return response.status === 200;
        } catch (error) {
            console.error("Lỗi khi mở khóa người dùng:", error);
            return false;
        }
    };

    return (
        <EnableButton
            onEnable={handleEnableUser}
            confirmText="Bạn có chắc muốn mở khóa người dùng này không?"
            successText="Người dùng đã được mở khóa thành công!"
        >
            Mở khóa
        </EnableButton>
    );
}

export default EnableUser;
