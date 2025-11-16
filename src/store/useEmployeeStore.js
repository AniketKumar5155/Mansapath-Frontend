import { create } from "zustand";
import {
    createEmployee,
    getAllEmployees
} from "../service/employeeService";

const useEmployeeStore = create((set => ({
    employees: [],
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
            set({ laoding: false, error: {} });
        }
    },

    getAllEmployees: async () => {
        set({ loading: true, errors: {} });
        try {
            const employees = await getAllEmployees();
            set({ employees: employees });
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to create employee"
            set({ error: message });
        } finally {
            set({ loading: false, error: {} });
        }
    },
})));

export default useEmployeeStore;