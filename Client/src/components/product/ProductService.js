import axiosInstance from "../../utils/axios";
import constants from "../../utils/constants";

export const getProducts = async () => {
    const res = await axiosInstance.get(constants.API_PRODUCTS);
    return res;
}

export const getProductById = async (id) => {
    const res = await axiosInstance.get(`${constants.API_PRODUCTS}/${id}/detail`);
    return res;
}
