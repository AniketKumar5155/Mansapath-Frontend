import { create } from "zustand";
import { operatorLoginService } from "../service/authService";

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

            // Save token
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

    logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null, accessToken: null });
    },
}));

export default useAuthStore;
