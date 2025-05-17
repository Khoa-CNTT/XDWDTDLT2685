import { useNavigate } from "react-router-dom";

function GoBack() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={handleOnClick}
            className="flex w-[100px] gap-2 rounded-md bg-gradient-to-r from-gray-400 to-gray-600 px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-700"
        >
            Trở lại
        </button>
    );
}

export default GoBack;
