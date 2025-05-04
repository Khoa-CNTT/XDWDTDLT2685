import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function PasswordInput({ show, toggleShow, value }) {
    return (
        <div>
            <label className="lbl_title block">
                Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    name="password"
                    value={value}
                    readOnly
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                />
                <span
                    className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500"
                    onClick={toggleShow}
                >
                    {show ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <div className="mt-2 text-right">
                <NavLink
                    to="/admin/change-password"
                    className="text-[#019fb5] hover:underline"
                >
                    Thay đổi mật khẩu
                </NavLink>
            </div>
        </div>
    );
}

export default PasswordInput;
