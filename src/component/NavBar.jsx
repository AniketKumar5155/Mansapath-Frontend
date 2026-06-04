import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Menu, Moon, Sun, X, Home, Briefcase, Info, Shield } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import logo from "../assets/brand-brain-emblem-logo.png";

const Navbar = ({ dark, toggleDark }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken, user } = useAuthStore();

  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Services", path: "/services", icon: Briefcase },
    { label: "About", path: "/about-us", icon: Info },
    { label: "Privacy", path: "/privacy-policy", icon: Shield }
  ];

  const canAccessAdmin =
    accessToken && (user?.role === "SUPERADMIN" || user?.role === "EMPLOYEE");
  const adminPath =
    user?.role === "SUPERADMIN" ? "/superadmin/dashboard" : "/admin/submissions";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`shadow-lg sticky top-0 z-50 transition border-b-2 ${
        dark ? "bg-linear-to-r from-gray-800 to-gray-900 border-gray-700" : "bg-linear-to-r from-blue-50 to-cyan-50 border-blue-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            closeMenu();
            navigate("/");
          }}
        >
          <img
            src={logo}
            alt="Manpath Logo"
            className="h-14 w-14 transition group-hover:scale-110"
          />
          <div className="hidden sm:block">
            <p className="font-bold text-lg bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Manpath
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">मन से मंजिल तक</p>
          </div>
        </div>

        <nav className="space-x-1 hidden md:flex items-center">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  dark
                    ? "text-gray-200 hover:bg-gray-700 hover:text-blue-300"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className={`p-2 rounded-lg transition hover:scale-110 ${
              dark ? "bg-gray-700 text-yellow-400" : "bg-blue-100 text-blue-600"
            }`}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/book-session"
            className="hidden sm:inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition transform hover:scale-105 font-semibold"
          >
            <Briefcase size={18} />
            Book Session
          </Link>

          {canAccessAdmin && (
            <Link
              to={adminPath}
              className={`hidden sm:inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 font-semibold shadow-md transition transform hover:scale-105 ${
                dark
                  ? "border-blue-400 bg-blue-500/20 text-blue-200 hover:bg-blue-500/30"
                  : "border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              <LayoutDashboard size={18} />
              Admin
            </Link>
          )}

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`md:hidden p-2 rounded-lg transition ${
              dark ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-blue-100 text-gray-800 hover:bg-blue-200"
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className={`md:hidden border-t-2 px-4 py-4 ${
            dark ? "border-gray-700 bg-gray-800" : "border-blue-200 bg-blue-50"
          }`}
        >
          <div className="max-w-7xl mx-auto grid gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition ${
                    dark
                      ? "text-gray-200 hover:bg-gray-700 hover:text-blue-300"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              to="/book-session"
              onClick={closeMenu}
              className="flex items-center gap-3 justify-center rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-800 transition mt-2"
            >
              <Briefcase size={20} />
              Book Session
            </Link>
            {canAccessAdmin && (
              <Link
                to={adminPath}
                onClick={closeMenu}
                className={`flex items-center gap-3 justify-center rounded-lg border-2 px-4 py-3 font-semibold shadow-md transition mt-2 ${
                  dark
                    ? "border-blue-400 bg-blue-500/20 text-blue-200 hover:bg-blue-500/30"
                    : "border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                <LayoutDashboard size={20} />
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
