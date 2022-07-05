import axiosInstance from "../../utils/axios";
import constants from "../../utils/constants";


export const login = async (email, password) => {
    const data = { email, password };
    const res = await axiosInstance.post(constants.API_LOGIN, data);
    return res;
}

export const register = async (email, password, confirm_password) => {
    const data = { email, password, confirm_password };
    const res = await axiosInstance.post(constants.API_REGISTER, data);
    return res;
}