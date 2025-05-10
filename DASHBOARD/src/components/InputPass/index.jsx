import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import icons from "../../util/icon";
const { FaEye, FaEyeSlash } = icons;

function InputPassword({ name, value, onChange, error, placeholder = "Mật khẩu" }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                name={name} // Thêm prop name để onChange có thể lấy được
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`h-12 w-full rounded-2xl border-2 ${
                    error ? "border-red-500" : "border-[#019fb5]"
                } bg-transparent px-5 pr-12 text-lg text-white placeholder-[#019fb5] focus:outline-none dark:border-[#019fb5] dark:bg-slate-950 dark:text-white dark:placeholder-[#019fb5]`} // Thêm lớp cho dark mode
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-10 -translate-y-1/2 text-xl text-[#019fb5] focus:outline-none dark:text-[#019fb5]"
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <RiLockPasswordFill className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#019fb5] dark:text-[#019fb5]" />
            {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>} {/* Hiển thị lỗi nếu có */}
        </div>
    );
}

export default InputPassword;
