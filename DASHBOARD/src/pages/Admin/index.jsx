/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import GoBack from "../../components/GoBack/Goback";
import AdminAvatar from "./Avatar";
import AdminForm from "./Adminform";
import { getInfoAdmin, putChangeInfoAdmin, putProfileImg } from "../../services/adminService";
import Swal from "sweetalert2";

function Admin() {
    // States quản lý các giá trị liên quan đến thông tin admin và hình ảnh
    const [tempImage, setTempImage] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        user_name: "",
        email: "",
        phone_number: "",
        address: "",
        avatar_path: "",
    });
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi đang xử lý

    // useEffect sẽ được chạy một lần khi component được render lần đầu
    useEffect(() => {
        const userIdToCheck = localStorage.getItem("user_id");
        const fetchApi = async () => {
            try {
                const res = await getInfoAdmin(userIdToCheck);
                if (res.status === 200 && res.data) {
                    // Nếu API trả về thành công và có dữ liệu, gán dữ liệu vào formData
                    setFormData({
                        id: res.data.id || "",
                        user_name: res.data.user_name || "",
                        email: res.data.email || "",
                        phone_number: res.data.phone_number || "",
                        address: res.data.address || "",
                        avatar_path: res.data.avatar_path || "",
                    });
                    // Nếu avatar_path bắt đầu bằng "http", thì đây là một URL, gán vào tempImage để hiển thị avatar
                    if (res.data.avatar_path?.startsWith("http")) {
                        setTempImage(res.data.avatar_path);
                    }
                } else {
                    Swal.fire("Lỗi", "Người dùng không tồn tại", "error"); // Hiển thị thông báo lỗi nếu không tìm thấy user
                }
            } catch (error) {
                Swal.fire("Lỗi", "Có lỗi xảy ra khi lấy thông tin admin", "error"); // Thông báo lỗi nếu gọi API thất bại
            }
        };
        fetchApi();
    }, []);

    // Hàm xử lý khi người dùng thay đổi hình ảnh avatar
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImageFile(file);
            setTempImage(URL.createObjectURL(file));
        }
    };

    // Hàm xử lý khi người dùng thay đổi thông tin trong form
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); // Cập nhật giá trị trong formData khi input thay đổi
    };

    // Hàm xử lý khi người dùng submit form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form khi submit
        setIsLoading(true); // Bật trạng thái loading

        const userId = localStorage.getItem("user_id");

        try {
            // Cập nhật avatar nếu có ảnh mới
            if (selectedImageFile) {
                const formDataImage = new FormData();
                formDataImage.append("avatar", selectedImageFile); // Đưa ảnh vào FormData

                const avatarResponse = await putProfileImg(userId, formDataImage); // Gọi API để cập nhật ảnh avatar

                if (avatarResponse.status === 200 && avatarResponse.data.avatar_path) {
                    setFormData((prev) => ({
                        ...prev,
                        avatar_path: avatarResponse.data.avatar_path, // Cập nhật avatar path mới vào formData
                    }));
                    setTempImage(avatarResponse.data.avatar_path); // Cập nhật tempImage để hiển thị avatar mới
                    Swal.fire({
                        title: "Thành công",
                        text: "Cập nhật ảnh đại diện thành công",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        window.location.reload(); // Tải lại trang khi thành công
                    });
                } else {
                    Swal.fire("Lỗi", "Cập nhật ảnh đại diện thất bại", "error"); // Thông báo lỗi nếu cập nhật avatar thất bại
                }
            }

            // Cập nhật thông tin khác (tên, email, số điện thoại, địa chỉ)
            const adminData = {
                user_name: formData.full_name,
                email: formData.email,
                phone_number: formData.phone_number,
                address: formData.address,
            };

            const infoResponse = await putChangeInfoAdmin(userId, adminData); // Gọi API cập nhật thông tin admin
            if (infoResponse.status === 200) {
                Swal.fire({
                    title: "Thành công",
                    text: "Thông tin đã được cập nhật",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload(); // Tải lại trang khi thành công
                });
            } else {
                Swal.fire("Lỗi", "Cập nhật thông tin thất bại", "error"); // Thông báo lỗi nếu cập nhật thông tin thất bại
            }
        } catch (error) {
            Swal.fire("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin", "error"); // Thông báo lỗi nếu có lỗi xảy ra trong quá trình xử lý
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Thông tin ADMIN</h1>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
                {/* Hiển thị avatar admin */}
                <AdminAvatar
                    tempImage={tempImage}
                    name={formData.user_name}
                    handleImageChange={handleImageChange} // Hàm để thay đổi avatar
                />

                {/* Hiển thị form để chỉnh sửa thông tin admin */}
                <AdminForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                />
            </div>
            <GoBack />
        </div>
    );
}

export default Admin;
