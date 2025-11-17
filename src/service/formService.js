import axiosFormInstance from "../axiosInstance/axiosFormInstance";

export const createFormSubmission = async (formData) => {
    const res = await axiosFormInstance.post("/submit", formData);
    return res.data.data;
}

export const getAllSubmissions = async (page = 1, limit = 10) => {
    const res = await axiosFormInstance.get(`/submissions?page=${page}&limit=${limit}`);
    return res.data;
};

export const updateSubmission = async (id, updatedData) => {
    const res = await axiosFormInstance.patch(`/update-submission/${id}`, updatedData)
    return res.data.data;
}