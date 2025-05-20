import axios from "./customize_axios";

const loginApi = (user_name, password) => {
    return axios.post("users/login", { user_name, password })
}
const signupApi = ({ user_name, email, password, confirm_password, roleId }) => {
    return axios.post("users/register", { user_name, email, password, confirm_password, roleId },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
// gửi email quên mật Khẩu
const forgotPassword = (email) => {
    return axios.post("users/forgot-password", { email },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
};
// gửi mã xác nhận
const getCode = (token) => {
    return axios.get("users/verify-reset-token", {
        params: { token },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};
// thay đổi pass
const changePassword = (token, newPassword) => {
    return axios.post("users/reset-password", { token, newPassword },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
};
export { loginApi, signupApi, forgotPassword, getCode,changePassword };

