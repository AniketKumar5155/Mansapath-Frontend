import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormPage from "./page/FormPage";
import AdminDashboard from "./page/AdminDashboard";
import OperatorLogin from "./page/OperatorLoginPage";

const App = () => {
  return (
    <>
    <BrowserRouter>
  <ToastContainer />

  <Routes>
    <Route path = "/form" element={<FormPage/>}/>
    <Route path = "/admin-dashboard" element={<AdminDashboard/>} />
    <Route path = "/operator-login" element={<OperatorLogin/>} />
  </Routes>



</BrowserRouter>
    </>
  )
}

export default App
