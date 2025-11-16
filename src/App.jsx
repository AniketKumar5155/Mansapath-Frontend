import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormPage from "./page/FormPage";
import OperatorLogin from "./page/OperatorLoginPage";
import SubmissionsPage from "./page/SubmissionsPage";
import AdminDashboard from "./page/adminDashboard";
import EmployeesPage from "./page/EmployeesPage";

const App = () => {
  return (
    <>
    <BrowserRouter>
  <ToastContainer />

  <Routes>
    <Route path = "/form" element={<FormPage/>}/>
    <Route path = "/submissions" element={<SubmissionsPage/>} />
    <Route path = "/operator-login" element={<OperatorLogin/>} />
    <Route path = "/admin-dashboard" element={<AdminDashboard/>} />
    <Route path = "/employees" element={<EmployeesPage/>} />
  </Routes>



</BrowserRouter>
    </>
  )
}

export default App
