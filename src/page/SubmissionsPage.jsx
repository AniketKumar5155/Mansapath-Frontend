import { useState } from "react";
import AdminSidebar from "../component/AdminSidebar";
import SubmissionTable from "../component/SubmissionTable";
import AdminHeader from "../component/AdminHeader";

const SubmissionsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 max-h-screen overflow-x-hidden">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="|FORM SUBMISSIONS|"
        />

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 overflow-x-hidden">
          <SubmissionTable />
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
