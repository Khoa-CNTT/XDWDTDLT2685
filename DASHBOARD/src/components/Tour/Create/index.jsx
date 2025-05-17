/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import icons from "../../../util/icon";
import { createDataTour, uploadImageTour, getDataTour } from "../../../services/tourService";
import TourModal from "../ModelTour";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;

// Dữ liệu vùng miền cố định để hiển thị trong form chọn
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
    const [files, setFiles] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [existingTours, setExistingTours] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Khi component được mount, gọi API để lấy danh sách các tour hiện có
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDataTour();
                const tours = response?.data?.tours || [];
                if (!Array.isArray(tours)) throw new Error("Dữ liệu tour không hợp lệ");
                setExistingTours(tours);
            } catch (error) {
                setExistingTours([]);
            }
        };
        fetchData();
    }, []);

    // Tự động gọi khi trang load xong (reload)
    useEffect(() => {
        window.onload = () => {
            // Thực hiện hành động sau khi reload nếu cần
        };
    }, []);

    // Mở modal tạo tour
    const openModal = () => setShowModal(true);

    // Đóng modal và reset dữ liệu form
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

    // Xoá ảnh đã chọn
    const handleDeleteImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Xử lý tạo tour mới
    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!Array.isArray(existingTours)) throw new Error("Dữ liệu tour không hợp lệ");

            // // Kiểm tra trùng tiêu đề tour
            // const isDuplicate = existingTours.some((tour) => tour.title?.toLowerCase().trim() === data.title?.toLowerCase().trim());
            // if (isDuplicate) throw new Error("Tên tour đã tồn tại");

            // Kiểm tra file ảnh
            if (files.length > 0) {
                const invalidFiles = files.filter((file) => file.size > 10 * 1024 * 1024 || !file.type.startsWith("image/"));
                if (invalidFiles.length > 0) throw new Error("Ảnh phải có định dạng hợp lệ và nhỏ hơn 10MB");
            }

            // Chuẩn bị dữ liệu để gửi lên API
            const apiData = {
                ...data,
                itinerary: itinerary.map((item, index) => ({
                    day: index + 1,
                    title: item.title,
                    content: Array.isArray(item.content) ? item.content : item.content.split("\n").filter(Boolean),
                })),
            };

            const result = await createDataTour(apiData);
            if (![200, 201].includes(result.status)) {
                throw new Error(result.data?.message || "Tạo tour thất bại");
            }

            const tourId = result.data.id || result.data.tourId;
            if (!tourId) throw new Error("Không tìm thấy tourId trong response");

            let imageUploadSuccess = true;

            // Nếu có ảnh, upload ảnh lên server
            if (files.length > 0) {
                try {
                    const formData = new FormData();
                    files.forEach((file) => formData.append("files", file));
                    const uploadResult = await uploadImageTour(tourId, formData);

                    if ([200, 201].includes(uploadResult.status)) {
                        if (typeof uploadResult.data === "string" && uploadResult.data.includes("<!DOCTYPE html>")) {
                            throw new Error("Vui lòng kiểm tra token hoặc cấu hình xác thực.");
                        }

                        if (!Array.isArray(uploadResult.data)) {
                            throw new Error("Response không phải danh sách URL");
                        }

                        const baseUrl = "http://localhost:8088/api/v1";
                        const imageUrls = uploadResult.data.map((url) => (url.startsWith("http") ? url : `${baseUrl}${url}`));
                        setFiles(imageUrls);
                    } else {
                        imageUploadSuccess = false;
                        throw new Error(uploadResult.data?.message || "Lỗi upload ảnh");
                    }
                } catch (uploadError) {
                    imageUploadSuccess = false;
                    throw new Error("Upload ảnh thất bại: " + uploadError.message);
                }
            }

            setShowModal(false);
            Swal.fire({
                position: "center",
                icon: imageUploadSuccess ? "success" : "warning",
                title: imageUploadSuccess ? "Tạo tour thành công!" : "Tạo tour thành công nhưng upload ảnh thất bại!",
                showConfirmButton: false,
                timer: 3000,
            });

            if (onTourCreated) onTourCreated();
            window.location.reload(); // Reload trang sau khi tạo tour thành công
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: error.message || "Có lỗi xảy ra",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý thay đổi dữ liệu form
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "availability") {
            updatedData[name] = value === "true";
        } else {
            updatedData[name] = value;
        }

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
    // Xử lý khi người dùng chọn ảnh từ input
    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        if (uploadedFiles.length > 0) {
            const newFiles = Array.from(uploadedFiles);
            // Kiểm tra tổng số ảnh (hiện tại + mới chọn) không vượt quá 5
            if (files.length + newFiles.length > 5) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Bạn chỉ được chọn tối đa 5 ảnh!",
                    confirmButtonColor: "#d33",
                });
                return;
            }
            setFiles([...files, ...newFiles]);
        }
    };

    // Render danh sách ảnh được chọn
    const renderAnh = () => (
        <div className="mt-2 flex flex-wrap gap-4">
            {files.map((item, index) => (
                <div
                    key={index}
                    className="relative h-24 w-24 overflow-hidden rounded shadow"
                >
                    <img
                        src={typeof item === "string" ? item : URL.createObjectURL(item)}
                        alt={`Ảnh ${index + 1}`}
                        className="h-full w-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md hover:bg-red-600"
                        title="Xóa ảnh"
                        aria-label="Xóa ảnh"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );

    // Xử lý khi người dùng nhập thông tin cho hành trình (itinerary)
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
                isLoading={isLoading}
            />
        </>
    );
}

export default CreateTour;
