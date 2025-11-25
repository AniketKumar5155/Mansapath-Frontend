import { create } from "zustand";
import { getProfileService, operatorLoginService } from "../service/authService";
import axiosAuthInstance from "../axiosInstance/axiosAuthInstance";

const useAuthStore = create((set) => ({
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null,

    login: async (formData) => {
        try {
            set({ loading: true, error: null });

            const res = await operatorLoginService(formData);

            if (!res.success) {
                set({ loading: false, error: res.error || "Login failed" });
                return false;
            }

            localStorage.setItem("accessToken", res.accessToken);

            set({
                user: res.user,
                accessToken: res.accessToken,
                loading: false,
            });

            return true;
        } catch (err) {
            set({ loading: false, error: "Invalid email or password" });
            return false;
        }
    },

    logout: async () => {
        try {
            await axiosAuthInstance.post("/logout");
        } catch (err) { }

        localStorage.removeItem("accessToken");

        set({
            user: null,
            accessToken: null,
            error: null
        });
    },

    getProfile: async () => {
        try {
            set({ loading: true, error: {} });

            const profileData = await getProfileService();
            set({ user: profileData })
        } catch (error) {
            const message = error.response?.data?.error || error.message || "Failed to fetch profile";
            set({ error: message })
        } finally {
            set({ loading: false, error: {} })
        }
    }
}));



export default useAuthStore;
