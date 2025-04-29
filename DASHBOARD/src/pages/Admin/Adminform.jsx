import EditButton from "../../components/Button/EditButton";
import PasswordInput from "./PassWord";

function AdminForm({ formData, onChange, onSubmit, showPassword, setShowPassword }) {
    return (
        <div className="w-full p-8 md:w-1/2">
            <form
                onSubmit={onSubmit}
                className="space-y-6"
            >
                <div>
                    <label className="lbl_title block">
                        Tên Admin <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={onChange}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                <PasswordInput
                    show={showPassword}
                    toggleShow={() => setShowPassword((prev) => !prev)}
                    value={formData.password}
                />

                <div>
                    <label className="lbl_title block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="lbl_title block">Địa chỉ</label>
                    <input
                        type="address"
                        name="address"
                        value={formData.address}
                        onChange={onChange}
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <EditButton>Cập nhật</EditButton>
                </div>
            </form>
        </div>
    );
}

export default AdminForm;
