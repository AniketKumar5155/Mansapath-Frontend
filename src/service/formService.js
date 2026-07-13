import axiosFormInstance from "../axiosInstance/axiosFormInstance";

export const createFormSubmissionService = async (formData) => {
    const res = await axiosFormInstance.post("/submit", formData);
    return res.data.data;
}

export const getAllSubmissionsService = async () => {
    const res = await axiosFormInstance.get('/all-submissions');
    return res.data.data;
}

export const getSubmissionsService = async (page = 1, limit = 10, search = "", status = "", category = "", sortType = "", sortDirection) => {
    const res = await axiosFormInstance.get(`/submissions?page=${page}&limit=${limit}&search=${search}&status=${status}&category=${category}&sortType=${sortType}&sortDirection=${sortDirection}`);
    console.log(res.data);
    return res.data;
};

export const getSubmissionByIdService = async (id) => {
    const res = await axiosFormInstance.get(`/submission/${id}`);
    return res.data.data;
}

export const updateSubmissionService = async (id, updatedData) => {
    const res = await axiosFormInstance.patch(`/update-submission/${id}`, updatedData);
    return res.data.data;
}

export const acceptSubmissionService = async (id) => {
    const res = await axiosFormInstance.patch(`/accept/${id}`);
    return res.data.data;
}

export const getAllAcceptedSubmissionService = async () => {
    const res = await axiosFormInstance.get(`/all-accepted-submissions`);
    return res.data.data;
}

export const getEmployeeLeaderboardService = async () => {
    const res = await axiosFormInstance.get(`/employee-leaderboard`);
    return res.data.data;
}

export const deleteFormSubmissionService = async (id) => {
    const res = await axiosFormInstance.delete(`/delete-submission/${id}`);
    return res.data.data;
}