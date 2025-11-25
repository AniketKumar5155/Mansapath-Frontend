import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

export default function AdminRoute({ children }) {
  const { user, loading, accessToken, getProfile, logout } = useAuthStore();

  useEffect(() => {
    if (accessToken && !user) {
      getProfile()
    }
  }, [accessToken, user]);

  if (loading || (accessToken && !user)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-sm">
          Fetching profile...
        </p>
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/operator-login" replace />;
  }

  if (user?.role !== "SUPERADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
