import React, { useState } from "react";
import { handlePrintReport } from "../../util/export";
import icons from "../../util/icon";
import { sendInvoiceEmail } from "../../services/bookingService";
import Swal from "sweetalert2";

const { FaPrint, MdEmail, MdOutlineAttachFile } = icons;

function ToolReport({ item, type }) {
    const [selectedFile, setSelectedFile] = useState(null);
    console.log(item);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            Swal.fire({
                icon: "error",
                title: "File không hợp lệ",
                text: "Vui lòng chọn một file PDF hợp lệ.",
            });
        }
    };

    const handleSendEmail = async () => {
        if (!selectedFile) {
            Swal.fire({
                icon: "warning",
                title: "Chưa chọn file",
                text: "Vui lòng chọn một file PDF để gửi.",
            });
            return;
        }

        // Hiển thị loading
        Swal.fire({
            title: "Đang gửi email...",
            text: "Vui lòng chờ trong giây lát",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await sendInvoiceEmail(item.bookingId, selectedFile);

            Swal.close(); // Tắt loading sau khi có phản hồi

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Thành công",
                    text: "Email hóa đơn kèm PDF đã được gửi thành công!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gửi thất bại",
                    text: `Lỗi từ server: ${response.data}`,
                });
            }
        } catch (error) {
            Swal.close();
            console.error("Lỗi khi gửi email:", error);
            const errorMessage = error.response?.data || "Không thể gửi email. Vui lòng thử lại sau.";
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: errorMessage,
            });
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-2">
            <button
                onClick={() => handlePrintReport(item, type)}
                className="flex items-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
                <FaPrint className="mr-2" />
                In hóa đơn
            </button>

            <div className="flex gap-2">
                <button
                    onClick={handleSendEmail}
                    className="flex items-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                >
                    <MdEmail className="mr-2" />
                    Gửi email
                </button>

                <label className="relative cursor-pointer">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 z-10 cursor-pointer opacity-0"
                    />
                    <div className="flex h-full items-center justify-center rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-600">
                        <MdOutlineAttachFile />
                    </div>
                </label>
                {selectedFile && <span className="max-w-[200px] truncate text-sm text-gray-700">{selectedFile.name}</span>}
            </div>
        </div>
    );
}

export default ToolReport;
