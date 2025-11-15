import { Home, PlusSquare, User, LogOut, Folder } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="h-screen w-60 bg-white border-r shadow-sm flex flex-col justify-between">
      <ul className="py-4 flex flex-col gap-2">
        <SidebarItem icon={<Home size={18} />} label="Dashboard" />
        <SidebarItem icon={<PlusSquare size={18} />} label="Create Submission" />
        <SidebarItem icon={<Folder size={18} />} label="Submissions" />
        <SidebarItem icon={<User size={18} />} label="Profile" />
      </ul>

      <ul className="pb-4">
        <SidebarItem icon={<LogOut size={18} />} label="Logout" />
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <li className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md">
    {icon}
    <span className="font-medium">{label}</span>
  </li>
);

export default AdminHeader;
