import {
  Home,
  PlusSquare,
  User,
  LogOut,
  Folder,
  X,
  LayoutDashboard,
  Trophy,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout, accessToken, user } = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      navigate("/operator-login");
    }
  }, [accessToken, navigate]);

  const items = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      path: "/superadmin/dashboard",
      adminOnly: true,
    },
    {
      icon: <PlusSquare size={18} />,
      label: "Create Submission",
      path: "/book-session",
    },
    {
      icon: <Folder size={18} />,
      label: "Submissions",
      path: "/admin/submissions",
    },
    {
      icon: <PlusSquare size={18} />,
      label: "Create Employee",
      path: "/superadmin/create-employee",
      adminOnly: true,
    },
    {
      icon: <Folder size={18} />,
      label: "Employees",
      path: "/superadmin/employees",
      adminOnly: true,
    },
    {
      icon: <Trophy size={18} />,
      label: "Leaderboard",
      path: "/superadmin/leaderboard",
      adminOnly: true,
    },
    { icon: <User size={18} />, label: "Profile", path: "/profile/me" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/operator-login");
    onClose && onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`
        fixed lg:static top-0 left-0 h-screen min-w-60 max-w-60
      bg-white
        px-3 py-4
        z-50 lg:z-10
        flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        <div className="flex shrink-0 items-center justify-between px-2 pb-4">
          <h1 className="text-2xl font-bold text-[#2C7BA0]">Manpath</h1>

          <button className="lg:hidden p-1" onClick={onClose}>
            <X size={26} className="text-gray-700" />
          </button>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto pr-1 flex flex-col gap-2">
          {items
            .filter(
              (item) => !item.adminOnly || user?.role === "SUPERADMIN"
            )
            .map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose && onClose();
                }}
              />
            ))}
        </ul>

        <ul className="shrink-0 border-t border-gray-100 bg-white pt-3 pb-2">
          <SidebarItem
            icon={<LogOut size={18} />}
            label="Logout"
            isLogout
            onClick={handleLogout}
          />
        </ul>
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label, onClick, active, isLogout }) => (
  <li
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md transition
      ${isLogout
        ? "text-red-600 hover:bg-red-100 font-semibold"
        : active
          ? "bg-[#DAF3FE] text-blue-900 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }
    `}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </li>
);

export default AdminSidebar;
