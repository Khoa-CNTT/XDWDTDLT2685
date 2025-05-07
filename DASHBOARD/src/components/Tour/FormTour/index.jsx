import React, { useEffect, useState } from "react";

function TourForm({ data, itinerary, handleChange, handleitineraryChange, handleSubmit, closeModal, renderAnh, handleImageChange, files = [] }) {
    const dataRegion = [
        { regionName: "NORTH", displayName: "Miền Bắc" },
        { regionName: "CENTRAL", displayName: "Miền Trung" },
        { regionName: "SOUTH", displayName: "Miền Nam" },
    ];

    // State nội bộ để xử lý giá
    const [formData, setFormData] = useState(data);

    // Hàm loại bỏ định dạng tiền tệ
    const cleanMoney = (str) => {
        if (!str) return "";
        const num = Number(str.toString().replace(/\D/g, ""));
        return isNaN(num) ? "" : num;
    };

    // Khi component mount hoặc data thay đổi, làm sạch giá trị tiền
    useEffect(() => {
        setFormData({
            ...data,
            price: cleanMoney(data.price),
            priceChild: cleanMoney(data.priceChild),
        });
    }, [data]);

    // Wrapper để cập nhật giá trị formData và gọi hàm handleChange gốc
    const onLocalChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        handleChange(e); // gọi để cập nhật dữ liệu cha
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div>
                <label>Tên tour:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={onLocalChange}
                    className="w-full border p-2"
                />
            </div>

            <div>
                <label>Điểm đến:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={onLocalChange}
                    className="w-full border p-2"
                />
            </div>

            <div>
                <label>Thời gian:</label>
                <input
                    type="text"
                    name="date"
                    value={formData.date && !isNaN(formData.date) && formData.date > 0 ? `${formData.date} ngày - ${formData.date - 1} đêm` : ""}
                    readOnly
                    className="w-full border bg-gray-100 p-2"
                />
            </div>

            <div>
                <label>Khu vực:</label>
                <select
                    name="region"
                    className="w-full border p-3"
                    onChange={onLocalChange}
                    value={formData.region || ""}
                >
                    <option value="">Chọn khu vực</option>
                    {dataRegion.map((item, index) => (
                        <option
                            key={index}
                            value={item.regionName}
                        >
                            {item.displayName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Mô tả:</label>
                <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={onLocalChange}
                    className="w-full border p-2"
                />
            </div>

            <div>
                <label>Số lượng:</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity ?? ""}
                    onChange={onLocalChange}
                    className="w-full border p-2"
                    min="0"
                />
            </div>

            <div>
                <label>Giá người lớn:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price ?? ""}
                    onChange={onLocalChange}
                    className="w-full border p-2"
                    min="0"
                />
            </div>

            <div>
                <label>Giá trẻ em:</label>
                <input
                    type="number"
                    name="priceChild"
                    value={formData.priceChild ?? ""}
                    onChange={onLocalChange}
                    className="w-full border p-2"
                    min="0"
                />
            </div>

            <div>
                <label>Còn trống:</label>
                <select
                    name="availability"
                    value={formData.availability ? "true" : "false"}
                    onChange={(e) =>
                        onLocalChange({
                            target: {
                                name: "availability",
                                value: e.target.value === "true",
                            },
                        })
                    }
                    className="w-full border p-2"
                >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                </select>
            </div>

            <div>
                <label>Ngày bắt đầu:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate || ""}
                    onChange={onLocalChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border p-2"
                />
            </div>

            <div>
                <label>Ngày kết thúc:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate || ""}
                    onChange={onLocalChange}
                    className="w-full border p-2"
                    min={new Date().toISOString().split("T")[0]}
                />
            </div>

            <div>
                <label>
                    Ảnh: <span className="font-medium text-blue-600">{files.length > 0 ? `${files.length} ảnh đã chọn` : "Chưa chọn ảnh nào"}</span>
                </label>
                <div className="flex items-center gap-4">
                    <label
                        htmlFor="file"
                        className="inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
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
                {renderAnh()}
            </div>

            {itinerary.length > 0 && (
                <div>
                    <label className="block font-semibold">Lịch trình</label>
                    {itinerary.map((day, index) => (
                        <div
                            key={index}
                            className="mb-4 rounded border bg-gray-50 p-3 shadow-sm"
                        >
                            <p className="font-bold text-blue-600">Ngày {index + 1}</p>
                            <div className="mb-2">
                                <label>Tiêu đề:</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full border p-2"
                                    value={day.title || ""}
                                    onChange={(e) => handleitineraryChange(index, "title", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Nội dung:</label>
                                <textarea
                                    name="content"
                                    className="w-full border p-2"
                                    value={day.content || ""}
                                    onChange={(e) => handleitineraryChange(index, "content", e.target.value)}
                                    rows="3"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-400 px-4 py-2 text-white"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="bg-green-500 px-4 py-2 text-white"
                >
                    Lưu
                </button>
            </div>
        </form>
    );
}

export default TourForm;
