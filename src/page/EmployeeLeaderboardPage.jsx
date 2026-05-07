import { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Medal,
  Trophy,
  UserRound,
} from "lucide-react";

import AdminHeader from "../component/AdminHeader";
import AdminSidebar from "../component/AdminSidebar";
import useFormStore from "../store/formStore";
import buildFullName from "../utils/buildFullName";

const CATEGORY_LABELS = {
  CHAITANYA: "Chaitanya",
  "BRAIN GYM": "Brain Gym",
  BODH: "Bodh",
};

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const getSubmissionName = (submission) =>
  buildFullName(
    submission?.first_name,
    submission?.middle_name,
    submission?.last_name
  ) || "Unnamed";

const EmployeeLeaderboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const {
    employeeLeaderboard,
    getEmployeeLeaderboard,
    loading,
    error,
  } = useFormStore();

  useEffect(() => {
    getEmployeeLeaderboard();
  }, [getEmployeeLeaderboard]);

  const leaderboard = useMemo(
    () => (Array.isArray(employeeLeaderboard) ? employeeLeaderboard : []),
    [employeeLeaderboard]
  );

  const activeEmployee = selectedEmployee || leaderboard[0]?.employee_name || "";
  const selectedRow = leaderboard.find(
    (item) => item.employee_name === activeEmployee
  );

  const totalHandled = leaderboard.reduce(
    (total, item) => total + Number(item.total_submissions || 0),
    0
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col max-h-screen overflow-x-hidden">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="Employee Leaderboard"
        />

        <main className="min-h-0 flex-1 overflow-hidden p-3 sm:p-4">
          <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[380px_1fr]">
            <section className="flex min-h-0 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="shrink-0 border-b border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Trophy size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">
                      Leaderboard
                    </h2>
                    <p className="text-sm font-semibold text-slate-500">
                      {totalHandled} enrolled submissions
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-3">
                {loading ? (
                  <div className="rounded-lg border border-slate-200 p-5 text-center text-sm font-semibold text-slate-500">
                    Loading leaderboard...
                  </div>
                ) : error ? (
                  <div className="rounded-lg border border-red-100 bg-red-50 p-5 text-center text-sm font-semibold text-red-700">
                    {error}
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="rounded-lg border border-slate-200 p-5 text-center text-sm font-semibold text-slate-500">
                    No enrolled submissions found
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {leaderboard.map((item, index) => {
                      const active = item.employee_name === activeEmployee;

                      return (
                        <button
                          type="button"
                          key={item.employee_name}
                          onClick={() => setSelectedEmployee(item.employee_name)}
                          className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                            active
                              ? "border-blue-200 bg-blue-50"
                              : "border-slate-200 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                            {index < 3 ? <Medal size={18} /> : index + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-slate-950">
                              {item.employee_name}
                            </p>
                            <p className="text-xs font-semibold text-slate-500">
                              Rank #{index + 1}
                            </p>
                          </div>

                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                            {item.total_submissions}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            <section className="flex min-h-0 min-w-0 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="shrink-0 border-b border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <UserRound size={21} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold text-slate-950">
                        {selectedRow?.employee_name || "Employee"}
                      </h2>
                      <p className="text-sm font-semibold text-slate-500">
                        {selectedRow?.total_submissions || 0} submissions handled
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={getEmployeeLeaderboard}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                {!selectedRow ? (
                  <div className="rounded-lg border border-slate-200 p-5 text-center text-sm font-semibold text-slate-500">
                    Select an employee
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {selectedRow.submissions.map((submission) => (
                      <article
                        key={submission.id}
                        className="rounded-lg border border-slate-200 p-4"
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <ClipboardList
                                size={17}
                                className="shrink-0 text-slate-500"
                              />
                              <p className="truncate text-base font-bold text-slate-950">
                                {getSubmissionName(submission)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                              Submission #{submission.id}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                              {CATEGORY_LABELS[submission.category] ||
                                submission.category ||
                                "Not Assigned"}
                            </span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                              Enrolled
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
                          <Info label="Phone" value={submission.phone_number} />
                          <Info label="Email" value={submission.email || "-"} />
                          <Info
                            label="Enrolled At"
                            value={formatDate(submission.accepted_at)}
                          />
                          <Info
                            label="Payment"
                            value={submission.payment_method || "-"}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="min-w-0">
    <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
    <p className="mt-1 truncate font-semibold text-slate-700">{value}</p>
  </div>
);

export default EmployeeLeaderboardPage;
