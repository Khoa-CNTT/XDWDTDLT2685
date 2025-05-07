import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import icons from "../../../util/icon";
import { createDataTour, getDataTour } from "../../../services/tourService";
import TourModal from "../ModelTour";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;

function CreateTour() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        duration: 0,
        availability: true,
    });
    const [files, setFiles] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [existingTours, setExistingTours] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tours = await getDataTour();
                const tourData = tours?.data && Array.isArray(tours.data) ? tours.data : [];
                setExistingTours(tourData);
            } catch (error) {
                console.error("Error fetching tours:", error);
                setExistingTours([]);
            }
        };
        fetchData();
    }, [reload]);

    const handleReload = () => setReload(!reload);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleCreate = async (e) => {
        e.preventDefault();

        // Kiểm tra existingTours có phải mảng không trước khi gọi .some
        const isDuplicate =
            Array.isArray(existingTours) && existingTours.some((tour) => tour.title?.toLowerCase().trim() === data.title?.toLowerCase().trim());

        if (isDuplicate) {
            Swal.fire({
                icon: "error",
                title: "Tour đã tồn tại",
                text: "Vui lòng chọn tên tour khác.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const itinerary = timeline.map((day, index) => ({
            day: index + 1,
            title: day.title || "",
            content: day.content ? [day.content] : [],
        }));

        const formData = new FormData();
        const tourData = {
            title: data.title || "",
            description: data.description || "",
            quantity: parseInt(data.quantity) || 0,
            price_adult: parseFloat(data.price_adult) || 0,
            price_child: parseFloat(data.price_child) || 0,
            duration: data.date ? `${data.date} ngày - ${data.date - 1} đêm` : "",
            destination: data.location || "",
            availability: data.availability ?? true,
            itinerary: itinerary.length > 0 ? JSON.stringify(itinerary) : null,
            region: data.region || "NORTH",
            startDate: data.startDate || null,
            endDate: data.endDate || null,
        };

        formData.append("data", JSON.stringify(tourData));
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        try {
            const result = await createDataTour(formData);
            if (result) {
                setShowModal(false);
                handleReload();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tạo mới thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (error) {
            console.error("Error creating tour:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể tạo tour. Vui lòng thử lại.",
                confirmButtonColor: "#d33",
            });
        }
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
                updatedData.date = diffDays;
                setTimeline(Array.from({ length: diffDays }, () => ({ title: "", content: "" })));
            } else {
                updatedData.date = 0;
                setTimeline([]);
            }
        }

        setData(updatedData);
    };

    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        if (uploadedFiles.length > 0) {
            setFiles(Array.from(uploadedFiles));
        }
    };

    const renderAnh = () => (
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
    );

    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...timeline];
        newTimeline[index][field] = value;
        setTimeline(newTimeline);
    };

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm Tour mới"
                icon={<IoIosAdd />}
            />

            <TourModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                timeline={timeline}
                handleChange={handleChange}
                handleTimelineChange={handleTimelineChange}
                handleSubmit={handleCreate}
                renderAnh={renderAnh}
                handleImageChange={handleImageChange}
                files={files}
            />
        </>
    );
}

export default CreateTour;
