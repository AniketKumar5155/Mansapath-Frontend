import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const axiosUserQueryInstance = axios.create({
    baseURL: `/api/user-query`,
    withCredentials: true
});

axiosUserQueryInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosUserQueryInstance;