import { useState, useEffect } from "react";
import Navbar from "../component/NavBar";
import Form from "../component/Form";

const FormPage = () => {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;

    try {
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch {
      return false;
    }
  });

  const toggleDark = () => {
    setDark((prev) => {
      localStorage.setItem("theme", JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-blue-50 text-gray-800"
      }`}
    >
     <Navbar dark={dark} toggleDark={toggleDark} />

      <Form dark={dark} />
    </div>
  );
};

export default FormPage;
