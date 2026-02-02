import axiosUserQueryInstance from "../axiosInstance/axiosUserQueryInstance";

export const createUserQueryService = async (userQueryData) => {
    const res = await axiosUserQueryInstance.post("/submit", userQueryData);
    return res.data.data;
}