import axiosEmployeeInstance from "../axiosInstance/axiosEmployeeInstance";

export const createEmployee = async (formData) => {
    const res = await axiosEmployeeInstance.post("/create-employee", formData);
    return res.data.data;
}

export const getAllEmployees = async (page = 1, limit = 10, search = "", filter = "", sortType = "", sortDirection) => {
    const res = await axiosEmployeeInstance.get(`/employees?page=${page}&limit=${limit}&search=${search}&status=${filter}&sortType=${sortType}&sortDirection=${sortDirection}`)
    return res.data.data.employees
}

export const getEmployeeById = async (id) => {
    const res = await axiosEmployeeInstance.get(`/employee/${id}`);
    return res.data.data;
}

export const updateEmployee = async (id, formData) => {
    const res = await axiosEmployeeInstance.patch(`/update-employee/${id}`, formData);
    return res.data.data;
}
