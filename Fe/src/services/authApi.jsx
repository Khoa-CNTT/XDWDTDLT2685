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
export { loginApi, signupApi };