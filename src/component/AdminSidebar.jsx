import { Home, PlusSquare, User, LogOut, Folder } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: <Home size={18} />, label: "Dashboard", path: "/admin-dashboard" },
    { icon: <Folder size={18} />, label: "Employees", path: "/employees" }, 
    { icon: <PlusSquare size={18} />, label: "Create Submission", path: "/form" },
    { icon: <Folder size={18} />, label: "Submissions", path: "/submissions" },
    { icon: <User size={18} />, label: "Profile", path: "/admin/profile" },
  ];

  return (
    <div className="h-screen w-60 bg-white border-r shadow-sm flex flex-col px-2 sticky top-0">
      <div className="py-4 px-4 text-2xl font-bold text-blue-900">
        Manasapath
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </ul>

      <div className="grow" />

      <ul className="pb-4">
        <SidebarItem
          icon={<LogOut size={18} />}
          label="Logout"
          onClick={() => navigate("/operator-login")}
          isLogout
        />
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, active, isLogout }) => (
  <li
    className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md
      ${
        isLogout
          ? "text-red-600 hover:bg-red-100 font-semibold"
          : active
          ? "bg-blue-100 text-blue-900 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    onClick={onClick}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </li>
);

export default AdminSidebar;
