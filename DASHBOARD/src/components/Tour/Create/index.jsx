import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import icons from "../../../util/icon";
import { createDataTour, getDataRegion, getDataTour } from "../../../services/tourService";
import TourModal from "../ModelTour";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;

function CreateTour() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [files, setFiles] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [dataRegion, setDataRegion] = useState([]);
    const [existingTours, setExistingTours] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const regions = await getDataRegion();
            const tours = await getDataTour();
            setDataRegion(regions);
            setExistingTours(tours);
        };
        fetchData();
    }, []);

    const handleReload = () => setReload(!reload);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleCreate = async (e) => {
        e.preventDefault();

        const isDuplicate = existingTours.some((tour) => tour.tourName.toLowerCase().trim() === data.tourName?.toLowerCase().trim());

        if (isDuplicate) {
            Swal.fire({
                icon: "error",
                title: "Tour đã tồn tại",
                text: "Vui lòng chọn tên tour khác.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        // Gửi dữ liệu bao gồm cả hình ảnh
        const formData = new FormData();
        formData.append("data", JSON.stringify({ ...data, timeline }));

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

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
                dataRegion={dataRegion}
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
