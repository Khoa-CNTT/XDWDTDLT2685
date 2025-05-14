import React, { useEffect, useState } from "react";
import { centralProvinces, dataRegion, destinations, northProvinces, southProvinces } from "../../../context/TourContext";

// Hàm lấy khu vực dựa trên điểm đến
function getRegionFromDestination(destination) {
    if (northProvinces.includes(destination)) return "NORTH";
    if (centralProvinces.includes(destination)) return "CENTRAL";
    if (southProvinces.includes(destination)) return "SOUTH";
    return "";
}

function TourForm({
    data,
    itinerary,
    handleChange,
    handleItineraryChange,
    handleSubmit,
    closeModal,
    renderAnh,
    handleImageChange,
    files = [],
    loading,
    uploadProgress,
}) {
    const [errors, setErrors] = useState({});

    // Tự động cập nhật khu vực khi điểm đến thay đổi
    useEffect(() => {
        if (data.destination) {
            const region = getRegionFromDestination(data.destination);
            if (region && region !== data.region) {
                handleChange({ target: { name: "region", value: region } });
            }
        }
    }, [data.destination, data.region, handleChange]);

    // Hàm xử lý thay đổi giá và kiểm tra giá > 1000
    const handlePriceChange = (e) => {
        handleChange(e);
        const { name, value } = e.target;
        if (name === "price_adult" || name === "price_child") {
            if (value === "" || parseFloat(value) <= 1000) {
                setErrors((prev) => ({ ...prev, [name]: "Giá phải lớn hơn 1000 VNĐ" }));
            } else {
                setErrors((prev) => ({ ...prev, [name]: "" }));
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Tên tour */}
            <div>
                <label className="block font-medium">Tên tour:</label>
                <input
                    type="text"
                    name="title"
                    value={data.title || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                />
            </div>

            {/* Điểm đến */}
            <div>
                <label className="block font-medium">Điểm đến:</label>
                <select
                    name="destination"
                    value={data.destination || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                >
                    <option value="">Chọn điểm đến</option>
                    {destinations.map((item, index) => (
                        <option
                            key={index}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Thời gian (readonly, tính tự động) */}
            <div>
                <label className="block font-medium">Thời gian:</label>
                <input
                    type="text"
                    name="duration"
                    value={data.duration || ""}
                    onChange={handleChange}
                    className="mt-1 w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-600 focus:ring-0"
                    placeholder="Thời gian sẽ tự động tính toán từ ngày bắt đầu và kết thúc"
                    required
                    readOnly
                />
            </div>

            {/* Khu vực (hiển thị dạng read-only) */}
            <div>
                <label className="block font-medium">Khu vực:</label>
                <input
                    type="text"
                    value={data.region ? dataRegion.find((r) => r.value === data.region)?.displayName : "Chưa chọn"}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-600"
                    readOnly
                />
            </div>

            {/* Mô tả tour */}
            <div>
                <label className="block font-medium">Mô tả:</label>
                <textarea
                    name="description"
                    value={data.description || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    rows="4"
                    required
                />
            </div>

            {/* Số lượng chỗ */}
            <div>
                <label className="block font-medium">Số lượng chỗ:</label>
                <input
                    type="number"
                    name="quantity"
                    value={data.quantity ?? ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    min="0"
                    required
                />
            </div>

            {/* Giá người lớn */}
            <div>
                <label className="block font-medium">Giá người lớn (VNĐ):</label>
                <input
                    type="number"
                    name="price_adult"
                    value={data.price_adult || data.priceAdult || ""}
                    onChange={handlePriceChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    min="1001"
                    required
                />
                {errors.price_adult && <p className="mt-1 text-sm text-red-500">{errors.price_adult}</p>}
            </div>

            {/* Giá trẻ em */}
            <div>
                <label className="block font-medium">Giá trẻ em (VNĐ):</label>
                <input
                    type="number"
                    name="price_child"
                    value={data.price_child || data.priceChild || ""}
                    onChange={handlePriceChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    min="1001"
                    required
                />
                {errors.price_child && <p className="mt-1 text-sm text-red-500">{errors.price_child}</p>}
            </div>

            {/* Trạng thái tour */}
            <div>
                <label className="block font-medium">Trạng thái:</label>
                <select
                    name="availability"
                    value={data.availability ? "true" : "false"}
                    onChange={(e) => handleChange({ target: { name: "availability", value: e.target.value === "true" } })}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                >
                    <option value="true">Còn trống</option>
                    <option value="false">Hết chỗ</option>
                </select>
            </div>

            {/* Ngày bắt đầu */}
            <div>
                <label className="block font-medium">Ngày bắt đầu:</label>
                <input
                    type="date"
                    name="startDate"
                    value={data.startDate || ""}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                />
            </div>

            {/* Ngày kết thúc */}
            <div>
                <label className="block font-medium">Ngày kết thúc:</label>
                <input
                    type="date"
                    name="endDate"
                    value={data.endDate || ""}
                    onChange={handleChange}
                    min={data.startDate || new Date().toISOString().split("T")[0]}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                />
            </div>

            {/* Ảnh tour */}
            <div>
                <div>
                    <label className="block font-medium">
                        Ảnh:{" "}
                        <span className="font-medium text-[#00c0d1]">{files.length > 0 ? `${files.length} ảnh đã chọn` : "Chưa chọn ảnh mới"}</span>
                        <span className="ml-2 text-sm text-gray-500">(Tối đa 5 ảnh)</span>
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                        <label
                            htmlFor="file"
                            className="inline-block cursor-pointer rounded-md bg-[#00c0d1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#009fb0]"
                        >
                            Chọn ảnh
                        </label>
                    </div>
                    <input
                        type="file"
                        id="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    {/* Hiển thị ảnh đã chọn hoặc ảnh hiện tại */}
                    {renderAnh()}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-2">
                            <progress
                                value={uploadProgress}
                                max="100"
                                className="w-full"
                            />
                            <span className="text-sm">{uploadProgress}%</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Lịch trình tour */}
            <div>
                <label className="block font-semibold">Lịch trình:</label>
                {itinerary.length > 0 ? (
                    itinerary.map((day, index) => (
                        <div
                            key={index}
                            className="mt-4 rounded border bg-gray-50 p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-[#00c0d1]">Ngày {day.day}</p>
                            </div>
                            <div className="mt-2">
                                <label className="block">Tiêu đề:</label>
                                <input
                                    type="text"
                                    value={day.title || ""}
                                    onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                                    required
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block">Nội dung:</label>
                                <textarea
                                    value={Array.isArray(day.content) ? day.content.join("\n") : typeof day.content === "string" ? day.content : ""}
                                    onChange={(e) => {
                                        const newContent = e.target.value.split("\n").filter((line) => line.trim() !== "");
                                        handleItineraryChange(index, "content", newContent);
                                    }}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                                    rows="4"
                                    required
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Chưa có lịch trình</p>
                )}
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                    disabled={loading}
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="flex items-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg
                                className="mr-2 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Đang xử lý...
                        </>
                    ) : (
                        "Lưu"
                    )}
                </button>
            </div>
        </form>
    );
}

export default TourForm;
