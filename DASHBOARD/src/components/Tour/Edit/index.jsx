/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditButton from "../../Button/EditButton";
import { updateTour, updateTourImages, getTourImages } from "../../../services/tourService";
import TourModal from "../ModelTour";
import { dataRegion } from "../../../context/TourContext";

function EditTour({ item }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item || {});
    const [itinerary, setItinerary] = useState(item?.itinerary || []);
    const [files, setFiles] = useState([]);
    const [areImagesChanged, setAreImagesChanged] = useState(false);

    // Hàm chuyển chuỗi tiền tệ thành số
    const parsePrice = (price) => {
        if (!price) return 0;
        if (typeof price === "number") return price;
        const cleanedPrice = price.replace(/[^0-9]/g, "");
        return parseFloat(cleanedPrice) || 0;
    };

    // Hàm chuyển số thành chuỗi định dạng tiền tệ (3.800.000)
    const formatPrice = (number) => {
        if (!number && number !== 0) return "";
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    useEffect(() => {
        if (item) {
            const fetchImages = async () => {
                try {
                    // Gọi hàm getTourImages từ tourService
                    const response = await getTourImages(item.id);
                    if (response.status !== 200) {
                        throw new Error(response.data || "Failed to fetch images");
                    }
                    // Đảm bảo response.data là mảng, nếu không thì fallback về item.img
                    const images = Array.isArray(response.data) ? response.data : typeof item.img === "string" && item.img ? [item.img] : [];

                    setData({
                        ...item,
                        tourId: item.id,
                        startDate: item.startDate ? item.startDate.split("T")[0] : "",
                        endDate: item.endDate ? item.endDate.split("T")[0] : "",
                        price_adult: parsePrice(item.price_adult), // Chuyển đổi giá thành số
                        price_child: parsePrice(item.price_child), // Chuyển đổi giá thành số
                        images, // Lưu danh sách ảnh từ API
                        img: images, // Đồng bộ img với images
                    });
                } catch (error) {
                    console.error("Failed to fetch images:", error);
                    // Fallback: Sử dụng item.img nếu API lỗi
                    const images = typeof item.img === "string" && item.img ? [item.img] : [];
                    setData({
                        ...item,
                        tourId: item.id,
                        startDate: item.startDate ? item.startDate.split("T")[0] : "",
                        endDate: item.endDate ? item.endDate.split("T")[0] : "",
                        price_adult: parsePrice(item.price_adult), // Chuyển đổi giá thành số
                        price_child: parsePrice(item.price_child), // Chuyển đổi giá thành số
                        images,
                        img: images,
                    });
                }
            };

            fetchImages();

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
        // Không reset images, chỉ thêm ảnh mới vào files
        setFiles(uploadedFiles ? Array.from(uploadedFiles) : []);
        setAreImagesChanged(true);
    };

    const handleChange = (e) => {
        // Lấy name (tên trường input) và value (giá trị nhập vào) từ sự kiện
        const { name, value } = e.target;

        // Tạo bản sao của đối tượng data hiện tại để tránh sửa trực tiếp trạng thái
        let updatedData = { ...data };

        // Xử lý trường "availability" (trạng thái tour: còn trống/hết chỗ)
        if (name === "availability") {
            // Chuyển giá trị chuỗi "true"/"false" thành boolean
            updatedData[name] = value === "true";
        }
        // Xử lý các trường giá: price_adult (giá người lớn) và price_child (giá trẻ em)
        else if (["price_adult", "price_child"].includes(name)) {
            // Chuyển đổi giá trị nhập vào thành số
            const numericValue = parsePrice(value);
            updatedData[name] = numericValue; // Lưu giá trị số
        }
        // Xử lý các trường "include" và "notinclude" (danh sách bao gồm/không bao gồm)
        else if (["include", "notinclude"].includes(name)) {
            // Tách giá trị thành mảng, mỗi dòng là một mục, loại bỏ các dòng rỗng
            updatedData[name] = value.split("\n").filter(Boolean);
        }
        // Xử lý các trường khác (title, description, destination, region, startDate, endDate,...)
        else {
            // Gán trực tiếp giá trị nhập vào
            updatedData[name] = value;
        }

        // Xử lý đặc biệt khi thay đổi ngày bắt đầu (startDate) hoặc ngày kết thúc (endDate)
        if (name === "startDate" || name === "endDate") {
            // Chuyển startDate và endDate thành đối tượng Date để tính toán
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);

            // Kiểm tra ngày hợp lệ (không phải NaN) và ngày kết thúc không trước ngày bắt đầu
            if (!isNaN(start) && !isNaN(end) && end >= start) {
                // Tính khoảng thời gian giữa hai ngày (đơn vị: milliseconds)
                const diffTime = Math.abs(end - start);
                // Chuyển milliseconds thành số ngày, +1 để tính cả ngày đầu và cuối
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                // Cập nhật duration theo định dạng "x ngày y đêm" (y = x - 1)
                updatedData.duration = `${diffDays} ngày ${diffDays - 1} đêm`;
            } else {
                // Nếu ngày không hợp lệ hoặc end < start, xóa giá trị duration
                updatedData.duration = "";
            }
        }

        // Cập nhật trạng thái data với dữ liệu đã xử lý
        setData(updatedData);
    };

    const handleItineraryChange = (index, field, value) => {
        const newItinerary = [...itinerary];
        newItinerary[index] = {
            ...newItinerary[index],
            [field]: field === "content" ? (Array.isArray(value) ? value : value.split("\n").filter(Boolean)) : value,
        };
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
                    price_adult: parseFloat(data.price_adult) || 0,
                    price_child: parseFloat(data.price_child) || 0,
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
        // Kết hợp ảnh từ files (mới tải lên) và data.images (ảnh hiện có)
        const newImageUrls = files.length > 0 ? Array.from(files).map((file) => URL.createObjectURL(file)) : [];
        const existingImages = Array.isArray(data.images) ? data.images : typeof data.img === "string" && data.img ? [data.img] : [];
        const allImages = [...existingImages, ...newImageUrls]; // Hiển thị tất cả ảnh

        const handleDeleteImage = (index) => {
            if (index < existingImages.length) {
                // Xóa ảnh từ data.images (ảnh hiện có)
                const newImages = existingImages.filter((_, i) => i !== index);
                setData((prev) => ({ ...prev, images: newImages, img: newImages }));
                setAreImagesChanged(true);
            } else {
                // Xóa ảnh từ files (ảnh mới tải lên)
                const newFiles = Array.from(files).filter((_, i) => i !== index - existingImages.length);
                setFiles(newFiles);
                setAreImagesChanged(true);
            }
        };

        if (allImages.length === 0) {
            return <p className="text-gray-500">Chưa có ảnh. Vui lòng tải lên ít nhất một ảnh.</p>;
        }

        return (
            <div className="mt-2 flex flex-wrap gap-4">
                {allImages.map((img, index) => (
                    <div
                        key={index}
                        className="relative h-24 w-24 overflow-hidden rounded shadow"
                    >
                        <img
                            src={img}
                            alt={`Ảnh ${index + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                console.error(`Failed to load image ${img}`);
                                e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
                            }}
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                            onClick={() => handleDeleteImage(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        );
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
