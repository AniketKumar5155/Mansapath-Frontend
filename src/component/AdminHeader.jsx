import { Menu } from "lucide-react";

const AdminHeader = ({ onToggleSidebar }) => {
  return (
    <header className="w-full h-12 bg-blue-500 flex items-center px-4 shadow-md">

      <button
        onClick={onToggleSidebar}
        className="lg:hidden mr-3 text-gray-800"
      >
        <Menu size={26} />
      </button>

      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center w-full">
        MANASAPATH ADMIN DASHBOARD
      </h1>
    </header>
  );
};

export default AdminHeader;
