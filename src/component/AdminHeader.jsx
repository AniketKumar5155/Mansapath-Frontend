import {
  BarChart3,
  FileCheck2,
  Files,
  Menu,
  ShieldCheck,
  Trophy,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const HEADER_META = {
  "manaspath admin": {
    title: "Dashboard",
    subtitle: "Overview of Manaspath operations and activity",
    icon: <BarChart3 size={22} />,
  },
  "form submissions": {
    title: "Submissions",
    subtitle: "Review session requests and manage follow-ups",
    icon: <Files size={22} />,
  },
  "enrolled submissions": {
    title: "Enrolled Submissions",
    subtitle: "Track accepted requests and active participants",
    icon: <FileCheck2 size={22} />,
  },
  "create employee": {
    title: "Create Employee",
    subtitle: "Add a new operator or team member",
    icon: <UserPlus size={22} />,
  },
  employees: {
    title: "Employees",
    subtitle: "Manage team members and account access",
    icon: <Users size={22} />,
  },
  profile: {
    title: "Profile",
    subtitle: "View and manage your account details",
    icon: <User size={22} />,
  },
  "employee leaderboard": {
    title: "Employee Leaderboard",
    subtitle: "Compare activity and follow-up performance",
    icon: <Trophy size={22} />,
  },
};

const cleanMessage = (message = "") =>
  message.replace(/[|]/g, "").replace(/\s+/g, " ").trim();

const toTitleCase = (value) =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getHeaderMeta = (message) => {
  const cleaned = cleanMessage(message);
  const key = cleaned.toLowerCase();

  return (
    HEADER_META[key] || {
      title: toTitleCase(cleaned || "Admin"),
      subtitle: "Manage your workspace",
      icon: <ShieldCheck size={22} />,
    }
  );
};

const AdminHeader = ({ onToggleSidebar, message }) => {
  const { user } = useAuthStore();
  const meta = getHeaderMeta(message);
  const roleLabel = user?.role ? user.role.replace("_", " ") : "Admin";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open admin navigation"
          className="shrink-0 rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 sm:flex">
            {meta.icon}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Admin Panel
            </p>
            <h1 className="truncate text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
              {meta.title}
            </h1>
            <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">
              {meta.subtitle}
            </p>
          </div>
        </div>

        <div className="hidden shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-600 sm:block">
          {roleLabel}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
