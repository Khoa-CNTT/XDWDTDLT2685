import icons from "../../util/icon";
const { IoMdCreate } = icons;
function EditButton({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="flex h-9 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[#019fb5] to-[#00c0d1] px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:from-[#018ea3] hover:to-[#00adc0] focus:ring-2 focus:ring-cyan-300 focus:outline-none"
        >
            <IoMdCreate className="text-base" />
            {children && <span>{children}</span>}
        </button>
    );
}

export default EditButton;
