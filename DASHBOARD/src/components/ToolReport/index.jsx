import React from "react";
import { handlePrintReport } from "../../util/export";
import icons from "../../util/icon";
import { sendInvoiceEmail } from "../../services/bookingService";

const { FaPrint, MdEmail } = icons;

function ToolReport({ item, type }) {
    const handleSendEmail = async () => {
        try {
            const response = await sendInvoiceEmail(item.bookingId);
            if (response.status === 200) {
                alert("Email hóa đơn kèm PDF đã được gửi thành công!");
            } else {
                alert("Gửi email thất bại: " + response.data);
            }
        } catch (error) {
            console.error("Lỗi khi gửi email:", error);
            alert("Không thể gửi email. Vui lòng thử lại sau.");
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
            <button
                onClick={handleSendEmail}
                className="flex items-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
            >
                <MdEmail className="mr-2" />
                Gửi email
            </button>
        </div>
    );
}

export default ToolReport;
