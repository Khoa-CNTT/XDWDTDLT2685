import React from "react";
import photo from "../../assets/Img/touricons.png";
import ToolReport from "../../components/ToolReport";
import GoBack from "../../components/GoBack/Goback";
function Invoice({ item }) {
    const totalAdult = item.adults * item.unitPriceAdult;
    const totalChild = item.children * item.unitPriceChild;
    // Lấy giá trị thuế và giảm giá, mặc định là 0 nếu không có
    const tax = item.tax || 0;
    const discount = item.discount || 0;
    // Tính giá gốc (trước thuế và giảm giá)
    const originalPrice = totalAdult + totalChild;
    const finalPrice = originalPrice + tax - discount;
    // Lấy thời gian hiện tại
    const currentDateTime = new Date().toLocaleString("vi-VN");
    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Hóa đơn thanh toán</h1>
            </div>

            {/* Invoice Content */}
            <div className="mx-auto mt-5 rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-slate-950">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={photo}
                            className="h-20 w-20 transform rounded-full bg-gray-50 object-cover dark:bg-slate-950"
                        />

                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{item.tourName}</h2>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Thời gian lập hóa đơn: {currentDateTime}</p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <p className="text-base font-medium text-blue-500 dark:text-blue-300">
                            Người đặt: <span className="font-normal text-gray-700 dark:text-gray-300">{item.customerName}</span>
                        </p>
                        <ul className="mt-2 list-none text-sm text-gray-600 dark:text-gray-400">
                            <li>Địa chỉ: {item.address}</li>
                            <li>SĐT: {item.phone}</li>
                            <li>Email: {item.email}</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-base font-medium text-blue-500 dark:text-blue-300">
                            Đơn vị cung cấp: <span className="font-normal text-gray-700 dark:text-gray-300">{item.provider.companyName}</span>
                        </p>
                        <ul className="mt-2 list-none text-sm text-gray-600 dark:text-gray-400">
                            <li>Địa chỉ: {item.provider.address}</li>
                            <li>SĐT: {item.provider.phone}</li>
                            <li>Email: {item.provider.email}</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-6 flex justify-between rounded-md bg-blue-50 p-4 dark:bg-slate-700">
                    <div>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Mã đơn đặt:</strong> {item.bookingId}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Ngày đặt:</strong> {item.bookingDate}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Trạng thái:</strong>
                            <span
                                className={`ml-2 font-semibold ${
                                    item.bookingStatus === "Đã hoàn thành"
                                        ? "text-green-600"
                                        : item.bookingStatus === "Đã xác nhận"
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                }`}
                            >
                                {item.bookingStatus}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Mã giao dịch:</strong> {item.transactionCode}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Ngày thanh toán:</strong> {item.paymentDate}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-500 dark:text-blue-300">Tài khoản thanh toán:</strong> {item.account}
                        </p>
                    </div>
                </div>

                <hr className="mb-6 border-gray-300 dark:border-gray-600" />

                <table className="mb-6 w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-400 text-white dark:bg-blue-400">
                            <th className="rounded-tl-md p-3 text-left text-sm font-semibold">Hạng mục</th>
                            <th className="p-3 text-center text-sm font-semibold">Số lượng</th>
                            <th className="p-3 text-center text-sm font-semibold">Điểm đến</th>
                            <th className="p-3 text-center text-sm font-semibold">Đơn giá</th>

                            <th className="rounded-tr-md p-3 text-right text-sm font-semibold">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 bg-blue-50 dark:border-gray-700 dark:bg-slate-900">
                            <td className="p-3 text-gray-700 dark:text-stone-50">Người lớn</td>
                            <td className="p-3 text-center text-gray-700 dark:text-stone-50">{item.adults}</td>
                            <td className="p-3 text-center text-gray-700 dark:text-stone-50">{item.tourName}</td>
                            <td className="p-3 text-center text-gray-700 dark:text-stone-50">{item.unitPriceAdult.toLocaleString("vi-VN")} VND</td>
                            <td className="p-3 text-right text-gray-700 dark:text-stone-50">{totalAdult.toLocaleString("vi-VN")} VND</td>
                        </tr>
                        <tr className="border-b border-gray-200 bg-blue-50 dark:border-gray-700 dark:bg-slate-900">
                            <td className="p-3 text-gray-700 dark:text-stone-50">Trẻ em</td>
                            <td className="p-3 text-center text-gray-700 dark:text-stone-50">{item.children}</td>
                            <td className="p-3 text-center text-gray-700 dark:text-stone-50">{item.tourName}</td>
                            <td className="p-3 text-center text-gray-700 dark:text-stone-50">{item.unitPriceChild.toLocaleString("vi-VN")} VND</td>
                            <td className="p-3 text-right text-gray-700 dark:text-stone-50">{totalChild.toLocaleString("vi-VN")} VND</td>
                        </tr>
                    </tbody>
                </table>

                <div className="mb-6 space-y-1 text-right">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Giá gốc:</span> {originalPrice.toLocaleString("vi-VN")} VND
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Thuế:</span> {tax.toLocaleString("vi-VN")} VND{" "}
                        {tax > 0 && <span className="text-xs text-gray-500">({((tax / originalPrice) * 100).toFixed(2)}%)</span>}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Giảm giá:</span> {discount.toLocaleString("vi-VN")} VND{" "}
                        {discount > 0 && <span className="text-xs text-gray-500">({((discount / originalPrice) * 100).toFixed(2)}%)</span>}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Tổng cộng: {finalPrice.toLocaleString("vi-VN")} VND</p>
                </div>

                <div className="mb-6 rounded-md bg-blue-50 p-4 dark:bg-slate-700">
                    <p className="text-sm">
                        <strong className="text-blue-700 dark:text-blue-300">Phương thức thanh toán:</strong> {item.paymentMethodName}
                    </p>
                    <p className="text-sm">
                        <strong className="text-blue-700 dark:text-blue-300">Trạng thái thanh toán:</strong>
                        <span className={`ml-2 font-semibold ${item.paymentStatus === "Đã thanh toán" ? "text-green-600" : "text-red-600"}`}>
                            {item.paymentStatus}
                        </span>
                    </p>
                </div>

                <hr className="mb-6 border-gray-300 dark:border-gray-600" />

                <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <strong className="text-blue-700 dark:text-blue-300">Ghi chú:</strong> Vui lòng kiểm tra thông tin kỹ lưỡng. Nếu có sai sót, hãy
                    liên hệ bộ phận hỗ trợ qua email{" "}
                    <a
                        href={`mailto:${item.provider.email}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        {item.provider.email}
                    </a>{" "}
                    hoặc số điện thoại{" "}
                    <a
                        href={`tel:${item.provider.phone}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        {item.provider.phone} .
                    </a>
                </p>
                <hr className="mb-6 border-gray-300 dark:border-gray-600" />
                <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <GoBack />
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
