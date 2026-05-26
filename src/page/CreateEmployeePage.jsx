import { useState } from "react";

import EmployeeCreateForm from "../component/CreateEmployeeForm";
import AdminSidebar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

const CreateEmployeePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col w-full min-w-0 max-h-screen">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="|CREATE EMPLOYEE|"
        />

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <EmployeeCreateForm />
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeePage;
