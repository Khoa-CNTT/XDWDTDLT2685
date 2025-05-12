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

    // useEffect: Khởi tạo state khi item thay đổi
    // Mục đích: Cập nhật dữ liệu tour và lịch trình, xử lý img dạng chuỗi hoặc mảng
    // Đầu vào: item (dữ liệu tour từ props)
    // Đầu ra: Cập nhật state data và itinerary
    useEffect(() => {
        // Chỉ chạy nếu item tồn tại
        if (item) {
            // Hàm hỗ trợ chuyển đổi giá từ chuỗi sang số
            const parsePrice = (price) => {
                if (!price) return 0;
                if (typeof price === "number") return price;
                // Loại bỏ dấu phân cách hàng nghìn, ký hiệu tiền tệ và ký tự không phải số
                const cleanedPrice = price.replace(/[^0-9]/g, "");
                return parseFloat(cleanedPrice) || 0;
            };

            // Xử lý img: Nếu là mảng thì giữ nguyên, nếu là chuỗi thì chuyển thành mảng, nếu rỗng thì trả về mảng rỗng
            const images = Array.isArray(item.img) ? item.img : typeof item.img === "string" && item.img ? [item.img] : [];

            // Cập nhật state data với dữ liệu tour đã xử lý
            setData({
                ...item,
                tourId: item.id, // Sử dụng id từ dữ liệu tour
                startDate: item.startDate ? item.startDate.split("T")[0] : "", // Định dạng ngày bắt đầu
                endDate: item.endDate ? item.endDate.split("T")[0] : "", // Định dạng ngày kết thúc
                priceAdult: parsePrice(item.price_adult), // Chuyển đổi giá người lớn
                priceChild: parsePrice(item.price_child), // Chuyển đổi giá trẻ em
                images, // Lưu danh sách ảnh đã xử lý
                img: images, // Đảm bảo img là mảng cho đồng bộ
            });

            // Cập nhật lịch trình: Chuyển đổi dữ liệu itinerary thành mảng các ngày với định dạng phù hợp
            setItinerary(
                item.itinerary?.length > 0
                    ? item.itinerary.map((day, index) => ({
                          day: index + 1,
                          title: day.title || "",
                          content: Array.isArray(day.content) ? day.content : day.content?.split("\n") || [],
                      }))
                    : [],
            );
        }
    }, [item]);

    // openModal: Mở modal chỉnh sửa tour
    // Mục đích: Kiểm tra điều kiện trước khi mở modal (tour còn khả dụng và chưa bắt đầu)
    // Đầu vào: Không có
    // Đầu ra: Mở modal hoặc hiển thị cảnh báo nếu không thỏa điều kiện
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
        setShowModal(true); // Mở modal
    };

    // closeModal: Đóng modal chỉnh sửa
    // Mục đích: Đóng modal và reset các state liên quan đến ảnh
    // Đầu vào: Không có
    // Đầu ra: Đóng modal, xóa danh sách file ảnh và trạng thái thay đổi ảnh
    const closeModal = () => {
        setShowModal(false);
        setFiles([]);
        setAreImagesChanged(false);
    };

    // handleImageChange: Xử lý khi người dùng chọn file ảnh mới
    // Mục đích: Lưu các file ảnh được tải lên, giới hạn tối đa 5 ảnh
    // Đầu vào: Sự kiện e (từ input file)
    // Đầu ra: Cập nhật state files và areImagesChanged
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
        setFiles(uploadedFiles ? Array.from(uploadedFiles) : []); // Lưu danh sách file
        setAreImagesChanged(true); // Đánh dấu ảnh đã thay đổi
    };

    // handleChange: Xử lý thay đổi dữ liệu form
    // Mục đích: Cập nhật state data khi người dùng nhập hoặc thay đổi thông tin trong form
    // Đầu vào: Sự kiện e (từ input, select, textarea)
    // Đầu ra: Cập nhật state data và itinerary (nếu thay đổi ngày)
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        // Xử lý các trường đặc biệt
        if (name === "availability") {
            updatedData[name] = value === "true"; // Chuyển đổi availability thành boolean
        } else if (["priceAdult", "priceChild", "quantity"].includes(name)) {
            const cleanedValue = value.replace(/[^0-9]/g, ""); // Chỉ giữ số
            updatedData[name] = parseFloat(cleanedValue) || 0;
        } else if (["include", "notinclude"].includes(name)) {
            updatedData[name] = value.split("\n").filter(Boolean); // Tách thành mảng
        } else {
            updatedData[name] = value; // Gán giá trị trực tiếp
        }

        // Cập nhật duration và itinerary khi thay đổi ngày bắt đầu/kết thúc
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

        setData(updatedData); // Cập nhật state data
    };

    // handleItineraryChange: Xử lý thay đổi lịch trình
    // Mục đích: Thêm, xóa hoặc cập nhật thông tin ngày trong lịch trình
    // Đầu vào: index (vị trí ngày), field (trường cần thay đổi), value (giá trị mới)
    // Đầu ra: Cập nhật state itinerary
    const handleItineraryChange = (index, field, value) => {
        const newItinerary = [...itinerary];
        if (field === "add") {
            newItinerary.push({ day: newItinerary.length + 1, title: "", content: [] }); // Thêm ngày mới
        } else if (field === "remove") {
            newItinerary.splice(index, 1); // Xóa ngày
            newItinerary.forEach((item, i) => (item.day = i + 1)); // Cập nhật số ngày
        } else {
            newItinerary[index] = {
                ...newItinerary[index],
                [field]: field === "content" ? value.split("\n").filter(Boolean) : value, // Cập nhật tiêu đề hoặc nội dung
            };
        }
        setItinerary(newItinerary); // Cập nhật state itinerary
    };

    // handleSubmit: Xử lý gửi form chỉnh sửa
    // Mục đích: Kiểm tra số lượng ảnh và hiển thị xác nhận trước khi gửi dữ liệu
    // Đầu vào: Sự kiện e (từ form submit)
    // Đầu ra: Chuyển sang submitTour hoặc hiển thị cảnh báo
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra nếu không có ảnh
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
        // Cảnh báo nếu chỉ có một ảnh
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
                    return; // Cho phép tải thêm ảnh
                } else {
                    submitTour(); // Tiếp tục gửi dữ liệu
                }
            });
        } else {
            submitTour(); // Gửi dữ liệu nếu có từ 2 ảnh trở lên
        }
    };

    // submitTour: Gửi dữ liệu tour và ảnh lên backend
    // Mục đích: Xác nhận và gửi yêu cầu cập nhật tour, xử lý ảnh nếu có thay đổi
    // Đầu vào: Không có
    // Đầu ra: Cập nhật tour thành công hoặc hiển thị lỗi
    const submitTour = async () => {
        // Hiển thị hộp thoại xác nhận
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
                // Kiểm tra tourId
                if (!data.tourId) {
                    throw new Error("Tour ID không tồn tại");
                }

                // Chuẩn bị dữ liệu gửi lên API, ánh xạ các trường
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

                // Gửi yêu cầu cập nhật tour
                const tourResult = await updateTour(data.tourId, apiData);
                if (tourResult.status !== 200 && tourResult.status !== 201) {
                    throw new Error(tourResult.data || "Cập nhật thông tin tour thất bại");
                }

                // Cập nhật ảnh nếu có thay đổi
                if (areImagesChanged && files.length > 0) {
                    const imageResult = await updateTourImages(data.tourId, files);
                    if (imageResult.status !== 200 && imageResult.status !== 201) {
                        throw new Error(imageResult.data || "Cập nhật ảnh tour thất bại");
                    }

                    // Cập nhật danh sách ảnh từ phản hồi
                    const newImages = Array.isArray(imageResult.data) ? imageResult.data : [imageResult.data].filter(Boolean);

                    setData((prev) => ({
                        ...prev,
                        images: newImages,
                        img: newImages, // Cập nhật mảng ảnh
                    }));
                    setFiles([]);
                    setAreImagesChanged(false); // Reset trạng thái thay đổi
                }

                setShowModal(false); // Đóng mod
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

    // renderAnh: Hiển thị ảnh hiện tại hoặc ảnh mới tải lên
    // Mục đích: Hiển thị danh sách ảnh của tour hoặc ảnh mới được chọn, cho phép xóa ảnh
    // Đầu vào: Không có
    // Đầu ra: JSX hiển thị ảnh hoặc thông báo nếu không có ảnh
    const renderAnh = () => {
        console.log("Rendering images:", data.images, "Files:", files); // Ghi log danh sách ảnh và file
        // Ưu tiên hiển thị ảnh mới được tải lên
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

        // Hiển thị danh sách ảnh hiện tại của tour
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
                                    e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found"; // Ảnh dự phòng
                                }}
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 h-7 w-7 items-center rounded-full bg-red-500 p-1 text-white"
                                onClick={() => {
                                    const newImages = data.images.filter((_, i) => i !== index); // Xóa ảnh
                                    setData((prev) => ({ ...prev, images: newImages, img: newImages }));
                                    setAreImagesChanged(true); // Đánh dấu thay đổi
                                }}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            );
        }

        // Thông báo nếu không có ảnh
        return <p className="text-gray-500">Chưa có ảnh. Vui lòng tải lên ít nhất một ảnh.</p>;
    };

    // JSX trả về: Nút chỉnh sửa và modal chỉnh sửa tour
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
