import AdminSidebar from "../component/AdminSidebar";
import SubmissionTable from "../component/SubmissionTable";
import AdminHeader from "../component/AdminHeader";

const SubmissionsPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-[20%]">
        <AdminSidebar />
      </div>

      <div className="w-full flex flex-col items-center">
        <AdminHeader />

        <div className="w-full p-4">
          <SubmissionTable />
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
