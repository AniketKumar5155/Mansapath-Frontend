import axiosAuthInstance from "../axiosInstance/axiosAuthInstance";

export const operatorLoginService = async (formData) => {
    const res = await axiosAuthInstance.post("/login", formData);
    return res.data;
};
