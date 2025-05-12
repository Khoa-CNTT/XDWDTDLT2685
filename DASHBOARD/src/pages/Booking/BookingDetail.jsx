import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataBookingTourById } from "../../services/bookingService";
import Invoice from "./BookingDetailAll";
import GoBack from "../../components/GoBack/Goback";

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
                    // Ánh xạ dữ liệu từ BookingDTO sang định dạng Invoice mong đợi
                    const mappedData = {
                        bookingId: data.bookingId || id,
                        adults: data.numAdults || 0,
                        children: data.numChildren || 0,
                        unitPriceAdult: data.totalPrice ? Math.round(data.totalPrice / (data.numAdults + data.numChildren * 0.5)) : 0, // Giả định giá trẻ em bằng 50% người lớn
                        unitPriceChild: data.totalPrice ? Math.round(data.totalPrice / (data.numAdults + data.numChildren * 0.5)) * 0.5 : 0,
                        customerName: data.fullName || "Không xác định",
                        tourName: data.title || "Không xác định",
                        address: data.address || "Không xác định",
                        phone: data.phoneNumber || "Không xác định",
                        email: data.email || "Không xác định",
                        bookingDate: data.createdAt ? new Date(data.createdAt).toLocaleString("vi-VN") : "Không xác định",
                        bookingStatus: data.bookingStatus
                            ? {
                                  PENDING: "Chưa xác nhận",
                                  CONFIRMED: "Đã xác nhận",
                                  CANCELLED: "Đã hủy",
                              }[data.bookingStatus] || "Không xác định"
                            : "Không xác định",
                        paymentMethodName: data.paymentMethod || "Không xác định",
                        paymentStatus: data.paymentStatus
                            ? {
                                  PENDING: "Chưa thanh toán",
                                  COMPLETED: "Đã thanh toán",
                                  PAID: "Đã thanh toán",
                              }[data.paymentStatus] || "Không xác định"
                            : "Không xác định",
                        transactionCode: data.transactionId || `TRANS-${id}`, // Giả định nếu không có
                        paymentDate: data.paymentDate || new Date().toLocaleString("vi-VN"), // Giả định nếu không có
                        account: "N/A", // Không có trong BookingDTO, gán mặc định
                        tax: 0, // Không có trong BookingDTO, gán mặc định
                        discount: data.promotionId ? Math.round(data.totalPrice * 0.1) : 0, // Giả định giảm giá 10% nếu có promotion
                        title: data.title || "Không xác định",
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
        return <p>Không tìm thấy !</p>;
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
