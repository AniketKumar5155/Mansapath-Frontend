import { useState } from "react";

import CreateEmployeeForm from "../component/CreateEmployeeForm";
import AdminSidebar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

const CreateEmployeePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-linear-to-br from-sky-50 via-white to-cyan-50">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col max-h-screen overflow-x-hidden">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="Create Employee"
        />

        <div className="flex-1 overflow-y-auto">
          <CreateEmployeeForm />
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeePage;
