import { create } from "zustand";
import {
  acceptSubmissionService,
  createFormSubmissionService,
  getAllAcceptedSubmissionService,
  getEmployeeLeaderboardService,
  getAllSubmissionsService,
  getSubmissionsService,
  getSubmissionByIdService,
  updateSubmissionService,
  deleteFormSubmissionService,
} from "../service/formService";

const useFormStore = create((set) => ({
  submissions: [],
  submission: null,
  acceptedSubmissions: [],
  employeeLeaderboard: [],
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
      const fetchedSubmissions =
        await getAllSubmissionsService();
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

  getSubmissionById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getSubmissionByIdService(id);
      set({ submission: data });
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
      const data = await updateSubmissionService(
        id,
        updatedData
      );

      set((state) => ({
        submissions: state.submissions.map((s) =>
          s.id === id ? data : s
        ),
        submission: data,
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
      const accepted =
        await acceptSubmissionService(id);

      set((state) => ({
        acceptedSubmissions: [
          ...state.acceptedSubmissions,
          accepted,
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
        await getAllAcceptedSubmissionService();
      set({ acceptedSubmissions: submissions });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message;
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  getEmployeeLeaderboard: async () => {
    set({ loading: true, error: null });
    try {
      const leaderboard =
        await getEmployeeLeaderboardService();
      set({ employeeLeaderboard: leaderboard });
    } catch (error) {
      const message =
        error.response?.data?.error || error.response?.data?.message || error.message;
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  deleteSubmission: async (id) => {
  set({ loading: true, error: null });
  try {
    await deleteFormSubmissionService(id);

    set((state) => ({
      submissions: state.submissions.filter((s) => s.id !== id),
      allSubmissions: state.allSubmissions.filter((s) => s.id !== id),
      submission: state.submission?.id === id ? null : state.submission,
    }));

    return { success: true };
  } catch (error) {
    const message = error.response?.data?.error || error.response?.data?.message || error.message;
    set({ error: message });
    return { success: false, error: message };
  } finally {
    set({ loading: false });
  }
}
}));

export default useFormStore;
