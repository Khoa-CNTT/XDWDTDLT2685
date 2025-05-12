/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import GoBack from "../../components/GoBack/Goback";
import AdminAvatar from "./Avatar";
import AdminForm from "./Adminform";
import { getInfoAdmin, putChangeInfoAdmin, putProfileImg } from "../../services/adminService";
import Swal from "sweetalert2";

function Admin() {
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userIdToCheck = localStorage.getItem("user_id");
        const fetchApi = async () => {
            try {
                const res = await getInfoAdmin(userIdToCheck);
                if (res.status === 200 && res.data) {
                    setFormData({
                        id: res.data.id || "",
                        user_name: res.data.user_name || "",
                        email: res.data.email || "",
                        phone_number: res.data.phone_number || "",
                        address: res.data.address || "",
                        avatar_path: res.data.avatar_path || "",
                    });
                    if (res.data.avatar_path?.startsWith("http")) {
                        setTempImage(res.data.avatar_path);
                    }
                } else {
                    Swal.fire("Lỗi", "Người dùng không tồn tại", "error");
                }
            } catch (error) {
                Swal.fire("Lỗi", "Có lỗi xảy ra khi lấy thông tin admin", "error");
            }
        };
        fetchApi();
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImageFile(file);
            setTempImage(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Hàm kiểm tra định dạng số điện thoại Việt Nam
    const isValidPhoneNumber = (phone) => {
        const regex = /^(0[2|3|5|7|8|9])+([0-9]{8})$/;
        return regex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userId = localStorage.getItem("user_id");

        try {
            // Upload ảnh avatar nếu có ảnh mới
            if (selectedImageFile) {
                const formDataImage = new FormData();
                formDataImage.append("avatar", selectedImageFile);

                const avatarResponse = await putProfileImg(userId, formDataImage);

                if (avatarResponse.status === 200 && avatarResponse.data.avatar_path) {
                    setFormData((prev) => ({
                        ...prev,
                        avatar_path: avatarResponse.data.avatar_path,
                    }));
                    setTempImage(avatarResponse.data.avatar_path);
                    Swal.fire({
                        title: "Thành công",
                        text: "Cập nhật ảnh đại diện thành công",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire("Lỗi", "Cập nhật ảnh đại diện thất bại", "error");
                }
            }

            // ✅ Kiểm tra số điện thoại hợp lệ trước khi gửi
            if (!isValidPhoneNumber(formData.phone_number)) {
                Swal.fire("Lỗi", "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng!", "error");
                setIsLoading(false);
                return;
            }

            // Cập nhật thông tin khác
            const adminData = {
                user_name: formData.user_name,
                email: formData.email,
                phone_number: formData.phone_number,
                address: formData.address,
            };

            const infoResponse = await putChangeInfoAdmin(userId, adminData);

            if (infoResponse.status === 200) {
                Swal.fire({
                    title: "Thành công",
                    text: "Thông tin đã được cập nhật",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire("Lỗi", "Cập nhật thông tin thất bại", "error");
            }
        } catch (error) {
            Swal.fire("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Thông tin ADMIN</h1>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
                <AdminAvatar
                    tempImage={tempImage}
                    name={formData.user_name}
                    handleImageChange={handleImageChange}
                />
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
