import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const axiosFormInstance = axios.create({
    baseURL:    `${BACKEND_URL}/api/forms`,
    withCredentials: true,
})

export default axiosFormInstance;
