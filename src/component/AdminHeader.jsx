import { Menu } from "lucide-react";

const AdminHeader = ({ onToggleSidebar, message }) => {
  return (
    <header className="w-full h-14 bg-white flex items-center px-4 shadow-sm sticky top-0 z-30">

      <button
        onClick={onToggleSidebar}
        className="lg:hidden mr-3 text-gray-700"
      >
        <Menu size={26} />
      </button>

      <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 w-full text-center lg:text-left">
        {message}
      </h1>
    </header>
  );
};

export default AdminHeader;
