import { create } from "zustand";
import { createUserQueryService } from "../service/userQueryService";

const useUserQueryStore = create((set) => ({
  userQueries: [],
  loading: false,
  error: null,

  createUserQuery: async (payload) => {
    set({ loading: true, error: null });

    try {
      const userQuery = await createUserQueryService(payload);

      set((state) => ({
        userQueries: [...state.userQueries, userQuery],
        loading: false,
        error: null,
      }));

      return true;
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;

      const message =
        Array.isArray(apiErrors) && apiErrors.length > 0
          ? apiErrors[0].message
          : error.message || "Something went wrong";

      set({
        error: message,
        loading: false,
      });

      return false;
    }
  },
}));

export default useUserQueryStore;
