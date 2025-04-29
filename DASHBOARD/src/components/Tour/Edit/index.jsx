import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import EditButton from "../../Button/EditButton";
import { getDataRegion, updateTour } from "../../../services/tourService";
import TourModal from "../ModelTour";

function EditTour({ item }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item || {});
    const [dataRegion, setDataRegion] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [files, setFiles] = useState([]); // Thêm state để lưu trữ danh sách ảnh

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataRegion();
            setDataRegion(result);
        };
        fetchData();
        if (item?.timeline) {
            setTimeline(item.timeline);
        }
    }, [item]);

    const openModal = () => {
        const today = new Date();
        const startDate = new Date(item.startDate + "T00:00:00");

        if (!item.available || startDate <= today) {
            Swal.fire({
                position: "CENTER",
                icon: "warning",
                title: "KHÔNG THỂ SỬA KHI TOUR ĐÃ BẮT ĐẦU HOẶC KHÔNG CÓ SẴN",
                showConfirmButton: true,
                timer: 5000,
            });
            return;
        }
        setData(item);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const renderAnh = () => {
        return files.map((file, index) => (
            <div
                key={index}
                className="m-2"
            >
                <img
                    src={URL.createObjectURL(file)}
                    alt={`Ảnh ${index + 1}`}
                    width="100"
                    className="rounded shadow"
                />
            </div>
        ));
    };

    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        setFiles(uploadedFiles ? Array.from(uploadedFiles) : []);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === "startDate" || name === "endDate") {
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);

            if (!isNaN(start) && !isNaN(end) && end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                updatedData.duration = `${diffDays} ngày`;
                setTimeline(Array.from({ length: diffDays }, () => ({ title: "", content: "" })));
            } else {
                updatedData.duration = "";
            }
        }

        setData(updatedData);
    };

    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...timeline];
        newTimeline[index][field] = value;
        setTimeline(newTimeline);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmResult = await Swal.fire({
            title: "BẠN CÓ MUỐN CẬP NHẬT THÔNG TIN TOUR?",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "LƯU",
            denyButtonText: "KHÔNG LƯU",
        });

        if (confirmResult.isConfirmed) {
            const result = await updateTour(data.tourId, data);
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
            <EditButton onClick={openModal}></EditButton>

            <TourModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                dataRegion={dataRegion}
                timeline={timeline}
                handleChange={handleChange}
                handleTimelineChange={handleTimelineChange}
                handleSubmit={handleSubmit}
                renderAnh={renderAnh} // Truyền hàm renderAnh
                handleImageChange={handleImageChange} // Truyền hàm handleImageChange
                files={files} // Truyền danh sách ảnh
            />
        </>
    );
}

export default EditTour;
