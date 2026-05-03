import { create } from "zustand";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById
} from "../service/employeeService";

const useEmployeeStore = create((set => ({
    employees: [],
    employee: null,
    loading: false,
    error: {},

    createEmployee: async (formData) => {
        set({ loading: true, errors: {} })
        try {
            const newEmployee = await createEmployee(formData)
            set((state) => ({
                employees: [...state.employees, newEmployee],
            }));
            return {
                success: true,
                message: "Form submitted successfully",
                newEmployee,
            };
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to create employee"
            set({ error: message });
        } finally {
            set({ loading: false, error: {} });
        }
    },

    getAllEmployees: async (page = 1, limit = 10, search = "", filter = "", sortType = "", sortDirection) => {
        set({ loading: true, errors: {} });
        try {
            const employees = await getAllEmployees(page, limit, search, filter, sortType, sortDirection);
            set({ employees: employees });
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to get employees"
            set({ error: message });
        } finally {
            set({ loading: false, error: {} });
        }
    },

     getEmployeeById: async (id) => {
    if (!id) return;
    set({ loading: true, error: null, employee: null });
    try {
      const data = await getEmployeeById(id);
      console.log("employee fetched in store:", data); // <- must log
      set({ employee: data });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message || "Failed to fetch employee" });
    } finally {
      set({ loading: false });
    }
  },
})));

export default useEmployeeStore;