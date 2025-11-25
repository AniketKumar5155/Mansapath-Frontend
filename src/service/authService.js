import axiosAuthInstance from "../axiosInstance/axiosAuthInstance";

export const operatorLoginService = async (formData) => {
    const res = await axiosAuthInstance.post("/login", formData);
    return res.data;
};

export const getProfileService = async () => {
    const res = await axiosAuthInstance.get("/profile/me")
    return res.data.data;
}
