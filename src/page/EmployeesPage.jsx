import { useState } from "react";
import EmployeesTable from "../component/EmployeesTable";
import AdminSidebar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

const EmployeesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col max-h-screen overflow-x-hidden">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="Employees"
        />

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4">
          <EmployeesTable />
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
