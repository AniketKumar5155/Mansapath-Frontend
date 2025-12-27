import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";

import FormPage from "./page/FormPage";
import OperatorLogin from "./page/OperatorLoginPage";
import SubmissionsPage from "./page/SubmissionsPage";
import AdminDashboard from "./page/adminDashboard";
import EmployeesPage from "./page/EmployeesPage";
import EmployeeCreatePage from "./page/EmployeeCreatePage";
import HomePage from "./page/HomePage";
import ProfilePage from "./page/ProfilePage";

import AdminRoute from "./component/AdminRoute";
import EnrolledSubmissionsPage from "./page/acceptedSubmissionsPage";

const App = () => {
  const { accessToken, user, getProfile } = useAuthStore();

  useEffect(() => {
    if (accessToken && !user) {
      getProfile();
    }
  }, [accessToken, user, getProfile]);

  return (
    <BrowserRouter>
      <ToastContainer />

      {accessToken && !user ? (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-session" element={<FormPage />} />
          <Route path="/operator-login" element={<OperatorLogin />} />
          <Route path="/admin/submissions" element={<SubmissionsPage />} />
          <Route path="/profile/me" element={<ProfilePage />} />

          <Route
            path="/superadmin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/superadmin/create-employee"
            element={
              <AdminRoute>
                <EmployeeCreatePage />
              </AdminRoute>
            }
          />

          <Route
            path="/superadmin/employees"
            element={
              <AdminRoute>
                <EmployeesPage />
              </AdminRoute>
            }
          />

          <Route
            path="/superadmin/enrolled"
            element={
              <AdminRoute>
                <EnrolledSubmissionsPage />
              </AdminRoute>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
