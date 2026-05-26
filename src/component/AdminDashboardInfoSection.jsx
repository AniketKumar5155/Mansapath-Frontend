import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../component/Card";
import {
  LuChartPie,
  LuClipboardList,
  LuClock,
  LuFolder,
  LuShieldCheck,
  LuTrendingUp,
} from "react-icons/lu";
import useFormStore from "../store/formStore";
import useEmployeeStore from "../store/useEmployeeStore";
import SubmissionStatusDonutChart from "../component/SubmissionStatusDonutChart";
import SubmissionCategoryDonutChart from "../component/SubmissionCategoryDonutChart";

const percent = (part, total) => {
  if (!total) return 0;
  return Math.round((part / total) * 100);
};

const normalize = (value) => value?.trim().toUpperCase();

const AdminDashboardInfoSection = () => {
  const { allSubmissions, getAllSubmissions } = useFormStore();
  const { employees, getAllEmployees } = useEmployeeStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllSubmissions();
    getAllEmployees();
  }, [getAllSubmissions, getAllEmployees]);

  const metrics = useMemo(() => {
    const submissions = Array.isArray(allSubmissions) ? allSubmissions : [];
    const enrolled = submissions.filter(
      (submission) => normalize(submission.status) === "ENROLLED"
    );
    const pending = submissions.filter(
      (submission) => normalize(submission.status) === "PENDING"
    );
    const rejected = submissions.filter(
      (submission) => normalize(submission.status) === "REJECTED"
    );
    const total = submissions.length;
    const notEntertained = Math.max(
      total - enrolled.length - pending.length - rejected.length,
      0
    );

    const enrolledCategories = enrolled.reduce((acc, submission) => {
      const category = normalize(submission.category);
      if (!category) return acc;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      enrolled: enrolled.length,
      pending: pending.length,
      rejected: rejected.length,
      notEntertained,
      brainGym: enrolledCategories["BRAIN GYM"] || 0,
      chaitanya: enrolledCategories.CHAITANYA || 0,
      bodh: enrolledCategories.BODH || 0,
    };
  }, [allSubmissions]);

  const totalEmployees = Array.isArray(employees) ? employees.length : 0;

  const statusCards = [
    {
      label: "Not Reviewed",
      value: metrics.notEntertained,
      icon: <LuClipboardList />,
      accent: "slate",
      path: "/admin/submissions?status=NOT_ENTERTAINED",
      subtitle: `${percent(metrics.notEntertained, metrics.total)}%`,
    },
    {
      label: "Enrolled",
      value: metrics.enrolled,
      icon: <LuFolder />,
      accent: "green",
      path: "/admin/submissions?status=ENROLLED",
      subtitle: `${percent(metrics.enrolled, metrics.total)}%`,
    },
    {
      label: "Pending",
      value: metrics.pending,
      icon: <LuClock />,
      accent: "amber",
      path: "/admin/submissions?status=PENDING",
      subtitle: `${percent(metrics.pending, metrics.total)}%`,
    },
    {
      label: "Rejected",
      value: metrics.rejected,
      icon: <LuClipboardList />,
      accent: "red",
      path: "/admin/submissions?status=REJECTED",
      subtitle: `${percent(metrics.rejected, metrics.total)}%`,
    },
  ];

  const categoryCards = [
    {
      label: "Brain Gym",
      value: metrics.brainGym,
      path: "/admin/submissions?status=ENROLLED&category=BRAIN GYM",
      accent: "indigo",
    },
    {
      label: "Chaitanya",
      value: metrics.chaitanya,
      path: "/admin/submissions?status=ENROLLED&category=CHAITANYA",
      accent: "blue",
    },
    {
      label: "Bodh",
      value: metrics.bodh,
      path: "/admin/submissions?status=ENROLLED&category=BODH",
      accent: "green",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
              <LuTrendingUp />
              Live Operations
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Manpath Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Monitor submissions, enrollment movement, and team capacity from
              one focused workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2">
            <SummaryPill label="Total" value={metrics.total} />
            <SummaryPill label="Enrolled" value={`${percent(metrics.enrolled, metrics.total)}%`} tone="green" />
            <SummaryPill label="Pending" value={`${percent(metrics.pending, metrics.total)}%`} tone="amber" />
            <SummaryPill label="Staff" value={totalEmployees} tone="indigo" />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          icon={<LuClipboardList />}
          title="Submission Numbers By Status"
        />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Card
            label="Total Submissions"
            value={metrics.total}
            icon={<LuClipboardList />}
            accent="blue"
            onClick={() => navigate("/admin/submissions")}
          />
          {statusCards.map((card) => (
            <Card
              key={card.label}
              {...card}
              onClick={() => navigate(card.path)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          icon={<LuFolder />}
          title="Submission Numbers By Category"
        />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categoryCards.map((card) => (
            <Card
              key={card.label}
              label={card.label}
              value={card.value}
              icon={<LuFolder />}
              accent={card.accent}
              subtitle={`${percent(card.value, metrics.enrolled)}%`}
              onClick={() => navigate(card.path)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          icon={<LuShieldCheck />}
          title="Percentage By Status"
        />
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <InsightRow label="Not Reviewed" value={percent(metrics.notEntertained, metrics.total)} tone="slate" />
          <InsightRow label="Enrolled" value={percent(metrics.enrolled, metrics.total)} tone="green" />
          <InsightRow label="Pending" value={percent(metrics.pending, metrics.total)} tone="amber" />
          <InsightRow label="Rejected" value={percent(metrics.rejected, metrics.total)} tone="red" />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          icon={<LuFolder />}
          title="Percentage By Category"
        />
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {categoryCards.map((card) => (
            <InsightRow
              key={card.label}
              label={card.label}
              value={percent(card.value, metrics.enrolled)}
              tone={card.accent}
            />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          icon={<LuChartPie />}
          title="Charts By Status And By Category"
        />
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartPanel title="Chart By Status">
            <SubmissionStatusDonutChart />
          </ChartPanel>
          <ChartPanel title="Chart By Category">
            <SubmissionCategoryDonutChart />
          </ChartPanel>
        </div>
      </section>
    </div>
  );
};

const SummaryPill = ({ label, value, tone = "blue" }) => {
  const tones = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  };

  return (
    <div className={`rounded-lg px-4 py-3 ring-1 ${tones[tone] || tones.blue}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-75">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
};

const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      {subtitle && (
        <p className="text-sm leading-5 text-slate-500">{subtitle}</p>
      )}
    </div>
  </div>
);

const ChartPanel = ({ title, children }) => (
  <div className="min-w-0 rounded-lg border border-slate-100 bg-slate-50/70 p-3 sm:p-4">
    <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-slate-600">
      {title}
    </h3>
    <div className="mt-3 min-h-[270px] sm:min-h-[320px]">{children}</div>
  </div>
);

const InsightRow = ({ label, value, tone }) => {
  const tones = {
    slate: "bg-slate-500",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    indigo: "bg-indigo-500",
    amber: "bg-amber-500",
    red: "bg-rose-500",
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-950">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${tones[tone] || tones.slate}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default AdminDashboardInfoSection;
