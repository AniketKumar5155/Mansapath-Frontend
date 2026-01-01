import { useEffect, useState } from "react";
import axiosAuthInstance from "../axiosInstance/axiosAuthInstance";

import AdminSidebar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";

import {
  Mail,
  ShieldCheck,
  Phone,
  Droplet,
  MapPin,
  Hash,
} from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axiosAuthInstance.get("/profile");
      setProfile(res.data.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col w-full min-w-0 max-h-screen">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          message="PROFILE"
        />

        <div className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
          {loading ? (
            <p className="text-gray-500 text-lg">Loading profile...</p>
          ) : !profile ? (
            <p className="text-red-500">Unable to load profile</p>
          ) : (
            <ProfileCard profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ profile }) => {
  const fullName = `${profile.first_name} ${profile.middle_name || ""} ${profile.last_name}`;

  return (
    <div className="relative bg-white shadow-xl rounded-2xl max-w-lg w-full p-8">

      <button
        className="absolute top-4 right-4 px-4 py-1.5 text-sm font-medium 
                   bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        onClick={() => alert("Edit profile coming soon")}
      >
        Edit
      </button>

      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-semibold">
          {profile.first_name?.[0]}
        </div>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {fullName}
        </h2>

        <p className="text-sm text-gray-500">@{profile.username}</p>

        <span className="mt-3 px-4 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
          {profile.role}
        </span>
      </div>

      <div className="mt-10 space-y-3">
        <ProfileItem icon={<Mail size={18} />} label="Email" value={profile.email} />
        <ProfileItem icon={<Phone size={18} />} label="Phone" value={profile.phone_number} />
        <ProfileItem icon={<Hash size={18} />} label="Age" value={profile.age} />
        <ProfileItem icon={<Droplet size={18} />} label="Blood Group" value={profile.blood_group} />
        <ProfileItem icon={<MapPin size={18} />} label="Address" value={profile.address} />
        <ProfileItem
          icon={<ShieldCheck size={18} />}
          label="Role"
          value={`${profile.role} access`}
        />
      </div>
    </div>
  );
};


const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="text-indigo-600 mt-1">{icon}</div>
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium wrap-break-word">
        {value}
      </span>
    </div>
  </div>
);

export default ProfilePage;
