/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditButton from "../../Button/EditButton";
import { updateTour, updateTourImages } from "../../../services/tourService";
import TourModal from "../ModelTour";
import { dataRegion } from "../../../context/TourContext";

function EditTour({ item }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item || {});
    const [itinerary, setItinerary] = useState(item?.itinerary || []);
    const [files, setFiles] = useState([]);
    const [areImagesChanged, setAreImagesChanged] = useState(false);

    useEffect(() => {
        if (item) {
            const parsePrice = (price) => {
                if (!price) return 0;
                if (typeof price === "number") return price;
                const cleanedPrice = price.replace(/[^0-9]/g, "");
                return parseFloat(cleanedPrice) || 0;
            };

            const images = Array.isArray(item.img) ? item.img : typeof item.img === "string" && item.img ? [item.img] : [];

            setData({
                ...item,
                tourId: item.id,
                startDate: item.startDate ? item.startDate.split("T")[0] : "",
                endDate: item.endDate ? item.endDate.split("T")[0] : "",
                priceAdult: parsePrice(item.price_adult),
                priceChild: parsePrice(item.price_child),
                images,
                img: images,
            });

            // Chuẩn hóa itinerary để đảm bảo content luôn là mảng
            setItinerary(
                item.itinerary?.length > 0
                    ? item.itinerary.map((day, index) => ({
                          day: index + 1,
                          title: day.title || "",
                          content: Array.isArray(day.content)
                              ? day.content
                              : typeof day.content === "string"
                                ? day.content.split("\n").filter(Boolean)
                                : [],
                      }))
                    : [],
            );
        }
    }, [item]);

    const openModal = () => {
        const today = new Date();
        const startDate = new Date(item.startDate + "T00:00:00");
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
        setAreImagesChanged(false);
    };

    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        if (uploadedFiles.length > 5) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Chỉ được chọn tối đa 5 ảnh!",
                showConfirmButton: true,
                timer: 3000,
            });
            return;
        }
        setFiles(uploadedFiles ? Array.from(uploadedFiles) : []);
        setAreImagesChanged(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "availability") {
            updatedData[name] = value === "true";
        } else if (["priceAdult", "priceChild", "quantity"].includes(name)) {
            const cleanedValue = value.replace(/[^0-9]/g, "");
            updatedData[name] = parseFloat(cleanedValue) || 0;
        } else if (["include", "notinclude"].includes(name)) {
            updatedData[name] = value.split("\n").filter(Boolean);
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

    const handleItineraryChange = (index, field, value) => {
        const newItinerary = [...itinerary];
        if (field === "add") {
            newItinerary.push({ day: newItinerary.length + 1, title: "", content: [] });
        } else if (field === "remove") {
            newItinerary.splice(index, 1);
            newItinerary.forEach((item, i) => (item.day = i + 1));
        } else {
            newItinerary[index] = {
                ...newItinerary[index],
                [field]: field === "content" ? (Array.isArray(value) ? value : value.split("\n").filter(Boolean)) : value,
            };
        }
        setItinerary(newItinerary);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.images.length === 0 && files.length === 0) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Vui lòng tải lên ít nhất một ảnh cho tour!",
                showConfirmButton: true,
                timer: 3000,
            });
            return;
        }
        if (data.images.length + files.length < 2) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Chỉ có một ảnh. Bạn có muốn tải thêm ảnh không?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Tiếp tục lưu",
                cancelButtonText: "Tải thêm ảnh",
            }).then((result) => {
                if (result.isDismissed) {
                    return;
                } else {
                    submitTour();
                }
            });
        } else {
            submitTour();
        }
    };

    const submitTour = async () => {
        const confirmResult = await Swal.fire({
            title: "Bạn có muốn cập nhật thông tin tour?",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Lưu",
            cancelButtonText: "Hủy",
        });

        if (confirmResult.isConfirmed) {
            try {
                if (!data.tourId) {
                    throw new Error("Tour ID không tồn tại");
                }

                const apiData = {
                    title: data.title,
                    description: data.description,
                    destination: data.destination,
                    region: data.region,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    duration: data.duration,
                    price_adult: parseFloat(data.priceAdult) || 0,
                    price_child: parseFloat(data.priceChild) || 0,
                    quantity: parseInt(data.quantity) || 0,
                    availability: data.availability,
                    itinerary: itinerary.map((item) => ({
                        day: item.day,
                        title: item.title,
                        content: Array.isArray(item.content) ? item.content : item.content.split("\n").filter(Boolean),
                    })),
                    code: data.code,
                    include: data.include,
                    notinclude: data.notinclude,
                    img: data.images,
                };

                const tourResult = await updateTour(data.tourId, apiData);
                if (tourResult.status !== 200 && tourResult.status !== 201) {
                    throw new Error(tourResult.data || "Cập nhật thông tin tour thất bại");
                }

                if (areImagesChanged && files.length > 0) {
                    const imageResult = await updateTourImages(data.tourId, files);
                    if (imageResult.status !== 200 && imageResult.status !== 201) {
                        throw new Error(imageResult.data || "Cập nhật ảnh tour thất bại");
                    }

                    const newImages = Array.isArray(imageResult.data) ? imageResult.data : [imageResult.data].filter(Boolean);

                    setData((prev) => ({
                        ...prev,
                        images: newImages,
                        img: newImages,
                    }));
                    setFiles([]);
                    setAreImagesChanged(false);
                }

                setShowModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật tour thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Cập nhật tour thất bại",
                    text: error.message || "Vui lòng thử lại.",
                    confirmButtonColor: "#d33",
                });
            }
        }
    };

    const renderAnh = () => {
        if (files.length > 0) {
            return (
                <div className="mt-2 flex flex-wrap gap-4">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="h-24 w-24 overflow-hidden rounded shadow"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Ảnh mới ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        }

        if (Array.isArray(data.images) && data.images.length > 0) {
            return (
                <div className="mt-2 flex flex-wrap gap-4">
                    {data.images.map((img, index) => (
                        <div
                            key={index}
                            className="relative h-24 w-24 overflow-hidden rounded shadow"
                        >
                            <img
                                src={img}
                                alt={`Ảnh hiện tại ${index + 1}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    console.error(`Failed to load image ${img}`, e);
                                    e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
                                }}
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 h-7 w-7 items-center rounded-full bg-red-500 p-1 text-white"
                                onClick={() => {
                                    const newImages = data.images.filter((_, i) => i !== index);
                                    setData((prev) => ({ ...prev, images: newImages, img: newImages }));
                                    setAreImagesChanged(true);
                                }}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            );
        }

        return <p className="text-gray-500">Chưa có ảnh. Vui lòng tải lên ít nhất một ảnh.</p>;
    };

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
