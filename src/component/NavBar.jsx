import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Menu, Moon, Sun, X } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import logo from "../assets/brand-brain-emblem-logo.png";

const Navbar = ({ dark, toggleDark }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken, user } = useAuthStore();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About", path: "/about-us" },
    { label: "Privacy Policy", path: "/privacy-policy" }
  ];

  const canAccessAdmin =
    accessToken && (user?.role === "SUPERADMIN" || user?.role === "EMPLOYEE");
  const adminPath =
    user?.role === "SUPERADMIN" ? "/superadmin/dashboard" : "/admin/submissions";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`shadow-sm sticky top-0 z-50 transition ${
        dark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <img
          src={logo}
          alt="Manpath Logo"
          className="h-12 w-12 cursor-pointer"
          onClick={() => {
            closeMenu();
            navigate("/");
          }}
        />

        <nav className="space-x-8 hidden md:block">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-blue-600 hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className={`p-2 rounded-full transition hover:scale-110 ${
              dark ? "bg-gray-700 text-yellow-400" : "bg-gray-100"
            }`}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/book-session"
            className="hidden sm:inline-flex bg-blue-600 text-white px-4 py-2 rounded-2xl shadow hover:bg-blue-700 transition"
          >
            Book Session
          </Link>

          {canAccessAdmin && (
            <Link
              to={adminPath}
              className={`hidden sm:inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-medium shadow-sm transition ${
                dark
                  ? "border-blue-400/50 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
                  : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <LayoutDashboard size={18} />
              Admin Space
            </Link>
          )}

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`md:hidden p-2 rounded-full transition ${
              dark ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className={`md:hidden border-t px-4 py-3 ${
            dark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
          }`}
        >
          <div className="max-w-7xl mx-auto grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`rounded-lg px-3 py-3 font-medium transition ${
                  dark
                    ? "hover:bg-gray-700 hover:text-blue-300"
                    : "hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book-session"
              onClick={closeMenu}
              className="rounded-lg bg-blue-600 px-3 py-3 text-center font-medium text-white shadow hover:bg-blue-700 transition"
            >
              Book Session
            </Link>
            {canAccessAdmin && (
              <Link
                to={adminPath}
                onClick={closeMenu}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 font-medium shadow-sm transition ${
                  dark
                    ? "border border-blue-400/50 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
                    : "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                <LayoutDashboard size={18} />
                Admin Space
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
