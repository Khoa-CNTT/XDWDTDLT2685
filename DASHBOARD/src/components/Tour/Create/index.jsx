/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import icons from "../../../util/icon";
import { createDataTour, uploadImageTour, getDataTour } from "../../../services/tourService";
import TourModal from "../ModelTour";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;

// Danh sách vùng miền cố định
const dataRegion = [
    { displayName: "Miền Bắc", value: "NORTH" },
    { displayName: "Miền Trung", value: "CENTRAL" },
    { displayName: "Miền Nam", value: "SOUTH" },
];

function CreateTour({ onTourCreated }) {
    // Trạng thái hiển thị modal
    const [showModal, setShowModal] = useState(false);
    // Trạng thái dữ liệu tour nhập từ form
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
    // Trạng thái danh sách file ảnh được chọn
    const [files, setFiles] = useState([]);
    // Trạng thái hành trình (itinerary) của tour
    const [itinerary, setItinerary] = useState([]);
    // Trạng thái danh sách tour hiện có (để kiểm tra trùng lặp)
    const [existingTours, setExistingTours] = useState([]);
    // Trạng thái đang loading khi tạo tour
    const [isLoading, setIsLoading] = useState(false);

    // Lấy dữ liệu tour hiện có khi component mount
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

    // Hook phụ trợ khi reload trang
    useEffect(() => {
        window.onload = () => {
            // Có thể xử lý logic khi reload nếu cần
        };
    }, []);

    // Hàm mở modal
    const openModal = () => setShowModal(true);

    // Hàm đóng modal và reset dữ liệu
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

    // Hàm xoá ảnh khỏi danh sách ảnh đã chọn
    const handleDeleteImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Hàm xử lý tạo tour mới
    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Kiểm tra định dạng ảnh (dưới 10MB và là ảnh)
            if (files.length > 0) {
                const invalidFiles = files.filter((file) => file.size > 10 * 1024 * 1024 || !file.type.startsWith("image/"));
                if (invalidFiles.length > 0) throw new Error("Ảnh phải có định dạng hợp lệ và nhỏ hơn 10MB");
            }

            // Chuẩn bị dữ liệu gửi API
            const apiData = {
                ...data,
                itinerary: itinerary.map((item, index) => ({
                    day: index + 1,
                    title: item.title,
                    content: Array.isArray(item.content) ? item.content : item.content.split("\n").filter(Boolean),
                })),
            };

            const result = await createDataTour(apiData);
            if (![200, 201].includes(result.status)) throw new Error(result.data?.message || "Tạo tour thất bại");

            const tourId = result.data.id || result.data.tourId;
            if (!tourId) throw new Error("Không tìm thấy tourId trong response");

            let imageUploadSuccess = true;

            // Nếu danh sách files được chọn không rỗng
            if (files.length > 0) {
                try {
                    // Tạo đối tượng FormData để gửi file ảnh
                    const formData = new FormData();

                    // Thêm từng file vào FormData với key là "files"
                    files.forEach((file) => formData.append("files", file));

                    // Gọi hàm bất đồng bộ upload ảnh và chờ kết quả trả về
                    const uploadResult = await uploadImageTour(tourId, formData);

                    // Nếu server trả về status thành công (200 OK hoặc 201 Created)
                    if ([200, 201].includes(uploadResult.status)) {
                        // Kiểm tra nếu response là HTML (thường là trang login hoặc lỗi xác thực)
                        if (typeof uploadResult.data === "string" && uploadResult.data.includes("<!DOCTYPE html>")) {
                            // Nếu đúng, ném lỗi liên quan đến xác thực hoặc token hết hạn
                            throw new Error("Vui lòng kiểm tra token hoặc cấu hình xác thực.");
                        }

                        // Nếu dữ liệu không phải mảng (ví dụ không phải danh sách URL), cũng ném lỗi
                        if (!Array.isArray(uploadResult.data)) {
                            throw new Error("Response không phải danh sách URL");
                        }

                        // Định nghĩa base URL cho các ảnh nếu ảnh trả về chỉ là đường dẫn tương đối
                        const baseUrl = "http://localhost:8088/api/v1";

                        // Tạo danh sách URL ảnh hoàn chỉnh: nếu url không có http, thêm baseUrl vào
                        const imageUrls = uploadResult.data.map((url) => (url.startsWith("http") ? url : `${baseUrl}${url}`));

                        // Lưu danh sách URL ảnh vào state React
                        setFiles(imageUrls);
                    } else {
                        // Nếu status không phải 200 hoặc 201, đánh dấu upload thất bại
                        imageUploadSuccess = false;

                        // Ném lỗi với thông báo cụ thể nếu có hoặc mặc định là "Lỗi upload ảnh"
                        throw new Error(uploadResult.data?.message || "Lỗi upload ảnh");
                    }
                } catch (uploadError) {
                    // Nếu có bất kỳ lỗi nào xảy ra trong khối try, cũng đánh dấu upload thất bại
                    imageUploadSuccess = false;

                    // Ném ra lỗi cụ thể với thông báo chi tiết
                    throw new Error("Upload ảnh thất bại: " + uploadError.message);
                }
            }

            // Thông báo kết quả
            setShowModal(false);
            Swal.fire({
                position: "center",
                icon: imageUploadSuccess ? "success" : "warning",
                title: imageUploadSuccess ? "Tạo tour thành công!" : "Tạo tour thành công nhưng upload ảnh thất bại!",
                showConfirmButton: false,
                timer: 3000,
            });

            if (onTourCreated) onTourCreated(); // callback khi tạo thành công
            window.location.reload(); // reload trang
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

    // Xử lý thay đổi giá trị các input trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "availability") {
            updatedData[name] = value === "true";
        } else {
            updatedData[name] = value;
        }

        // Nếu thay đổi ngày bắt đầu/kết thúc thì tính toán lại duration và itinerary
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

    // Khi người dùng chọn ảnh từ input
    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        if (uploadedFiles.length > 0) {
            const newFiles = Array.from(uploadedFiles);
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

    // Hiển thị ảnh đã chọn
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
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );

    // Xử lý thay đổi thông tin từng ngày trong hành trình
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
