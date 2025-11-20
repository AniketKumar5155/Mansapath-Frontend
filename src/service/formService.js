import axiosFormInstance from "../axiosInstance/axiosFormInstance";

export const createFormSubmissionService = async (formData) => {
    const res = await axiosFormInstance.post("/submit", formData);
    return res.data.data;
}

export const getAllSubmissionsService = async (page = 1, limit = 10, search = "", filter = "", sortType = "", sortDirection) => {
    const res = await axiosFormInstance.get(`/submissions?page=${page}&limit=${limit}&search=${search}&status=${filter}&sortType=${sortType}&sortDirection=${sortDirection}`);
    return res.data;
};

export const updateSubmissionService = async (id, updatedData) => {
    const res = await axiosFormInstance.patch(`/update-submission/${id}`, updatedData)
    return res.data.data;
}