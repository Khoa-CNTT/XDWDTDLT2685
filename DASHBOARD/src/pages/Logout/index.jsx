/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Logout() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        Swal.fire({
            title: "Xác nhận đăng xuất",
            text: "Bạn có chắc chắn muốn đăng xuất không?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy",
            position: "top",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");

                Swal.fire({
                    title: "Đăng xuất",
                    text: "Bạn đã đăng xuất thành công.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    position: "top-end",
                });

                setTimeout(() => {
                    dispatch(checkLogin(false));
                    nav("/login");
                }, 2000);
            } else {
                nav(-1);
            }
        });
    }, []);

    return null;
}

export default Logout;
