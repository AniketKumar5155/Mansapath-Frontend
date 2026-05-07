import { useState } from "react";
import AdminSidebar from "../component/AdminSidebar";
import SubmissionTable from "../component/SubmissionTable";
import AdminHeader from "../component/AdminHeader";

const SubmissionsPage = () => {
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
          message="Form Submissions"
        />

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4">
          <SubmissionTable />
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
