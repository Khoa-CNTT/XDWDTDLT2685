import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import icons from "../../util/icon";
const { FaEye, FaEyeSlash } = icons;
function InputPassword({ value, onChange, error, placeholder = "Mật khẩu" }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`h-12 w-full rounded-full border-2 ${
                    error ? "border-red-500" : "border-[#019fb5]"
                } bg-transparent px-5 pr-12 text-lg text-white placeholder-[#019fb5] focus:outline-none`}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-10 -translate-y-1/2 text-xl text-[#019fb5] focus:outline-none"
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <RiLockPasswordFill className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#019fb5]" />
        </div>
    );
}

export default InputPassword;
