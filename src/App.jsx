import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormPage from "./page/FormPage";
import OperatorLogin from "./page/OperatorLoginPage";
import SubmissionsPage from "./page/SubmissionsPage";
import AdminDashboard from "./page/adminDashboard";
import EmployeesPage from "./page/EmployeesPage";
import EmployeeCreatePage from "./page/EmployeeCreatePage";
import HomePage from "./page/HomePage";

const App = () => {
  const theme = localStorage.getItem("theme");
  return (
    <>
    <BrowserRouter>
  <ToastContainer />

  <Routes>
    <Route path = "/" element={<HomePage  />}/>
    <Route path = "/book-session" element={<FormPage/>}/>
    <Route path = "/superadmin/create-employee" element={<EmployeeCreatePage/>}/>
    <Route path = "/admin/submissions" element={<SubmissionsPage/>} />
    <Route path = "/operator-login" element={<OperatorLogin/>} />
    <Route path = "/superadmin/dashboard" element={<AdminDashboard/>} />
    <Route path = "/superadmin/employees" element={<EmployeesPage/>} />
  </Routes>



</BrowserRouter>
    </>
  )
}

export default App
