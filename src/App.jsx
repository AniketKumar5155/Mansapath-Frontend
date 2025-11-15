import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormPage from "./page/FormPage";

const App = () => {
  return (
    <>
    <BrowserRouter>
  <ToastContainer />

  <Routes>
    <Route path = "/form" element={<FormPage/>}/>
  </Routes>

</BrowserRouter>
    </>
  )
}

export default App
