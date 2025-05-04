/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { editUser } from "../../../services/userSevice";
import UserModal from "../ModelUser";
import EditButton from "../../Button/EditButton";

function EditUser({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(user);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

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
        const confirmResult = await Swal.fire({
            title: "BẠN CÓ MUỐN CẬP NHẬT THÔNG TIN?",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "LƯU",
            denyButtonText: "KHÔNG LƯU",
        });
        if (confirmResult.isConfirmed) {
            const result = await editUser(user.id, data);
            if (result) {
                setShowModal(false);
                Swal.fire({
                    title: "CẬP NHẬT THÀNH CÔNG",
                    icon: "success",
                    timer: 5000,
                });
            } else {
                Swal.fire({
                    title: "CẬP NHẬT THẤT BẠI",
                    icon: "error",
                    timer: 5000,
                });
            }
        } else if (confirmResult.isDenied) {
            Swal.fire("KHÔNG LƯU THAY ĐỔI", "", "info");
        }
    };

    return (
        <>
            <EditButton onClick={openModal}>Sửa</EditButton>

            <UserModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                mode="edit"
            />
        </>
    );
}

export default EditUser;
