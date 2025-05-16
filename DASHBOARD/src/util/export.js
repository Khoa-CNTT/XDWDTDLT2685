import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../assets/Font/Roboto_Condensed-Bold-normal.js";
import "../assets/Font/Roboto-Regular-normal.js";
import photo from "./../assets/Img/logo.png";
//Hàm Copy dữ liệu
export const handleCopy = (data, type) => {
    let content = "";

    if (type === "tour") {
        content = data
            .map(
                (item) =>
                    `Tên:${item.title}\nThời gian:${item.duration}\nMô tả:${item.description}\nSố lượng người còn trống:${item.quantity}\nGiá người lớn:${item.price_adult || "N/A"}\nGiá trẻ em:${item.price_child || "N/A"}\nĐiểm đến:${item.destination || "N/A"}\nKhả dụng:${item.availability ? "Có" : "Không"}\nNgày bắt đầu:${item.startDate}\nNgày kết thúc:${item.endDate}`,
            )
            .join("\n\n");
    } else if (type === "booking") {
        content = data
            .map(
                (item) =>
                    `Tên:${item.title}\nKhách hàng:${item.full_name}\nSố lượng người lớn:${item.num_adults}\nSố lượng trẻ em:${item.num_children}\nTổng tiền:${item.total_price}\nNgày bắt đầu:${item.created_at}\nPhương thức thanh toán:${item.payment_method}\nTrạng thái thanh toán:${item.payment_status}\nTrạng thái booking:${item.booking_status}`,
            )
            .join("\n\n");
    }
    navigator.clipboard.writeText(content);
    Swal.fire({
        title: "Sao chép thành công!",
        icon: "success",
        draggable: true,
    });
};
//Hàm in dữ liệu
export const handlePrint = (type) => {
    const editColumns = document.querySelectorAll(".edit-column");
    const deleteColumns = document.querySelectorAll(".delete-column");

    //ẨN các cột không cần thiết
    editColumns.forEach((col) => (col.style.display = "none"));
    deleteColumns.forEach((col) => (col.style.display = "none"));
    if (type === "booking") {
        const paymentColumns = document.querySelectorAll(".payment-column");
        const action = document.querySelectorAll(".action-column");
        paymentColumns.forEach((col) => (col.style.display = "none"));
        action.forEach((col) => (col.style.display = "none"));
    }

    //Tao cua so in
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>CÔNG TY GOVIET</title></head><body>");
    printWindow.document.write(`<h1 style='text-align:center;'>Danh sách ${type.toUpperCase()}</h1>`);
    printWindow.document.write(document.querySelector("table").outerHTML);
    printWindow.document.write(`
        <style>
        body {
            font-family: Arial, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        </style>
    `);
    printWindow.document.close();
    printWindow.print();

    //Sau khi in xong hiện lại các cột đã ẩn
    editColumns.forEach((col) => (col.style.display = ""));
    deleteColumns.forEach((col) => (col.style.display = ""));

    if (type === "booking") {
        const paymentColumns = document.querySelectorAll(".payment-column");
        paymentColumns.forEach((col) => (col.style.display = ""));
        const action = document.querySelectorAll(".action-column");
        action.forEach((col) => (col.style.display = ""));
    }
};
// Hàm tạo nội dung CSV
export const renderCSV = (data, type) => {
    let headers = [];
    let rows = [];

    if (type === "tour") {
        headers = [
            "Tên",
            "Thời gian",
            "Mô tả",
            "Số lượng người còn trống",
            "Giá người lớn",
            "Giá trẻ em",
            "Điểm đến",
            "Khả dụng",
            "Ngày bắt đầu",
            "Ngày kết thúc",
        ];
        rows = data.map((t) => [
            t.title,
            t.duration,
            t.description,
            t.quantity,
            t.price_adult || "N/A",
            t.price_child || "N/A",
            t.destination || "N/A",
            t.availability ? "1" : "0",
            t.startDate,
            t.endDate,
        ]);
    } else if (type === "booking") {
        headers = [
            "Mã Booking",
            "Tên khách hàng",
            "Email",
            "Số điện thoại",
            "Địa chỉ",
            "Ngày đặt",
            "Người lớn",
            "Trẻ em",
            "Tổng tiền",
            "Trạng thái",
            "Phương thức thanh toán",
            "Thanh toán",
        ];
        rows = data.map((b) => [
            b.booking_id,
            b.full_name,
            b.email,
            b.phone_number,
            b.address,
            b.created_at,
            b.num_adults,
            b.num_children,
            b.total_price,
            b.booking_status,
            b.payment_method,
            b.payment_status,
        ]);
    }

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    return csv;
};

// Hàm xuất CSV
export const handleToCSV = (data, type) => {
    const csv = renderCSV(data, type);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${type}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Hàm xuất Excel
export const handleExcel = (data, type) => {
    const rows = data.map((item) =>
        type === "tour"
            ? {
                  Tên: item.title || "N/A",
                  "Thời gian": item.duration || "N/A",
                  "Mô tả": item.description || "N/A",
                  "Số lượng còn": item.quantity || "N/A",
                  "Giá NL": item.price_adult || "N/A",
                  "Giá TE": item.price_child || "N/A",
                  "Điểm đến": item.destination || "N/A",
                  "Khả dụng": item.availability ? "Có" : "Không",
                  "Bắt đầu": item.startDate || "N/A",
                  "Kết thúc": item.endDate || "N/A",
              }
            : {
                  "Mã booking": item.booking_id,
                  "Khách hàng": item.full_name,
                  "Tên tour": item.title,
                  Email: item.email,
                  SĐT: item.phone_number,
                  "Địa chỉ": item.address,
                  "Ngày đặt": item.created_at,
                  "Người lớn": item.num_adults,
                  "Trẻ em": item.num_children,
                  "Tổng tiền": item.total_price,
                  "Trạng thái booking": item.booking_status,
                  "Phương thức thanh toán": item.payment_method,
                  "Trạng thái thanh toán": item.payment_status,
              },
    );

    const ws = XLSX.utils.json_to_sheet(rows); //Chuyển mảng rows (chứa các object với key-value) thành một sheet Excel (worksheet).
    const wb = XLSX.utils.book_new(); //Tạo một workbook mới (file Excel trống).
    XLSX.utils.book_append_sheet(wb, ws, "Tour"); //Gắn sheet ws vào workbook wb vừa tạo.
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" }); //Chuyển workbook wb thành một mảng byte (binary array) để có thể lưu xuống file .xlsx.
    saveAs(new Blob([buf]), `${type}.xlsx`); //Tạo một Blob từ dữ liệu buf và sử dụng file-saver để tải file về máy.

    Swal.fire({
        title: "Tải thành công!",
        icon: "success",
        draggable: true,
    });
};
// Hàm xuất PDF
export const handleToPdf = (data, type) => {
    const doc = new jsPDF("landscape", "pt", "a4");

    // Đặt font mặc định cho toàn bộ PDF
    doc.setFont("Roboto-Regular", "normal");

    const headers =
        type === "tour"
            ? ["Tên", "Thời gian", "Mô tả", "Số lượng", "Giá người lớn", "Giá trẻ em", "Điểm đến", "Khả dụng", "Bắt đầu", "Kết thúc"]
            : [
                  "Mã Booking",
                  "Tên tour",
                  "Khách hàng",
                  "Email",
                  "SĐT",
                  "Địa chỉ",
                  "Ngày đặt",
                  "Người lớn",
                  "Trẻ em",
                  "Tổng tiền",
                  "Trạng thái",
                  "Thanh toán",
                  "Phương thức",
              ];

    const rows = data.map((item) =>
        type === "tour"
            ? [
                  item.title || "N/A",
                  item.duration || "N/A",
                  item.description || "N/A",
                  item.quantity || 0,
                  item.price_adult || 0,
                  item.price_child || 0,
                  item.destination || "N/A",
                  item.availability ? "Có" : "Không",
                  item.startDate || "N/A",
                  item.endDate || "N/A",
              ]
            : [
                  item.booking_id || "N/A",
                  item.title || "N/A",
                  item.full_name || "N/A",
                  item.email || "N/A",
                  item.phone_number || "N/A",
                  item.address || "N/A",
                  item.created_at || "N/A",
                  item.num_adults || 0,
                  item.num_children || 0,
                  item.total_price || 0,
                  item.booking_status || "N/A",
                  item.payment_status || "N/A",
                  item.payment_method || "N/A",
              ],
    );

    autoTable(doc, {
        head: [headers],
        body: rows,
        theme: "grid",
        styles: {
            font: "Roboto-Regular",
            fontSize: 10,
            textColor: [0, 0, 0],
            cellPadding: 5,
            halign: "left",
        },
        headStyles: {
            font: "Roboto_Condensed-Bold",
            fontSize: 12,
            fontStyle: "normal",
            fillColor: [41, 128, 185],
            textColor: [255, 255, 255],
        },
        startY: 40,
    });

    doc.save(`${type}.pdf`);
};

export const handlePrintReport = (item, type) => {
    const printWindow = window.open("", "", "width=900,height=700");
    const currentDate = new Date().toLocaleString("vi-VN");

    // Kiểm tra dữ liệu đầu vào
    if (!item) {
        printWindow.document.write("<h1>Lỗi: Dữ liệu hóa đơn không hợp lệ</h1>");
        printWindow.document.close();
        return;
    }

    // Tính toán giá
    const totalAdult = (item?.adults || 0) * (item?.unitPriceAdult || 0);
    const totalChild = (item?.children || 0) * (item?.unitPriceChild || 0);
    const originalPrice = totalAdult + totalChild;
    const tax = item?.tax || 0;
    const discount = item?.discount || 0;
    const finalPrice = originalPrice + tax - discount;

    // Thông tin nhà cung cấp
    const provider = {
        companyName: "Công ty Du lịch GoViet",
        address: "123 Đường Quang Trung, Quận Thanh Khê, TP. Đà Nẵng",
        phone: "0901234567",
        email: "support@goviet.com",
    };

    if (type === "invoice") {
        const html = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hóa đơn - GoViet</title>
            <style>
                @page { 
                    size: A4; 
                    margin: 10mm; 
                }
                body { 
                    font-family: 'Arial', sans-serif; 
                    font-size: 11px; 
                    line-height: 1.3; 
                    color: #333; 
                    margin: 0; 
                    padding: 0; 
                }
                .container { 
                    width: 190mm; 
                    min-height: 277mm; 
                    margin: 0 auto; 
                    background: #fff; 
                    padding: 10mm; 
                    box-sizing: border-box; 
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 10px; 
                }
                .header img { 
                    max-width: 60px; 
                    vertical-align: middle; 
                }
                .header h2 { 
                    font-size: 18px; 
                    color: #1e40af; 
                    margin: 5px 0; 
                }
                .section { 
                    margin-bottom: 10px; 
                }
                .section h3 { 
                    font-size: 13px; 
                    font-weight: bold; 
                    margin-bottom: 5px; 
                    color: #1e40af; 
                }
                .grid-2 { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 10px; 
                }
                .grid-2 p { 
                    margin: 2px 0; 
                }
                table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin-bottom: 10px; 
                    font-size: 10px; 
                }
                th, td { 
                    border: 1px solid #ccc; 
                    padding: 5px; 
                    text-align: left; 
                }
                th { 
                    background: #e5e7eb; 
                    font-weight: bold; 
                }
                .text-right { 
                    text-align: right; 
                }
                .text-bold { 
                    font-weight: bold; 
                }
                .footer { 
                    text-align: center; 
                    font-size: 9px; 
                    margin-top: 10px; 
                    border-top: 1px solid #ccc; 
                    padding-top: 5px; 
                }
                hr { 
                    border: none; 
                    border-top: 1px solid #ccc; 
                    margin: 10px 0; 
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="${photo}" alt="Logo GoViet" />
                    <h2>HÓA ĐƠN THANH TOÁN</h2>
                    <p><strong>Thời gian lập hóa đơn:</strong> ${currentDate}</p>
                </div>
                <hr />

                <!-- Customer & Provider Info -->
                <div class="section grid-2">
                    <div>
                        <h3>Thông tin khách hàng</h3>
                        <p><strong>Người đặt:</strong> ${item.customerName || "Không xác định"}</p>
                        <p><strong>Địa chỉ:</strong> ${item.address || "Không có"}</p>
                        <p><strong>SĐT:</strong> ${item.phone || "Không có"}</p>
                        <p><strong>Email:</strong> ${item.email || "Không có"}</p>
                    </div>
                    <div>
                        <h3>Thông tin đơn vị cung cấp</h3>
                        <p><strong>Đơn vị:</strong> ${provider.companyName}</p>
                        <p><strong>Địa chỉ:</strong> ${provider.address}</p>
                        <p><strong>SĐT:</strong> ${provider.phone}</p>
                        <p><strong>Email:</strong> ${provider.email}</p>
                    </div>
                </div>
                <hr />

                <!-- Tour Details -->
                <div class="section">
                    <h3>Chi tiết đặt tour</h3>
                    <div class="grid-2">
                        <p><strong>Mã đơn đặt:</strong> ${item.bookingId || "N/A"}</p>
                        <p><strong>Ngày đặt:</strong> ${item.bookingDate || "Không có"}</p>
                        <p><strong>Trạng thái:</strong> ${item.bookingStatus || "Chưa xác nhận"}</p>
                        <p><strong>Mã giao dịch:</strong> ${item.transactionCode || "TX0000"}</p>
                        <p><strong>Ngày thanh toán:</strong> ${item.paymentDate || "Không có"}</p>
                        <p><strong>Tài khoản:</strong> ${item.account || "N/A"}</p>
                    </div>
                </div>
                <hr />

                <!-- Additional Info -->
                <div class="section">
                    <h3>Thông tin bổ sung</h3>
                    <p><strong>Yêu cầu đặc biệt:</strong> ${item.specialRequests || "Không có"}</p>
                    <p><strong>Mã tour:</strong> ${item.tourId || "Không xác định"}</p>
                    <p><strong>Mã người dùng:</strong> ${item.userId || "Không xác định"}</p>
                    <p><strong>Mã khuyến mãi:</strong> ${item.promotionId || "Không có"}</p>
                </div>
                <hr />

                <!-- Pricing Table -->
                <div class="section">
                    <table>
                        <thead>
                            <tr>
                                <th>Hạng mục</th>
                                <th>Số lượng</th>
                                <th>Điểm đến</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Người lớn</td>
                                <td>${item.adults || 0}</td>
                                <td>${item.title || "Tour không xác định"}</td>
                                <td>${(item.unitPriceAdult || 0).toLocaleString("vi-VN")} VND</td>
                                <td>${totalAdult.toLocaleString("vi-VN")} VND</td>
                            </tr>
                            <tr>
                                <td>Trẻ em</td>
                                <td>${item.children || 0}</td>
                                <td>${item.title || "Tour không xác định"}</td>
                                <td>${(item.unitPriceChild || 0).toLocaleString("vi-VN")} VND</td>
                                <td>${totalChild.toLocaleString("vi-VN")} VND</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Summary -->
                <div class="section text-right">
                    <p><strong>Giá gốc:</strong> ${originalPrice.toLocaleString("vi-VN")} VND</p>
                    <p><strong>Thuế:</strong> ${tax.toLocaleString("vi-VN")} VND ${
                        tax > 0 ? `(${((tax / originalPrice) * 100).toFixed(2)}%)` : ""
                    }</p>
                    <p><strong>Giảm giá:</strong> ${discount.toLocaleString("vi-VN")} VND ${
                        discount > 0 ? `(${((discount / originalPrice) * 100).toFixed(2)}%)` : ""
                    }</p>
                    <p class="text-bold"><strong>Tổng cộng:</strong> ${finalPrice.toLocaleString("vi-VN")} VND</p>
                </div>
                <hr />

                <!-- Payment Information -->
                <div class="section">
                    <p><strong>Phương thức thanh toán:</strong> ${item.paymentMethodName || "Không có"}</p>
                    <p><strong>Trạng thái thanh toán:</strong> ${item.paymentStatus || "Chưa thanh toán"}</p>
                </div>
                <hr />

                <!-- Footer -->
                <div class="footer">
                    <p>Nếu có sai sót, vui lòng liên hệ: 
                        <a href="mailto:${provider.email}" class="text-blue-600">${provider.email}</a> | 
                        <a href="tel:${provider.phone}" class="text-blue-600">${provider.phone}</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
};
