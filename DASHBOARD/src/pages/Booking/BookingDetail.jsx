import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Invoice from "./BookingDetailAll";
import GoBack from "../../components/GoBack/Goback";
import { getDataBookingTourById } from "../../services/bookingService";

// Hàm định dạng tour_id
const formatTourId = (tourId) => {
    if (!tourId || isNaN(tourId)) return "Không xác định";
    return `Tour${String(tourId).padStart(3, "0")}`;
};

function BookingDetail() {
    const { id } = useParams();
    const [bookingDetail, setBookingDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                const response = await getDataBookingTourById(id);

                if (response.status === 200) {
                    const data = response.data;

                    const mappedData = {
                        bookingId: data.booking_id || id || "N/A",
                        adults: Number(data.num_adults) || 0,
                        children: Number(data.num_children) || 0,
                        totalPrice: Number(data.total_price) || 0,
                        unitPriceAdult:
                            data.num_adults && Number(data.total_price) > 0
                                ? Math.round((Number(data.total_price) * 0.7) / Number(data.num_adults))
                                : 0,
                        unitPriceChild:
                            data.num_children && Number(data.total_price) > 0
                                ? Math.round((Number(data.total_price) * 0.3) / Number(data.num_children))
                                : 0,
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
                        account: "N/A",
                        tax: Number(data.tax) || 0,
                        discount: data.promotion_id ? Math.round(Number(data.total_price) * 0.1) : 0,
                        title: data.title || "Tour không xác định",
                        specialRequests: data.special_requests || "Không có",
                        tourId: data.formatted_tour_id || formatTourId(data.tour_id),
                        userId: data.user_id || "Không xác định",
                        promotionId: data.promotion_id || "Không có",
                    };
                    setBookingDetail(mappedData);
                } else {
                    throw new Error(response.data || "Lỗi khi lấy thông tin booking");
                }
            } catch (error) {
                console.error("Error fetching booking detail:", error);
                setBookingDetail(null);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [id]);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (!bookingDetail) {
        return <p>Không tìm thấy!</p>;
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
