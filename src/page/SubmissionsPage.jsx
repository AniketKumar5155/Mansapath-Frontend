import { useState } from "react";
import AdminSidebar from "../component/AdminSidebar";
import SubmissionTable from "../component/SubmissionTable";
import AdminHeader from "../component/AdminHeader";

const SubmissionsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="hidden lg:block w-60 h-full shrink-0">
        <AdminSidebar open={true} onClose={() => {}} />
      </div>

      <div className="lg:hidden">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex flex-col w-full min-w-0">
        
        <AdminHeader onToggleSidebar={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-auto p-4">
          <SubmissionTable />
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
