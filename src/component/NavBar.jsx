import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ dark, toggleDark }) => {
  const navigate = useNavigate();

  return (
    <header
      className={`shadow-sm sticky top-0 z-50 transition ${
        dark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <img
          src="src/assets/helloUpdated.png"
          alt="Manasapath Logo"
          className="h-12 w-12 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <nav className="space-x-8 hidden md:block">
          <Link to="/" className="hover:text-blue-600 hover:font-bold">
            Home
          </Link>

          <Link
            to="/services"
            className="hover:text-blue-600 hover:font-bold"
          >
            Services
          </Link>

          <Link to="/about-us" className="hover:text-blue-600 hover:font-bold">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-600 hover:font-bold">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDark}
            className={`p-2 rounded-full transition hover:scale-110 ${
              dark ? "bg-gray-700 text-yellow-400" : "bg-gray-100"
            }`}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a href="#contact">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-700 transition">
              Get Help
            </button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
