import axiosFormInstance from "../axiosInstance/axiosFormInstance";

export const createFormSubmission = async (formData) => {
    const res = await axiosFormInstance.post("/submit", formData);
    return res.data.data;
}

export const getAllSubmissions = async () => {
    const res = await axiosFormInstance.get("/submissions")
    return res.data.data
}