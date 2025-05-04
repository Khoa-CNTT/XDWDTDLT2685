import { IoIosAdd } from "react-icons/io";

function AddButton({ onClick, text, color }) {
    // Đặt màu sắc mặc định nếu không truyền vào
    const gradientClass = color || "from-[#019fb5] to-[#00c0d1]";

    return (
        <button
            className={`flex min-w-[180px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${gradientClass} px-4 py-2 text-base text-white shadow-md hover:bg-gradient-to-l focus:outline-none`}
            onClick={onClick}
        >
            <IoIosAdd className="text-xl" /> {text}
        </button>
    );
}

export default AddButton;
