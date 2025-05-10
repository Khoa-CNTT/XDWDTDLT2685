import { blockUser } from "../../../services/userSevice";
import BlockButton from "../../Button/BlockButton";

function BlockUser({ user, onReload }) {
    const handleBlockUser = async () => {
        try {
            const response = await blockUser(user.id);
            if (response.status === 200 && onReload) {
                onReload();
            }
            return response.status === 200;
        } catch (error) {
            console.error("Lỗi khi khóa người dùng:", error);
            return false;
        }
    };

    return (
        <BlockButton
            onBlock={handleBlockUser}
            confirmText="Bạn có chắc muốn khóa người dùng này không?"
            successText="Người dùng đã được khóa thành công!"
        >
            Khóa
        </BlockButton>
    );
}

export default BlockUser;
