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
    const [enrolledCount, setEnrolledCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [notEntertainedCount, setNotEntertainedCount] = useState(0);
    const [totalEmployeesCount, setTotalEmployeesCount] = useState(0);

    const [enrolledBrainGymCount, setEnrolledBrainGymCount] = useState(0);
    const [enrolledChaitanyaCount, setEnrolledChaitanyaCount] = useState(0);
    const [enrolledBodhCount, setEnrolledBodhCount] = useState(0);

    useEffect(() => {
        getSubmissions();
    }, [getSubmissions]);

    useEffect(() => {
        const enrolled = allSubmissions.filter(
            (s) => s.status?.trim().toUpperCase() === "ENROLLED"
        );
        const pending = allSubmissions.filter(
            (s) => s.status?.trim().toUpperCase() === "PENDING"
        );
        const rejected = allSubmissions.filter(
            (s) => s.status?.trim().toUpperCase() === "REJECTED"
        );

        const total = allSubmissions.length;
        setTotalSubmissions(total);
        setEnrolledCount(enrolled.length);
        setPendingCount(pending.length);
        setRejectedCount(rejected.length);

        const entertainedCount = enrolled.length + pending.length + rejected.length;
        setNotEntertainedCount(total - entertainedCount);

        const categoryCounts = enrolled.reduce((acc, curr) => {
            const category = curr.category?.trim().toUpperCase();
            if (!category) return acc;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        setEnrolledBrainGymCount(categoryCounts["BRAIN GYM"] || 0);
        setEnrolledChaitanyaCount(categoryCounts["CHAITANYA"] || 0);
        setEnrolledBodhCount(categoryCounts["BODH"] || 0);
    }, [allSubmissions]);

    useEffect(() => {
        setTotalEmployeesCount(employees.length);
    }, [employees]);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <div className="flex flex-col gap-6 w-full lg:w-[60%]">
                    <Card label="Total Submissions" value={totalSubmissions} icon={<LuClipboardList />} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Card label="Not Entertained" value={notEntertainedCount} icon={<LuClipboardList />} />
                        <Card label="Enrolled" value={enrolledCount} icon={<LuFolder />} />
                        <Card label="Pending" value={pendingCount} icon={<LuClock />} />
                        <Card label="Rejected" value={rejectedCount} icon={<LuClipboardList />} />
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 w-full mt-4">
                        <h2 className="text-lg font-semibold mb-4">Enrolled Requests by Category</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card label="Brain Gym" value={enrolledBrainGymCount} icon={<LuClipboardList />} />
                            <Card label="Chaitanya" value={enrolledChaitanyaCount} icon={<LuClipboardList />} />
                            <Card label="Bodh" value={enrolledBodhCount} icon={<LuClipboardList />} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 w-full lg:w-[40%]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card label="Total Employees" value={totalEmployeesCount} icon={<LuUsersRound />} />
                        <Card label="Total Managers" value={1} icon={<LuClipboardList />} />
                    </div>
                    <Card
                        label="Quick Insights"
                        icon={<LuClipboardList />}
                        value={
                            <div className="flex flex-col justify-between h-[164px] mt-3">
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Not Entertained</span>
                                        <span className="font-semibold text-gray-700">
                                            {totalSubmissions
                                                ? `${Math.round((notEntertainedCount / totalSubmissions) * 100)}%`
                                                : "0%"}
                                        </span>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Enrollment Rate</span>
                                        <span className="font-semibold text-green-600">
                                            {totalSubmissions
                                                ? `${Math.round((enrolledCount / totalSubmissions) * 100)}%`
                                                : "0%"}
                                        </span>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Pending Rate</span>
                                        <span className="font-semibold text-yellow-600">
                                            {totalSubmissions
                                                ? `${Math.round((pendingCount / totalSubmissions) * 100)}%`
                                                : "0%"}
                                        </span>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Rejected Rate</span>
                                        <span className="font-semibold text-red-600">
                                            {totalSubmissions
                                                ? `${Math.round((rejectedCount / totalSubmissions) * 100)}%`
                                                : "0%"}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t pt-2 text-xs text-gray-400 text-center">
                                    Based on total submissions
                                </div>
                            </div>
                        }
                    />
                    <Card
                        label="Category Insights"
                        icon={<LuFolder />}
                        value={
                            <div className="flex flex-col justify-between h-[140px] mt-3">
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Brain Gym</span>
                                        <span className="font-semibold text-indigo-600">
                                            {enrolledCount
                                                ? `${Math.round((enrolledBrainGymCount / enrolledCount) * 100)}%`
                                                : "0%"}
                                        </span>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Chaitanya</span>
                                        <span className="font-semibold text-purple-600">
                                            {enrolledCount
                                                ? `${Math.round((enrolledChaitanyaCount / enrolledCount) * 100)}%`
                                                : "0%"}
                                        </span>
                                    </div>

                                    <div className="h-px bg-gray-100" />

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Bodh</span>
                                        <span className="font-semibold text-teal-600">
                                            {enrolledCount
                                                ? `${Math.round((enrolledBodhCount / enrolledCount) * 100)}%`
                                                : "0%"}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t pt-2 text-xs text-gray-400 text-center">
                                    Based on enrolled submissions
                                </div>
                            </div>
                        }
                    />

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