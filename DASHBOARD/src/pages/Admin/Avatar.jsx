import { MdOutlineAttachFile } from "react-icons/md";

function AdminAvatar({ tempImage, name, handleImageChange }) {
    return (
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
            <div className="mb-5 h-40 w-40 overflow-hidden rounded-full border-2 border-amber-300 md:h-60 md:w-60">
                <img
                    src={tempImage || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="fileInput"
            />

            <label
                htmlFor="fileInput"
                className="mb-4 flex cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-[#019fb5] to-[#00c0d1] px-5 py-2 text-white shadow-md transition duration-300 hover:scale-105"
            >
                <MdOutlineAttachFile className="mr-2 text-lg" /> Chọn ảnh mới
            </label>
        </div>
    );
}

export default AdminAvatar;
