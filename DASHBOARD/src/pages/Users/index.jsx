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
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataUser();
                console.log("Dữ liệu người dùng:", res.data);
                const dataArray = (res.data.users || []).reverse();
                setData(dataArray);
                setOriginalData(dataArray);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setData([]);
                setOriginalData([]);
            }
        };
        fetchApi();
    }, []);

    const removeDiacritics = (str) => {
        if (!str || typeof str !== "string") return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };

    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || "";
        if (searchTerm === "") {
            setData(originalData);
            return;
        }

        const searchTermNoDiacritics = removeDiacritics(searchTerm);
        const filteredData = originalData.filter((user) => {
            const userName = user.name && typeof user.name === "string" ? user.name.toLowerCase() : "";
            const userNameNoDiacritics = removeDiacritics(userName);
            return userName.includes(searchTerm) || userNameNoDiacritics.includes(searchTermNoDiacritics);
        });

        setData(filteredData);
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
                        onSubmit={handleSubmit(onSearch)}
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
                            user={user}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p>
                )}
            </div>

            {/* Nút trở lại */}
            <div className="mt-20 mb-20">
                <GoBack />
            </div>
        </div>
    );
}

export default User;
