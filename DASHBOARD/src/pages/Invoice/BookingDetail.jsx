import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Invoice from "./BookingDetailAll";
import GoBack from "../../components/GoBack/Goback";
import { getInvoiceById } from "../../services/bookingService";
import Swal from "sweetalert2";

const formatTourId = (tourId) => {
    if (!tourId || isNaN(tourId)) return "Không xác định";
    return `Tour${String(tourId).padStart(3, "0")}`;
};

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return Number(priceStr.replace(/[^\d]/g, ""));
};

function BookingDetail() {
    const { id } = useParams();
    const [bookingDetail, setBookingDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                const response = await getInvoiceById(id);
                console.log(response);

                if (response.status === 200 && response.data) {
                    const data = response.data;

                    const mappedData = {
                        bookingId: data.booking_id || id || "N/A",
                        adults: Number(data.num_adults) || 0,
                        children: Number(data.num_children) || 0,
                        totalPrice: parsePrice(data.total_price),
                        unitPriceAdult: parsePrice(data.price_adults),
                        unitPriceChild: parsePrice(data.price_child),
                        customerName: data.full_name || "Không xác định",
                        address: data.address || "Không xác định",
                        phone: data.phone_number || "Không xác định",
                        email: data.email || "Không xác định",
                        bookingDate: data.created_at ? new Date(data.created_at).toLocaleString("vi-VN") : "Không xác định",
                        bookingStatus: data.booking_status
                            ? {
                                  PENDING: "Chưa xác nhận",
                                  CONFIRMED: "Đã xác nhận",
                                  CANCELLED: "Đã hủy",
                                  COMPLETED: "Hoàn thành",
                              }[data.booking_status] || "Không xác định"
                            : "Không xác định",
                        paymentMethodName: data.payment_method || "Không xác định",
                        paymentStatus: data.payment_status
                            ? {
                                  PENDING: "Chưa thanh toán",
                                  COMPLETED: "Đã thanh toán",
                                  PAID: "Đã thanh toán",
                              }[data.payment_status] || "Không xác định"
                            : "Không xác định",
                        transactionCode: data.transaction_id || `TRANS-${id}`,
                        paymentDate: data.updated_at ? new Date(data.updated_at).toLocaleString("vi-VN") : new Date().toLocaleString("vi-VN"),
                        account: data.account || "N/A",
                        tax: Number(data.tax) || 0,
                        discount: Number(data.discount) || 0,
                        title: data.title || "Tour không xác định",
                        specialRequests: data.special_requests || "Không có",
                        tourId: data.formatted_tour_id || formatTourId(data.tour_id),
                        userId: data.user_id || "Không xác định",
                        promotionId: data.promotion_id || "Không có",
                    };
                    setBookingDetail(mappedData);
                } else {
                    throw new Error(response.data?.message || "Lỗi khi lấy thông tin hóa đơn");
                }
            } catch (error) {
                console.error("Error fetching invoice detail:", error);
                setBookingDetail(null);
                if (error.response?.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: "Không tìm thấy hóa đơn",
                        text: "Hóa đơn với ID này không tồn tại.",
                        confirmButtonText: "OK",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Lỗi",
                        text: error.message || "Không thể tải thông tin hóa đơn",
                        confirmButtonText: "OK",
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [id]);

    if (loading) {
        return (
            <div className="py-10 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
                <span className="mt-4 block text-lg text-gray-700 dark:text-gray-200">Đang tải...</span>
            </div>
        );
    }

    if (!bookingDetail) {
        return (
            <div className="py-10 text-center">
                <p className="text-lg text-red-600">Không tìm thấy thông tin hóa đơn!</p>
                <GoBack />
            </div>
        );
    }

    return (
        <>
            <Invoice
                item={bookingDetail}
                key={bookingDetail.bookingId}
            />
            <GoBack />
        </>
    );
}

export default BookingDetail;
