import { useEffect, useState } from "react";

import { getDataUser } from "../../services/userSevice";
import GoBack from "../../components/GoBack/Goback";
import AdminAvatar from "./Avatar";
import AdminForm from "./Adminform";

function Admin() {
    const [tempImage, setTempImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        avatar: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchApi = async () => {
            try {
                const res = await getDataUser();
                const currentUser = res.find((user) => user.token === token);
                if (currentUser) {
                    setFormData({
                        id: currentUser.id,
                        name: currentUser.name,
                        email: currentUser.email,
                        address: currentUser.address,
                        password: currentUser.password,
                        avatar: currentUser.avatar || "",
                    });
                    if (currentUser.avatar?.startsWith("http")) {
                        setTempImage(currentUser.avatar);
                    }
                } else {
                    alert("Người dùng không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchApi();
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setTempImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectedImage(tempImage || selectedImage);
        alert("Thông tin đã được cập nhật!");
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Thông tin ADMIN</h1>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
                <AdminAvatar
                    tempImage={tempImage}
                    avatarUrl={formData.avatar}
                    name={formData.name}
                    handleImageChange={handleImageChange}
                />
                <AdminForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            </div>
            <GoBack />
        </div>
    );
}

export default Admin;
