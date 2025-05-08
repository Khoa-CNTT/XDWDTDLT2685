/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import icons from "../../../util/icon";
import { createDataTour, uploadImageTour, getDataTour } from "../../../services/tourService";
import TourModal from "../ModelTour";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;

// Danh sách vùng miền cho tour
const dataRegion = [
    { displayName: "Miền Bắc", value: "NORTH" },
    { displayName: "Miền Trung", value: "CENTRAL" },
    { displayName: "Miền Nam", value: "SOUTH" },
];

function CreateTour({ onTourCreated }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        destination: "",
        duration: "",
        quantity: 0,
        price_adult: 0,
        price_child: 0,
        availability: true,
        region: "",
        startDate: "",
        endDate: "",
    });
    const [files, setFiles] = useState([]); // Lưu ảnh upload
    const [itinerary, setItinerary] = useState([]); // Lưu lịch trình tour
    const [existingTours, setExistingTours] = useState([]); // Dữ liệu tour hiện có để kiểm tra trùng lặp
    const [isLoading, setIsLoading] = useState(false);

    // Khi component mount, gọi API để lấy danh sách tour hiện có
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDataTour();
                const tours = response?.data?.tours || [];
                if (!Array.isArray(tours)) {
                    throw new Error("Dữ liệu tour không hợp lệ");
                }
                setExistingTours(tours);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu tour:", error);
                setExistingTours([]);
            }
        };
        fetchData();
    }, []);

    const openModal = () => setShowModal(true);

    // Đóng modal và reset form
    const closeModal = () => {
        setShowModal(false);
        setData({
            title: "",
            description: "",
            destination: "",
            duration: "",
            quantity: 0,
            price_adult: 0,
            price_child: 0,
            availability: true,
            region: "",
            startDate: "",
            endDate: "",
        });
        setFiles([]);
        setItinerary([]);
    };

    // Xử lý xóa ảnh tại index cụ thể
    const handleDeleteImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Xử lý tạo tour mới
    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Kiểm tra dữ liệu hợp lệ
        if (!Array.isArray(existingTours)) {
            Swal.fire({
                icon: "error",
                title: "Lỗi dữ liệu",
                text: "Dữ liệu tour không hợp lệ. Vui lòng thử lại.",
                confirmButtonColor: "#d33",
            });
            setIsLoading(false);
            return;
        }

        // Kiểm tra tên tour đã tồn tại chưa
        const isDuplicate = existingTours.some((tour) => tour.title?.toLowerCase().trim() === data.title?.toLowerCase().trim());

        if (isDuplicate) {
            Swal.fire({
                icon: "error",
                title: "Tour đã tồn tại",
                text: "Vui lòng chọn tên tour khác.",
                confirmButtonColor: "#d33",
            });
            setIsLoading(false);
            return;
        }

        // Chuẩn bị dữ liệu gửi đi, định dạng lịch trình
        const apiData = {
            ...data,
            itinerary: itinerary.map((item, index) => ({
                day: index + 1,
                title: item.title,
                content: Array.isArray(item.content) ? item.content : item.content.split("\n").filter(Boolean),
            })),
        };

        try {
            // Gửi request tạo tour
            const result = await createDataTour(apiData);

            if (result.status === 201 || result.status === 200) {
                const tourId = result.data.id;
                let imageUploadSuccess = true;

                // Nếu có ảnh, thực hiện upload ảnh
                if (files.length > 0) {
                    const formData = new FormData();
                    files.forEach((file) => formData.append("images", file));

                    const uploadResult = await uploadImageTour(tourId, formData);
                    console.log("Upload ảnh:", uploadResult.data);

                    if (uploadResult.status !== 200) {
                        imageUploadSuccess = false;
                        console.warn("Upload ảnh thất bại:", uploadResult.data);
                    }
                }

                // Hiển thị thông báo kết quả
                setShowModal(false);
                Swal.fire({
                    position: "center",
                    icon: imageUploadSuccess ? "success" : "warning",
                    title: imageUploadSuccess ? "Tạo tour thành công!" : "Tạo tour thành công nhưng upload ảnh thất bại!",
                    text: imageUploadSuccess ? "Tour đã được tạo và ảnh đã được upload." : "Vui lòng kiểm tra lại ảnh.",
                    showConfirmButton: false,
                    timer: 3000,
                }).then(() => {
                    // Gọi callback để cập nhật danh sách tour
                    if (onTourCreated) onTourCreated();
                    window.location.reload(); // Tải lại trang để cập nhật danh sách tour
                });
            } else {
                throw new Error(result.data || "Tạo tour thất bại");
            }
        } catch (error) {
            console.error("Error creating tour:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: error.message || "Không thể tạo tour. Vui lòng thử lại.",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Cập nhật dữ liệu nhập từ form
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "availability") {
            updatedData[name] = value === "true";
        } else {
            updatedData[name] = value;
        }

        // Nếu người dùng chọn ngày bắt đầu/kết thúc, tính duration + cập nhật lịch trình
        if (name === "startDate" || name === "endDate") {
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);
            if (!isNaN(start) && !isNaN(end) && end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                updatedData.duration = `${diffDays} ngày ${diffDays - 1} đêm`;

                // Khởi tạo lịch trình theo số ngày
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

    // Cập nhật ảnh từ input
    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        if (uploadedFiles.length > 0) {
            setFiles(Array.from(uploadedFiles));
        }
    };

    // Hiển thị ảnh đã chọn với nút xóa
    const renderAnh = () => (
        <div className="mt-2 flex flex-wrap gap-4">
            {files.map((file, index) => (
                <div
                    key={index}
                    className="relative h-24 w-24 overflow-hidden rounded shadow"
                >
                    <img
                        src={URL.createObjectURL(file)}
                        alt={`Ảnh ${index + 1}`}
                        className="h-full w-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 rounded-full bg-red-500 p-2 text-xs text-white"
                        title="Xóa ảnh"
                        aria-label="Xóa ảnh"
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );

    // Cập nhật dữ liệu trong lịch trình (itinerary)
    const handleItineraryChange = (index, field, value) => {
        const newItinerary = [...itinerary];
        if (field === "reverse") {
            newItinerary.reverse();
            newItinerary.forEach((item, i) => (item.day = i + 1));
        } else {
            newItinerary[index] = { ...newItinerary[index], [field]: value };
        }
        setItinerary(newItinerary);
    };

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm Tour Mới"
                icon={<IoIosAdd />}
            />
            <TourModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                itinerary={itinerary}
                handleChange={handleChange}
                handleItineraryChange={handleItineraryChange}
                handleSubmit={handleCreate}
                renderAnh={renderAnh}
                handleImageChange={handleImageChange}
                files={files}
                dataRegion={dataRegion}
            />
        </>
    );
}

export default CreateTour;
