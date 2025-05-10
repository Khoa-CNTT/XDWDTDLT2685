/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { putChangeInfoAdmin } from "../../services/adminService";
import GoBack from "../../components/GoBack/Goback";
import InputPassword from "../../components/InputPass";

const ChangePasswordPage = () => {
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("user_id");
        if (id) setUserId(id);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isStrongPassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    };

    const validateForm = ({ currentPassword, newPassword, confirmPassword }) => {
        const newErrors = {};
        if (!currentPassword) {
            Swal.fire("Thiếu thông tin", "Vui lòng nhập mật khẩu hiện tại", "warning");
            newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
        }
        if (!newPassword) {
            Swal.fire("Thiếu thông tin", "Vui lòng nhập mật khẩu mới", "warning");
            newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
        } else if (!isStrongPassword(newPassword)) {
            Swal.fire("Mật khẩu yếu", "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt", "warning");
            newErrors.newPassword = "Mật khẩu không đủ mạnh";
        }
        if (!confirmPassword) {
            Swal.fire("Thiếu thông tin", "Vui lòng xác nhận mật khẩu mới", "warning");
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
        } else if (newPassword !== confirmPassword) {
            Swal.fire("Không khớp", "Mật khẩu mới và xác nhận không khớp", "warning");
            newErrors.confirmPassword = "Mật khẩu không khớp";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const data = {
                old_password: formData.currentPassword,
                new_password: formData.newPassword,
                confirm_password: formData.confirmPassword,
            };

            try {
                setIsLoading(true);
                const res = await putChangeInfoAdmin(userId, data);
                if (res.status === 200) {
                    await Swal.fire("Thành công", "Đổi mật khẩu thành công!", "success");
                    setFormData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("user_name");
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    await Swal.fire("Thất bại", "Mật khẩu hiện tại không đúng", "warning");
                }
            } catch (error) {
                await Swal.fire("Lỗi", "Không thể kết nối tới máy chủ", "error");
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!userId) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
                <p>Không thể tải thông tin người dùng. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-950 dark:text-white">MẬT KHẨU</h1>
            </div>
            <div className="mx-auto mt-10 max-w-md rounded-xl bg-slate-50 p-6 shadow-xl shadow-gray-500/30 dark:bg-slate-950">
                <h2 className="mb-4 text-center text-2xl font-semibold text-[#019fb5] dark:text-slate-50">Đổi Mật Khẩu</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Mật khẩu hiện tại</label>
                        <InputPassword
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            error={errors.currentPassword}
                            placeholder="Nhập mật khẩu hiện tại"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Mật khẩu mới</label>
                        <InputPassword
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
                            placeholder="Nhập mật khẩu mới"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Xác nhận mật khẩu mới</label>
                        <InputPassword
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            placeholder="Xác nhận mật khẩu mới"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <GoBack
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-gradient-to-r from-[#019fb5] to-[#00c0d1] px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:from-[#018a9f] hover:to-[#00a8bb]"
                            disabled={isLoading}
                        >
                            {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
