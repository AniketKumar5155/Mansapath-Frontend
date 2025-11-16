import axiosEmployeeInstance from "../axiosInstance/axiosEmployeeInstance";

export const createEmployee = async (formData) => {
    const res = await axiosEmployeeInstance.post("/create-employee", formData);
    return res.data.data;
}

export const getAllEmployees = async () => {
    const res = await axiosEmployeeInstance.get("/employees")
    return res.data.data
}