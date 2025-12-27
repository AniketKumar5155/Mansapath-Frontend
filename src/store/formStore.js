import { create } from "zustand";
import {
    acceptSubmissionService,
    createFormSubmissionService,
    getAllacceptedSubmissionService,
    getAllSubmissionsService,
    getSubmissionsService,
    updateSubmissionService,
} from "../service/formService";

const useFormStore = create((set) => ({
    submissions: [],
    acceptedSubmissions: [],
    allSubmissions: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,

    submitForm: async (formData) => {
        set({ loading: true, error: null });
        try {
            const data = await createFormSubmissionService(formData);

            set((state) => ({
                submissions: [...state.submissions, data],
            }));

            return {
                success: true,
                message: "Form submitted successfully",
                data,
            };
        } catch (error) {
            const message =
                error.response?.data?.message || error.message;
            set({ error: message });
            return { success: false, error: message };
        } finally {
            set({ loading: false });
        }
    },

    getAllSubmissions: async () => {
        set({ loading: true, error: null });
        try {
            const fetchedSubmissions = await getAllSubmissionsService();
            set({ allSubmissions: fetchedSubmissions });
        } catch (error) {
            const message =
                error.response?.data?.error || error.message;
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    getSubmissions: async (
        page = 1,
        limit = 10,
        search = "",
        status = "",
        category = "",
        sortType = "",
        sortDirection = ""
    ) => {
        set({ loading: true, error: null });
        try {
            const res = await getSubmissionsService(
                page,
                limit,
                search,
                status,
                category,
                sortType,
                sortDirection
            );

            set({
                submissions: res.data.submissions,
                total: res.data.totalItems,
                page: res.data.currentPage,
                limit: res.data.limit,
            });
        } catch (error) {
            const message =
                error.response?.data?.error || error.message;
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },

    updateSubmission: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
            const data = await updateSubmissionService(id, updatedData);

            set((state) => ({
                submissions: state.submissions.map((s) =>
                    s.id === id ? data : s
                ),
            }));

            return {
                success: true,
                message: "Form updated successfully",
                data,
            };
        } catch (error) {
            const message =
                error.response?.data?.error || error.message;
            set({ error: message });
            return { success: false, error: message };
        } finally {
            set({ loading: false });
        }
    },

    acceptSubmission: async (id) => {
        set({ loading: true, error: null });
        try {
            const submission = await acceptSubmissionService(id);

            set((state) => ({
                acceptedSubmissions: [
                    ...state.acceptedSubmissions,
                    submission,
                ],
                submissions: state.submissions.filter(
                    (s) => s.id !== id
                ),
            }));

            return { success: true };
        } catch (error) {
            const message =
                error.response?.data?.error || error.message;
            set({ error: message });
            return { success: false, error: message };
        } finally {
            set({ loading: false });
        }
    },

    getAllEnrolledSubmissions: async () => {
        set({ loading: true, error: null });
        try {
            const submissions =
                await getAllacceptedSubmissionService();
            set({ acceptedSubmissions: submissions });
        } catch (error) {
            const message =
                error.response?.data?.error || error.message;
            set({ error: message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useFormStore;
