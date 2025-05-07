import { NavLink } from "react-router-dom";
import EditButton from "../../components/Button/EditButton";

function AdminForm({ formData, onChange, onSubmit }) {
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
                        name="fullname"
                        value={formData.fullname}
                        onChange={onChange}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="lbl_title block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        readOnly
                    />
                </div>
                <div>
                    <label className="lbl_title block">Số điện thoại</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={onChange}
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="lbl_title block">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={onChange}
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>
                <div className="mt-2 text-right">
                    <NavLink
                        to="/admin/change-password"
                        className="text-[#019fb5] hover:underline"
                    >
                        Thay đổi mật khẩu
                    </NavLink>
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <EditButton>Cập nhật</EditButton>
                </div>
            </form>
        </div>
    );
}

export default AdminForm;
