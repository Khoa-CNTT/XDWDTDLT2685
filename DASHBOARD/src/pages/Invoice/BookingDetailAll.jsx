import React from "react";
import photo from "../../assets/Img/logo.png";
import ToolReport from "../../components/ToolReport";

function Invoice({ item }) {
    // Kiểm tra dữ liệu đầu vào
    if (!item) {
        console.error("Invoice: item is undefined or null", item);
        return <div className="text-center text-red-600">Lỗi: Dữ liệu hóa đơn không hợp lệ</div>;
    }

    // Sử dụng trực tiếp item từ BookingDetail
    const bookingData = {
        customerName: item.customerName || "Không xác định",
        address: item.address || "Không có",
        email: item.email || "Không có",
        phone: item.phone || "Không có",
        adults: Number(item.adults) || 0,
        children: Number(item.children) || 0,
        bookingId: item.bookingId || "N/A",
        bookingDate: item.bookingDate || "Không có",
        bookingStatus: item.bookingStatus || "Chưa xác nhận",
        paymentMethodName: item.paymentMethodName || "Không có",
        paymentStatus: item.paymentStatus || "Chưa thanh toán",
        transactionCode: item.transactionCode || "TX0000",
        paymentDate: item.paymentDate || "Không có",
        account: item.account || "N/A",
        totalPrice: Number(item.totalPrice) || 0,
        unitPriceAdult: Number(item.unitPriceAdult) || 0,
        unitPriceChild: Number(item.unitPriceChild) || 0,
        tax: Number(item.tax) || 0,
        discount: Number(item.discount) || 0,
        title: item.title || "Tour không xác định",
        specialRequests: item.specialRequests || "Không có",
        tourId: item.tourId || "Không xác định",
        userId: item.userId || "Không xác định",
        promotionId: item.promotionId || "Không có",
    };

    // Tính toán giá
    const totalAdult = bookingData.adults * bookingData.unitPriceAdult;
    const totalChild = bookingData.children * bookingData.unitPriceChild;
    const originalPrice = totalAdult + totalChild;
    const finalPrice = originalPrice + bookingData.tax - bookingData.discount;

    // Thời gian hiện tại
    const currentDateTime = new Date().toLocaleString("vi-VN");

    // Thông tin nhà cung cấp
    const provider = {
        companyName: "Công ty Du lịch GoViet",
        address: "123 Đường Quang Trung, Quận Thanh Khê, TP. Đà Nẵng",
        phone: "0901234567",
        email: "support@goviet.com",
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Hóa đơn thanh toán</h1>
            </div>

            {/* Invoice Content */}
            <div
                id="invoice-content"
                className="mx-auto mt-5 rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-slate-950"
            >
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={photo}
                            className="h-20 w-20 transform rounded-full bg-gray-50 object-cover dark:bg-slate-950"
                            alt="Logo"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{bookingData.title}</h2>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Thời gian lập hóa đơn: {currentDateTime}</p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <p className="text-base font-medium text-blue-500 dark:text-blue-300">
                            Người đặt: <span className="font-normal text-gray-700 dark:text-gray-300">{bookingData.customerName}</span>
                        </p>
                        <ul className="mt-2 list-none text-sm text-gray-600 dark:text-gray-400">
                            <li>Địa chỉ: {bookingData.address}</li>
                            <li>SĐT: {bookingData.phone}</li>
                            <li>Email: {bookingData.email}</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-base font-medium text-blue-500 dark:text-blue-300">
                            Đơn vị cung cấp: <span className="font-normal text-gray-700 dark:text-gray-300">{provider.companyName}</span>
                        </p>
                        <ul className="mt-2 list-none text-sm text-gray-600 dark:text-gray-400">
                            <li>Địa chỉ: {provider.address}</li>
                            <li>SĐT: {provider.phone}</li>
                            <li>Email: {provider.email}</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-6 flex justify-between rounded-md bg-blue-50 p-4 dark:bg-slate-700">
                    <div>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Mã đơn đặt:</strong> {bookingData.bookingId}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Ngày đặt:</strong> {bookingData.bookingDate}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Trạng thái:</strong>
                            <span
                                className={`ml-2 font-semibold ${
                                    bookingData.bookingStatus === "Hoàn thành"
                                        ? "text-green-600"
                                        : bookingData.bookingStatus === "Đã xác nhận"
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                }`}
                            >
                                {bookingData.bookingStatus}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Mã giao dịch:</strong> {bookingData.transactionCode}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Ngày thanh toán:</strong> {bookingData.paymentDate}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Tài khoản thanh toán:</strong> {bookingData.account}
                        </p>
                    </div>
                </div>

                {/* Thông tin bổ sung */}
                <div className="mb-6 rounded-md bg-blue-50 p-4 dark:bg-slate-700">
                    <p className="text-sm">
                        <strong className="text-blue-500 dark:text-blue-300">Yêu cầu đặc biệt:</strong> {bookingData.specialRequests}
                    </p>
                    <p className="text-sm">
                        <strong className="text-blue-500 dark:text-blue-300">Mã tour:</strong> {bookingData.tourId}
                    </p>
                    <p className="text-sm">
                        <strong className="text-blue-500 dark:text-blue-300">Mã người dùng:</strong> {bookingData.userId}
                    </p>
                    <p className="text-sm">
                        <strong className="text-blue-500 dark:text-blue-300">Mã khuyến mãi:</strong> {bookingData.promotionId}
                    </p>
                </div>

                <hr className="mb-6 border-gray-300 dark:border-gray-600" />

                <div className="overflow-x-auto">
                    <table className="mb-6 w-full min-w-[600px] border-collapse">
                        <thead>
                            <tr className="bg-blue-400 text-white dark:bg-blue-400">
                                <th className="rounded-tl-md p-3 text-left text-sm font-semibold whitespace-nowrap">Hạng mục</th>
                                <th className="p-3 text-center text-sm font-semibold whitespace-nowrap">Số lượng</th>
                                <th className="p-3 text-center text-sm font-semibold whitespace-nowrap">Điểm đến</th>
                                <th className="p-3 text-center text-sm font-semibold whitespace-nowrap">Đơn giá</th>
                                <th className="rounded-tr-md p-3 text-right text-sm font-semibold whitespace-nowrap">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 bg-blue-50 dark:border-gray-700 dark:bg-slate-900">
                                <td className="p-3 whitespace-nowrap text-gray-700 dark:text-stone-50">Người lớn</td>
                                <td className="p-3 text-center text-gray-700 dark:text-stone-50">{bookingData.adults}</td>
                                <td className="p-3 text-center text-gray-700 dark:text-stone-50">{bookingData.title}</td>
                                <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                                    {(bookingData.unitPriceAdult || 0).toLocaleString("vi-VN")} VND
                                </td>
                                <td className="p-3 text-right text-gray-700 dark:text-stone-50">{(totalAdult || 0).toLocaleString("vi-VN")} VND</td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-blue-50 dark:border-gray-700 dark:bg-slate-900">
                                <td className="p-3 whitespace-nowrap text-gray-700 dark:text-stone-50">Trẻ em</td>
                                <td className="p-3 text-center text-gray-700 dark:text-stone-50">{bookingData.children}</td>
                                <td className="p-3 text-center text-gray-700 dark:text-stone-50">{bookingData.title}</td>
                                <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                                    {(bookingData.unitPriceChild || 0).toLocaleString("vi-VN")} VND
                                </td>
                                <td className="p-3 text-right text-gray-700 dark:text-stone-50">{(totalChild || 0).toLocaleString("vi-VN")} VND</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-6 space-y-1 text-right">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Giá gốc:</span> {(originalPrice || 0).toLocaleString("vi-VN")} VND
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Thuế:</span> {(bookingData.tax || 0).toLocaleString("vi-VN")} VND{" "}
                        {bookingData.tax > 0 && (
                            <span className="text-xs text-gray-500">({((bookingData.tax / originalPrice) * 100).toFixed(2)}%)</span>
                        )}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Giảm giá:</span> {(bookingData.discount || 0).toLocaleString("vi-VN")} VND{" "}
                        {bookingData.discount > 0 && (
                            <span className="text-xs text-gray-500">({((bookingData.discount / originalPrice) * 100).toFixed(2)}%)</span>
                        )}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Tổng cộng: {(finalPrice || 0).toLocaleString("vi-VN")} VND</p>
                </div>

                <div className="mb-6 rounded-md bg-blue-50 p-4 dark:bg-slate-700">
                    <p className="text-sm">
                        <strong className="text-blue-700 dark:text-blue-300">Phương thức thanh toán:</strong>
                        {bookingData.paymentMethodName === "OFFICE"
                            ? "Thanh toán tại văn phòng"
                            : bookingData.paymentMethodName === "VNPAY"
                              ? "VNPAY"
                              : bookingData.paymentMethodName || "Không có"}
                    </p>
                    <p className="text-sm">
                        <strong className="text-blue-700 dark:text-blue-300">Trạng thái thanh toán:</strong>
                        <span className={`ml-2 font-semibold ${bookingData.paymentStatus === "Đã thanh toán" ? "text-green-600" : "text-red-600"}`}>
                            {bookingData.paymentStatus}
                        </span>
                    </p>
                </div>

                <hr className="mb-6 border-gray-300 dark:border-gray-600" />

                <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <strong className="text-blue-700 dark:text-blue-300">Ghi chú:</strong> Vui lòng kiểm tra thông tin kỹ lưỡng. Nếu có sai sót, hãy
                    liên hệ bộ phận hỗ trợ qua email{" "}
                    <a
                        href={`mailto:${provider.email}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        {provider.email}
                    </a>{" "}
                    hoặc số điện thoại{" "}
                    <a
                        href={`tel:${provider.phone}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        {provider.phone}
                    </a>
                    .
                </p>
                <hr className="mb-6 border-gray-300 dark:border-gray-600" />
                <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <ToolReport
                        item={item}
                        type="invoice"
                    />
                </div>
            </div>
        </div>
    );
}

export default Invoice;
