import { useState } from "react";
import AdminSidebar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import AdminDashboardInfoSection from "../component/AdminDashboardInfoSection";

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-100">
            <AdminSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="flex flex-col w-full min-w-0 max-h-screen">

                <AdminHeader
                    onToggleSidebar={() => setSidebarOpen(true)}
                    message="Manaspath Admin"
                />

                <div className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
                    <AdminDashboardInfoSection />
                </div>
            </main>

        </div>
    );
};

export default AdminDashboard;
