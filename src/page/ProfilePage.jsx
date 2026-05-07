import { useEffect, useState } from "react";
import {
  Droplet,
  Hash,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import axiosAuthInstance from "../axiosInstance/axiosAuthInstance";
import AdminHeader from "../component/AdminHeader";
import AdminSidebar from "../component/AdminSidebar";
import buildFullName from "../utils/buildFullName";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axiosAuthInstance.get("/profile");
      setProfile(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col max-h-screen overflow-x-hidden">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="Profile"
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4">
          {loading ? (
            <StateCard message="Loading profile..." />
          ) : error ? (
            <StateCard tone="red" message={error} />
          ) : !profile ? (
            <StateCard tone="red" message="Unable to load profile" />
          ) : (
            <ProfileContent profile={profile} onRefresh={fetchProfile} />
          )}
        </main>
      </div>
    </div>
  );
};

const ProfileContent = ({ profile, onRefresh }) => {
  const fullName =
    buildFullName(
      profile.first_name,
      profile.middle_name,
      profile.last_name
    ) || "Unnamed";

  const initials = [profile.first_name?.[0], profile.last_name?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 xl:grid-cols-[360px_1fr]">
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="p-5">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white ring-8 ring-blue-50">
              {initials || <UserRound size={34} />}
            </div>

            <h2 className="mt-5 max-w-full truncate text-2xl font-bold text-slate-950">
              {fullName}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              @{profile.username}
            </p>

            <span className="mt-4 rounded-full bg-emerald-50 px-4 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
              {profile.role}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <MiniStat label="Age" value={profile.age || "-"} />
            <MiniStat label="Blood" value={profile.blood_group || "-"} />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Refresh Profile
          </button>
        </div>
      </section>

      <section className="min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <ShieldCheck size={21} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Account Details
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                Contact and access information
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-5 md:grid-cols-2">
          <ProfileItem icon={<Mail size={18} />} label="Email" value={profile.email} />
          <ProfileItem icon={<Phone size={18} />} label="Phone" value={profile.phone_number} />
          <ProfileItem icon={<Hash size={18} />} label="Age" value={profile.age} />
          <ProfileItem icon={<Droplet size={18} />} label="Blood Group" value={profile.blood_group} />
          <ProfileItem
            icon={<ShieldCheck size={18} />}
            label="Role"
            value={`${profile.role} access`}
          />
          <ProfileItem
            icon={<UserRound size={18} />}
            label="Username"
            value={profile.username}
          />
          <div className="md:col-span-2">
            <ProfileItem
              icon={<MapPin size={18} />}
              label="Address"
              value={profile.address}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const MiniStat = ({ label, value }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
    <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
    <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
  </div>
);

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex min-w-0 gap-3 rounded-lg border border-slate-200 bg-white p-4">
    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value || "-"}
      </p>
    </div>
  </div>
);

const StateCard = ({ message, tone = "slate" }) => {
  const color =
    tone === "red"
      ? "border-red-100 bg-red-50 text-red-700"
      : "border-slate-200 bg-white text-slate-500";

  return (
    <div className={`mx-auto max-w-lg rounded-lg border p-6 text-center text-sm font-semibold shadow-sm ${color}`}>
      {message}
    </div>
  );
};

export default ProfilePage;
