import AdminSidebar from "../component/AdminSidebar";
import Card from "../component/Card";
import { FaClipboardList } from "react-icons/fa";
import useFormStore from "../store/formStore";
import { useEffect, useState } from "react";
import SubmissionStatusDonutChart from "../component/SubmissionStatusDonutChart";
import useEmployeeStore from "../store/useEmployeeStore";

const AdminDashboard = () => {
  const { submissions, getSubmissions } = useFormStore();

  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);
  const [totalManagerCount, setTotalManagerCount] = useState(0)

  const { employees } = useEmployeeStore();

  useEffect(() => {
    getSubmissions();
  }, []);

  useEffect(() => {
    setTotalSubmissions(submissions.length);
    setOpenCount(submissions.filter(s => s.status === "OPEN").length);
    setClosedCount(submissions.filter(s => s.status === "CLOSED").length);
    setPendingCount(submissions.filter(s => s.status === "PENDING").length);
  }, [submissions]);

  useEffect(() => {
    setTotalEmployeesCount(employees.length);
  }, [])

  return (
    <div className="flex max-h-screen bg-gray-100 overflow-hidden">
      <div className="w-[20%]">
        <AdminSidebar />
      </div>

      <div className="w-[80%] flex p-6 gap-6">

        <div className="w-[60%] flex flex-col gap-6">

          <div className="flex flex-wrap gap-6">
            <Card label="Total Submissions" value={totalSubmissions} icon={<FaClipboardList />} />
            <Card label="Open" value={openCount} icon={<FaClipboardList />} />
            <Card label="Pending" value={pendingCount} icon={<FaClipboardList />} />
            <Card label="Closed" value={closedCount} icon={<FaClipboardList />} />
          </div>

          <div className="bg-white rounded-xl shadow p-6 w-[84%]">
            <h2 className="text-lg font-semibold mb-4">Submission Status Overview</h2>
            <div className="flex justify-center">
              <SubmissionStatusDonutChart />
            </div>
          </div>
        </div>

        <div className=" w-[40%] flex flex-col gap-6">

          <div className="flex flex-col gap-6 justify-center items-center">
            <Card label="Total Employees" value={totalEmployeesCount} icon={<FaClipboardList />} />
            <Card label="Total Managers" value={1} icon={<FaClipboardList />} />
          </div>

          <div className="bg-white rounded-xl shadow p-6 w-full h-[350px]">
            <h2 className="text-lg font-semibold mb-4">Additional Chart</h2>

            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Another graph will go here</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
