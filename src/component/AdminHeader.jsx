import { Menu } from "lucide-react";

const AdminHeader = ({ onToggleSidebar, message }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6">

      <button
        onClick={onToggleSidebar}
        className="mr-3 rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
      >
        <Menu size={26} />
      </button>

      <h1 className="w-full text-center text-base font-bold tracking-tight text-slate-900 sm:text-xl lg:text-left">
        {message}
      </h1>
    </header>
  );
};

export default AdminHeader;
