/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getDataUser } from "../../services/userSevice";
import { useForm } from "react-hook-form";
import UserPr from "./UserPr";
import icons from "../../util/icon";
import GoBack from "../../components/GoBack/Goback";
import CreateUser from "../../components/User/Create";
const { FaSearch } = icons;
function User() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const { register, handleSubmit } = useForm(); // Hook để quản lý form

    // useEffect gọi API để tải dữ liệu người dùng khi component được render lần đầu
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataUser(); // Gọi API để lấy dữ liệu người dùng
                console.log("Dữ liệu người dùng:", res.data);
                const dataArray = (res.data.users || []).reverse(); // Lấy danh sách người dùng và đảo ngược thứ tự
                setData(dataArray);
                setOriginalData(dataArray);
            } catch (error) {
                setData([]);
                setOriginalData([]);
            }
        };
        fetchApi();
    }, []);

    // Hàm loại bỏ dấu tiếng Việt trong chuỗi
    const removeDiacritics = (str) => {
        if (!str || typeof str !== "string") return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
            .replace(/đ/g, "d") // Thay thế "đ" thành "d"
            .replace(/Đ/g, "D"); // Thay thế "Đ" thành "D"
    };

    // Hàm tìm kiếm người dùng
    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || ""; // Lấy từ khóa tìm kiếm từ form, chuyển thành chữ thường
        if (searchTerm === "") {
            setData(originalData); // Nếu không có từ khóa, hiển thị lại tất cả dữ liệu
            return;
        }

        const searchTermNoDiacritics = removeDiacritics(searchTerm); // Loại bỏ dấu trong từ khóa tìm kiếm
        const filteredData = originalData.filter((user) => {
            const userName = user.name && typeof user.name === "string" ? user.name.toLowerCase() : ""; // Lấy tên người dùng, chuyển thành chữ thường
            const userNameNoDiacritics = removeDiacritics(userName); // Loại bỏ dấu trong tên người dùng
            return userName.includes(searchTerm) || userNameNoDiacritics.includes(searchTermNoDiacritics); // Kiểm tra xem tên người dùng có chứa từ khóa không
        });

        setData(filteredData); // Cập nhật danh sách người dùng sau khi lọc
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý người dùng</h1>
            </div>

            {/* Search + Add User */}
            <div className="my-6 flex flex-col items-center gap-2 md:flex-row">
                <div className="mb-4 flex w-full items-center space-x-2 sm:mb-0 sm:w-auto">
                    <CreateUser />
                    <form
                        className="inline w-full sm:w-auto"
                        onSubmit={handleSubmit(onSearch)} // Khi form được submit, gọi hàm onSearch
                    >
                        <div className="input flex w-full items-center sm:w-auto">
                            <button
                                type="submit"
                                className="cursor-pointer"
                            >
                                <FaSearch
                                    size={20}
                                    className="text-slate-300"
                                />
                            </button>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Tìm kiếm"
                                className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 sm:w-64 dark:text-slate-50"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* User List */}
            <div className="mt-0 grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <UserPr
                            key={index}
                            user={user} // Truyền dữ liệu người dùng vào component UserPr
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p> // Thông báo nếu không có người dùng
                )}
            </div>

            {/* Nút trở lại */}
            <div className="mt-20 mb-20">
                <GoBack /> {/* Component hiển thị nút quay lại */}
            </div>
        </div>
    );
}

export default User;
