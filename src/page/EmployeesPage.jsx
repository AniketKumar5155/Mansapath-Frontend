import { useState } from "react";
import EmployeesTable from "../component/EmployeesTable";
import AdminSidebar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
const EmployeesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-white z-50 
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <AdminSidebar open={true} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col w-full min-w-0 max-h-screen">

        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="|MANASPATH EMPLOYEES|"
        />

        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <EmployeesTable />
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
