import axios from "axios";

const axiosAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth",
  withCredentials: true,
});

axiosAuthInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosAuthInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosAuthInstance.post("/auth/refresh");
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuthInstance(originalRequest);

      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/operator-login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
