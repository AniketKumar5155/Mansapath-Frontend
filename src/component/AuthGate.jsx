import { Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const AuthGate = ({ children }) => {
  const { accessToken, user } = useAuthStore();

  if (accessToken && !user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <h1 className="text-5xl font-extrabold text-blue-600 tracking-wide">
          Manaspath
        </h1>
        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return <Outlet/>;
};

export default AuthGate;
