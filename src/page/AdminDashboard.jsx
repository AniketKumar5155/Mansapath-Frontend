import AdminSidebar from "../component/AdminSidebar";
import Card from "../component/Card";
import { FaClipboardList } from "react-icons/fa";
import useFormStore from "../store/formStore";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { submissions, getSubmissions } = useFormStore();
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    getSubmissions();
  }, []);

  useEffect(() => {
    setTotalSubmissions(submissions.length);
  }, [submissions]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-[20%]">
        <AdminSidebar />
      </div>

      <div className="w-[80%] p-6 flex flex-col gap-6">
        <div className="flex flex-wrap gap-6 w-[50%]">
          <Card
            label="Total Submissions"
            value={totalSubmissions}
            icon={<FaClipboardList />}
          />
          <Card
            label="Total Submissions Closed"
            value={totalSubmissions}
            icon={<FaClipboardList />}
          />
          <Card
            label="Total Submissions"
            value={totalSubmissions}
            icon={<FaClipboardList />}
          />
          <Card
            label="Total Submissions"
            value={totalSubmissions}
            icon={<FaClipboardList />}
          />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
