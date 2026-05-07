import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Home,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import logo from "../assets/helloUpdated.png";

const OperatorLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const loggedUser = await login(formData);

      if (loggedUser) {
        toast.success("Login successful");

        if (loggedUser.role === "SUPERADMIN") {
          navigate("/superadmin/dashboard");
        } else {
          navigate("/admin/submissions");
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      if (!error?.response) {
        toast.error("Something went wrong. Please check your internet or try again later.");
      } else {
        toast.error(
          error.response?.data?.message || "Login failed due to server error"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-5 text-slate-900 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
        >
          <Home size={16} />
          Home
        </button>
      </div>

      <main className="mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-6xl items-center gap-8 py-8 lg:grid-cols-[1fr_0.92fr]">
        <section className="hidden text-white lg:block">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <img
                src={logo}
                alt="Manaspath Logo"
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-blue-100">Manaspath</p>
                <p className="text-xs text-slate-300">Admin workspace</p>
              </div>
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight">
              Secure access for the care operations team.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Review submissions, manage follow-ups, and keep user requests
              organized from a focused operator dashboard.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "Role-based dashboard routing",
                "Protected admin and employee areas",
                "Quick access to submissions and profiles",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <ShieldCheck size={18} className="text-blue-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-white/15 bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="mb-7 text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 p-1 transition hover:bg-blue-100"
                aria-label="Go to Manaspath home"
              >
                <img
                  src={logo}
                  alt="Manaspath Logo"
                  className="h-full w-full rounded-xl object-cover"
                />
              </button>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
                Operator Login
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in with your assigned credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Field
                icon={<Mail size={18} />}
                label="Email"
                error={fieldErrors.email}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="operator@manaspath.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={fieldClass(fieldErrors.email)}
                />
              </Field>

              <Field
                icon={<LockKeyhole size={18} />}
                label="Password"
                error={fieldErrors.password}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className={fieldClass(fieldErrors.password, "pr-11")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </Field>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

const fieldClass = (error, extra = "") =>
  `w-full rounded-xl border bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
  } ${extra}`;

const Field = ({ icon, label, error, children }) => (
  <div>
    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
      {label}
    </label>
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
      {children}
    </div>
    {error && <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
  </div>
);

export default OperatorLogin;
