import AdminSidebar from "../component/AdminSidebar";
import SubmissionTable from "../component/SubmissionTable";
import AdminHeader from "../component/AdminHeader";

const SubmissionsPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      <div className="w-[20%] h-full">
        <AdminSidebar />
      </div>

      <div className="w-full flex flex-col items-center">

        <div className="w-full">
          <AdminHeader />
        </div>

        <div className="w-full p-4 h-[calc(100vh-48px)] overflow-auto">
          <SubmissionTable />
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
