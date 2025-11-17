import { create } from "zustand";
import {
    createFormSubmission,
    getAllSubmissions,
    updateSubmission,
} from "../service/formService"

const useFormStore = create((set) => ({
    submissions: [],
    total: 0,
    page: 1,
    limit: 10,
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

    getSubmissions: async (page = 1, limit = 10) => {
        set({ loading: true, error: null });
        try {
            const res = await getAllSubmissions(page, limit);


            set({
                submissions: res.data.submissions, 
                total: res.data.totalItems,        
                page: res.data.currentPage,
                limit: res.data.limit
            });

        } catch (error) {
            const message = error.response?.data?.error || error.message;
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    updateSubmission: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
            const data = await updateSubmission(id, updatedData);

            set((state) => ({
                submissions: state.submissions.map((s) =>
                    s.id === id ? data : s
                )
            }));

            return {
                success: true,
                message: "Form updated successfully",
                data
            };

        } catch (error) {
            const message = error.response?.data?.error || error.message;
            set({ error: message })
            return { success: false, error: message };
        } finally {
            set({ loading: false });
        }
    },
}));

export default useFormStore;
