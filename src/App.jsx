import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import { Toaster } from "react-hot-toast"

import FormPage from "./page/FormPage";
import OperatorLogin from "./page/OperatorLoginPage";
import SubmissionsPage from "./page/SubmissionsPage";
import AdminDashboard from "./page/AdminDashboard";
import EmployeesPage from "./page/EmployeesPage";
import EmployeeCreatePage from "./page/EmployeeCreatePage";
import EmployeeLeaderboardPage from "./page/EmployeeLeaderboardPage";
import HomePage from "./page/HomePage";
import ProfilePage from "./page/ProfilePage";

import AdminRoute from "./component/AdminRoute";
import EnrolledSubmissionsPage from "./page/AcceptedSubmissionsPage";
import ServicePage from "./page/ServicePage";
import AboutPage from "./page/AboutPage";
import PrivacyPolicyPage from "./page/PrivacyPolicyPage";
import AuthGate from "./component/AuthGate";


const App = () => {
  const { accessToken, user, getProfile } = useAuthStore();

  useEffect(() => {
    if (accessToken && !user) {
      getProfile();
    }
  }, [accessToken, user, getProfile]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/operator-login" element={<OperatorLogin />} />
        <Route path="/book-session" element={<FormPage />} />

        <Route element={<AuthGate/>} >
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

          <Route
            path="/superadmin/leaderboard"
            element={
              <AdminRoute>
                <EmployeeLeaderboardPage />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>

    </BrowserRouter>
  );
};

export default App;
