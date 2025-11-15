import axiosFormInstance from "../axiosInstance/axiosFormInstance";

export const createFormSubmission = async (formData) => {
    const res = await axiosFormInstance.post("/submit", formData);
    return res.data.data;
}