import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { putChangeInfoAdmin, getInfoAdmin } from "../../services/adminService";
import icons from "../../util/icon";
import GoBack from "../../components/GoBack/Goback";

const { FaEye, FaEyeSlash } = icons;

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [user, setUser] = useState(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const userIdToCheck = localStorage.getItem("user_id");

        const fetchUser = async () => {
            try {
                const res = await getInfoAdmin(userIdToCheck);
                if (res.status === 200 && res.data) {
                    setUser(res.data); // Store user data (id, user_name, etc.)
                } else {
                    Swal.fire("Lỗi", "Không tìm thấy người dùng hợp lệ", "error");
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin admin:", error);
                Swal.fire("Lỗi", "Không thể lấy thông tin người dùng", "error");
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            Swal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin", "error");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            Swal.fire("Lỗi", "Mật khẩu mới và xác nhận không khớp", "error");
            return;
        }

        try {
            const updatedData = {
                current_password: formData.currentPassword,
                password: formData.newPassword,
            };

            console.log("Dữ liệu gửi đi:", updatedData);

            const response = await putChangeInfoAdmin(user.id, updatedData);

            console.log("Phản hồi từ API:", response);

            if (response.status === 200) {
                Swal.fire("Thành công", "Mật khẩu đã được thay đổi", "success").then(() => {
                    navigate("/admin");
                });
            } else {
                Swal.fire("Lỗi", response.data || "Không thể thay đổi mật khẩu", "error");
            }
        } catch (error) {
            console.error("Lỗi khi thay đổi mật khẩu:", error);
            Swal.fire("Lỗi", error.response?.data || "Không thể thay đổi mật khẩu", "error");
        }
    };
    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-950 dark:text-white">MẬT KHẨU</h1>
            </div>
            <div className="mx-auto mt-10 max-w-md rounded-xl bg-slate-50 p-6 shadow-xl shadow-gray-500/30 dark:bg-slate-900">
                <h2 className="mb-4 text-center text-2xl font-semibold text-[#019fb5] dark:text-slate-50">Đổi Mật Khẩu</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Mật khẩu hiện tại */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Mật khẩu hiện tại</label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                name="currentPassword"
                                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500"
                            >
                                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Mật khẩu mới */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Mật khẩu mới</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500"
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Xác nhận mật khẩu mới</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <GoBack className="ml-2 text-gray-500 hover:text-gray-700" />
                        <button
                            type="submit"
                            className="rounded-md bg-gradient-to-r from-[#019fb5] to-[#00c0d1] px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:from-[#018a9f] hover:to-[#00a8bb]"
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
