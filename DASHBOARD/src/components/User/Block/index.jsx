import BlockButton from "../../Button/BlockButton";
import { blockUser } from "../../../services/userSevice";

function BlockUser({ user, onReload }) {
    const handleBlockUser = async () => {
        try {
            const success = await blockUser(user.id);
            if (success && onReload) {
                onReload();
            }
            return success;
        } catch (error) {
            console.error("Block user error:", error);
            throw error;
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
