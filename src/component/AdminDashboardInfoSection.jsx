import { useEffect, useState } from "react";
import Card from "../component/Card";
import {
    LuClipboardList,
    LuFolder,
    LuClock,
    LuUsersRound,
} from "react-icons/lu";
import useFormStore from "../store/formStore";
import useEmployeeStore from "../store/useEmployeeStore";
import SubmissionStatusDonutChart from "../component/SubmissionStatusDonutChart";
import SubmissionCategoryDonutChart from "../component/SubmissionCategoryDonutChart";

const AdminDashboardInfoSection = () => {
    const { allSubmissions, getSubmissions } = useFormStore();
    const { employees } = useEmployeeStore();

    const [totalSubmissions, setTotalSubmissions] = useState(0);
    const [openCount, setOpenCount] = useState(0);
    const [closedCount, setClosedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);

    const [openMentalFitness, setOpenMentalFitness] = useState(0);
    const [openMentalTherapy, setOpenMentalTherapy] = useState(0);
    const [openChaitainya, setOpenChaitainya] = useState(0);

    useEffect(() => {
        getSubmissions();
    }, []);

    useEffect(() => {
        const open = allSubmissions.filter((s) => s.status === "OPEN");
        const closed = allSubmissions.filter((s) => s.status === "CLOSED");
        const pending = allSubmissions.filter((s) => s.status === "PENDING");

        setTotalSubmissions(allSubmissions.length);
        setOpenCount(open.length);
        setClosedCount(closed.length);
        setPendingCount(pending.length);

        setOpenMentalFitness(open.filter((s) => s.category === "MENTAL FITNESS").length);
        setOpenMentalTherapy(open.filter((s) => s.category === "MENTAL THERAPY").length);
        setOpenChaitainya(open.filter((s) => s.category === "CHAITAINYA").length);
    }, [allSubmissions]);

    useEffect(() => {
        setTotalEmployeesCount(employees.length);
    }, [employees]);

    return (

        <>
        <div className="flex flex-col lg:flex-row gap-8 w-full">

            <div className="flex flex-col gap-8 w-full lg:w-[60%]">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card label="Total Submissions" value={totalSubmissions} icon={<LuClipboardList />} />
                    <Card label="Enrolled" value={openCount} icon={<LuFolder />} />
                    <Card label="Pending" value={pendingCount} icon={<LuClock />} />
                    <Card label="Rejected" value={closedCount} icon={<LuClipboardList />} />
                </div>

                <div className="bg-white rounded-xl shadow p-6 w-full">
                    <h2 className="text-lg font-semibold mb-4">ENROLLED Requests by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card label="Mental Fitness" value={openMentalFitness} icon={<LuClipboardList />} />
                        <Card label="Mental Therapy" value={openMentalTherapy} icon={<LuClipboardList />} />
                        <Card label="Chaitainya" value={openChaitainya} icon={<LuClipboardList />} />
                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-8 w-full lg:w-[40%]">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card label="Total Employees" value={totalEmployeesCount} icon={<LuUsersRound />} />
                    <Card label="Total Managers" value={1} icon={<LuClipboardList />} />
                </div>

                <div className="bg-white rounded-xl shadow p-6 w-full min-h-[330px] flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">To be decided</h2>
                    <div className="flex justify-center items-center flex-1">
                        <p className="text-gray-500">To be decided</p>
                    </div>
                </div>
            </div>
        </div>
             <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-xl shadow p-6 w-full min-h-[350px] mt-10">
         <div className="flex-1 flex flex-col items-center">
             <h2 className="text-lg font-semibold mb-4 text-center">Submission Status Overview</h2>
             <div className="flex justify-center items-center flex-1 w-full" style={{ minHeight: 400 }}>
                 <SubmissionStatusDonutChart />
             </div>
         </div>
         <div className="flex-1 flex flex-col items-center">
             <h2 className="text-lg font-semibold mb-4 text-center">Category Overview</h2>
             <div className="flex justify-center items-center flex-1 w-full" style={{ minHeight: 400 }}>
                 <SubmissionCategoryDonutChart />
             </div>
         </div>
     </div>
    </>
    );
};

export default AdminDashboardInfoSection;
