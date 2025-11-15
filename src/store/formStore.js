import { create } from "zustand";
import {
    createFormSubmission
} from "../service/formService"

const useFormStore = create((set) => ({
    formSubmissions: [],
    loading: false,
    error: {},
    setErrors: (errors) => set({ errors }),

    submitForm: async (formData) => {
        set({ loading: true, errros: {} });
        try {
            const data = await createFormSubmission(formData);
            set((state) => ({
                formSubmissions: [...state.formSubmissions, data],
            }));
            return {
                success: true,
                message: "Form submitted successfully",
                data,
            };
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to submit form";
            set({ errors: message });
            return {
                success: false,
                error: message,
            };
        } finally {
            set({ loading: false });
        }
    }
}))

export default useFormStore;