import { create } from "zustand";
import {
    createFormSubmission,
    getAllSubmissions,
} from "../service/formService"

const useFormStore = create((set) => ({
    submissions: [],
    loading: false,
    error: null,

    submitForm: async (formData) => {
        set({ loading: true, errors: {} });
        try {
            const data = await createFormSubmission(formData);
            set((state) => ({
                submissions: [...state.submissions, data],
            }));
            return {
                success: true,
                message: "Form submitted successfully",
                data,
            };
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            set({ error: message });
            return { success: false, error: message };
        } finally {
            set({ loading: false });
        }
    },

    getSubmissions: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getAllSubmissions();
            set({ submissions: data });
        } catch (error) {
            const message = error.response?.data?.error || error.message;
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    }
}));

export default useFormStore;
