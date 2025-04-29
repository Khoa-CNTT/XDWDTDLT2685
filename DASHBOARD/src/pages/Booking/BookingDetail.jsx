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

                setBookingDetail(response);
            } catch (error) {
                console.error("Error fetching booking detail:", error);
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
                key={bookingDetail.id}
            />
        </>
    );
}
export default BookingDetail;
