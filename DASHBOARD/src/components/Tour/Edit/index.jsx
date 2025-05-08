/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditButton from "../../Button/EditButton";
import { updateTour, uploadImageTour } from "../../../services/tourService";
import TourModal from "../ModelTour";

const dataRegion = [
    { displayName: "Miền Bắc", value: "NORTH" },
    { displayName: "Miền Trung", value: "CENTRAL" },
    { displayName: "Miền Nam", value: "SOUTH" },
];

function EditTour({ item }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item || {});
    const [itinerary, setItinerary] = useState(item?.itinerary || []);
    const [files, setFiles] = useState([]);

    // Cập nhật lại data và itinerary mỗi khi item (props) thay đổi
    useEffect(() => {
        if (item) {
            setData(item);
            setItinerary(item.itinerary || []);
        }
    }, [item]);

    // Hàm mở modal chỉnh sửa tour
    const openModal = () => {
        const today = new Date();
        const startDate = new Date(item.startDate + "T00:00:00");

        // Ngăn không cho sửa nếu tour đã bắt đầu hoặc không còn trống
        if (!item.availability || startDate <= today) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Không thể chỉnh sửa tour đã bắt đầu hoặc không còn trống",
                showConfirmButton: true,
                timer: 5000,
            });
            return;
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFiles([]);
    };

    // Hàm xử lý khi người dùng chọn ảnh mới
    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        setFiles(uploadedFiles ? Array.from(uploadedFiles) : []);
    };

    // Hàm xử lý thay đổi các input trong form (data tour)
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "availability") {
            updatedData[name] = value === "true";
        } else {
            updatedData[name] = value;
        }

        // Khi thay đổi ngày bắt đầu/kết thúc -> tính lại duration + itinerary
        if (name === "startDate" || name === "endDate") {
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);
            if (!isNaN(start) && !isNaN(end) && end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                updatedData.duration = `${diffDays} ngày ${diffDays - 1} đêm`;
                setItinerary(
                    Array.from({ length: diffDays }, (_, index) => ({
                        day: index + 1,
                        title: itinerary[index]?.title || "",
                        content: itinerary[index]?.content || [],
                    })),
                );
            } else {
                updatedData.duration = "";
                setItinerary([]);
            }
        }

        setData(updatedData);
    };

    // Hàm xử lý khi thay đổi chi tiết từng ngày trong itinerary
    const handleItineraryChange = (index, field, value) => {
        const newItinerary = [...itinerary];
        if (field === "add") {
            // Thêm ngày mới
            newItinerary.push({ day: newItinerary.length + 1, title: "", content: [] });
        } else if (field === "remove") {
            // Xóa ngày
            newItinerary.splice(index, 1);
            newItinerary.forEach((item, i) => (item.day = i + 1));
        } else {
            // Cập nhật title hoặc content
            newItinerary[index] = {
                ...newItinerary[index],
                [field]: field === "content" ? value.split("\n").filter(Boolean) : value,
            };
        }
        setItinerary(newItinerary);
    };

    // Hàm submit cập nhật tour (dữ liệu + ảnh)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmResult = await Swal.fire({
            title: "Bạn có muốn cập nhật thông tin tour?",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Lưu",
            denyButtonText: "Không lưu",
            cancelButtonText: "Hủy",
        });

        if (confirmResult.isConfirmed) {
            // Chuẩn bị dữ liệu để gửi API
            const apiData = {
                ...data,
                itinerary: itinerary.map((item, index) => ({
                    day: index + 1,
                    title: item.title,
                    content: Array.isArray(item.content) ? item.content : item.content.split("\n").filter(Boolean),
                })),
            };

            try {
                // Gọi API cập nhật tour
                const result = await updateTour(data.tourId, apiData);
                if (result.status === 200 || result.status === 201) {
                    // Nếu có ảnh → tải ảnh lên server
                    if (files.length > 0) {
                        const formData = new FormData();
                        files.forEach((file) => formData.append("images", file));
                        const uploadResult = await uploadImageTour(data.tourId, formData);
                        if (uploadResult.status !== 200) {
                            console.warn("Upload ảnh thất bại:", uploadResult.data);
                        }
                    }

                    setShowModal(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Cập nhật tour thành công!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    throw new Error("Cập nhật tour thất bại");
                }
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Cập nhật tour thất bại",
                    text: "Vui lòng thử lại.",
                    confirmButtonColor: "#d33",
                });
            }
        } else if (confirmResult.isDenied) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Không lưu thay đổi",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    // Hàm hiển thị ảnh preview trước khi upload
    const renderAnh = () =>
        files.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-4">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="h-24 w-24 overflow-hidden rounded shadow"
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`Ảnh ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        ) : null;

    return (
        <>
            <EditButton onClick={openModal} />
            <TourModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                dataRegion={dataRegion}
                itinerary={itinerary}
                handleChange={handleChange}
                handleItineraryChange={handleItineraryChange}
                handleSubmit={handleSubmit}
                renderAnh={renderAnh}
                handleImageChange={handleImageChange}
                files={files}
            />
        </>
    );
}

export default EditTour;
