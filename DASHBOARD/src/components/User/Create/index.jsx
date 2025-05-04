/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { createDataUser } from "../../../services/userSevice";
import { generateToken } from "../../../helpers/generateTonken";
import UserModal from "../ModelUser";
import AddButton from "../../Button/CreateButton";

function CreateUser() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [reload, setReload] = useState(false);

    const handleReload = () => setReload(!reload);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setData({});
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // Cập nhật dữ liệu khi người dùng nhập
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = { ...data };

        // Nếu cần thêm các trường mặc định, có thể thêm tại đây
        finalData.userId = data.userId || `user${Date.now().toString().slice(-3)}`;
        finalData.token = generateToken();

        const result = await createDataUser(finalData);

        if (result) {
            setShowModal(false);
            handleReload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Tạo mới thành công!",
                showConfirmButton: false,
                timer: 5000,
            });
        }
    };

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm người dùng"
            />

            <UserModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                mode="create"
            />
        </>
    );
}

export default CreateUser;
