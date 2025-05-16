import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VnPayCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        console.log("VnPay callback params:", Object.fromEntries(searchParams.entries()));

        const responseCode = searchParams.get("vnp_ResponseCode");
        const transactionStatus = searchParams.get("vnp_TransactionStatus");

        if (responseCode === "00" && transactionStatus === "00") {
            setTimeout(() => {
                toast.success("Thanh toán thành công!");
                navigate("/tourbooking");
            }, 1500);
        } else if (responseCode && transactionStatus) {
            setTimeout(() => {
                toast.error("Thanh toán thất bại!");
                navigate("/payment");
            }, 1500);
        }
    }, [navigate]);

    return null;
};

export default VnPayCallback;
