import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Fingerprint,
  IdCard,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import InputField from "./Input";
import SuccessModal from "./SuccessModal";
import useEmployeeStore from "../store/useEmployeeStore";
import {
  employeeSchema,
  employeeUpdateSchema,
  mapZodIssuesToFieldErrors,
} from "../validator/employeeSchema";
import logoImage from "../assets/ManpathLogo.jpg";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const INITIAL_FORM_DATA = {
  first_name: "",
  middle_name: "",
  last_name: "",
  username: "",
  email: "",
  phone_number: "",
  blood_group: "",
  age: "",
  address: "",
  aadhar_number: "",
  password: "",
  role: "EMPLOYEE",
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );

const normalizeEmployee = (employee) => ({
  first_name: employee?.first_name ?? "",
  middle_name: employee?.middle_name ?? "",
  last_name: employee?.last_name ?? "",
  username: employee?.username ?? "",
  email: employee?.email ?? "",
  phone_number: employee?.phone_number ?? "",
  blood_group: employee?.blood_group ?? "",
  age: employee?.age ?? "",
  address: employee?.address ?? "",
  aadhar_number: employee?.aadhar_number ?? "",
  password: "",
  role: employee?.role ?? "EMPLOYEE",
});

const CreateEmployeeForm = ({ overlay = false, onClose = () => {}, id }) => {
  const isEditing = Boolean(id);
  const { createEmployee, updateEmployee, employees, loading } =
    useEmployeeStore();
  const [draft, setDraft] = useState({ sourceId: id ?? "new", values: {} });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee.id === id),
    [employees, id]
  );

  const sourceId = id ?? "new";
  const baseData = isEditing
    ? normalizeEmployee(selectedEmployee)
    : INITIAL_FORM_DATA;
  const formData = {
    ...baseData,
    ...(draft.sourceId === sourceId ? draft.values : {}),
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDraft((prev) => ({
      sourceId,
      values: {
        ...(prev.sourceId === sourceId ? prev.values : {}),
        [name]: value,
      },
    }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;

      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanedData = removeEmpty({
      ...formData,
      age: formData.age === "" ? undefined : Number(formData.age),
      password: formData.password || undefined,
    });

    const validatedData = isEditing
      ? employeeUpdateSchema.safeParse(cleanedData)
      : employeeSchema.safeParse(cleanedData);

    if (!validatedData.success) {
      setFieldErrors(mapZodIssuesToFieldErrors(validatedData.error));
      toast.error("Please fix the highlighted errors");
      return;
    }

    setFieldErrors({});

    const result = isEditing
      ? await updateEmployee(id, validatedData.data)
      : await createEmployee(validatedData.data);

    if (result?.success) {
      setSubmitted(true);
    } else {
      toast.error(result?.error || "Action failed");
    }
  };

  return (
    <div
      className={
        overlay
          ? "fixed inset-0 z-50 flex justify-center overflow-y-auto bg-slate-950/60 px-3 py-6 backdrop-blur-sm sm:px-6"
          : "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
      }
      onClick={overlay ? onClose : undefined}
    >
      <div
        className={`w-full ${overlay ? "max-w-5xl" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`grid ${
            overlay ? "" : "items-start gap-8 lg:grid-cols-[0.88fr_1.12fr]"
          }`}
        >
          {!overlay && <EmployeeSidePanel />}

          <div className="rounded-2xl bg-white text-slate-800 shadow-sm ring-1 ring-slate-200">
            <EmployeeInnerForm
              formData={formData}
              handleChange={handleChange}
              fieldErrors={fieldErrors}
              handleSubmit={handleSubmit}
              loading={loading}
              isEditing={isEditing}
              overlay={overlay}
              onClose={onClose}
            />
          </div>
        </div>

        <SuccessModal
          isOpen={submitted}
          title={isEditing ? "Employee Updated" : "Employee Created"}
          messageline1="Action completed successfully."
          buttonText="OK"
          onClose={() => {
            setSubmitted(false);
            if (overlay) onClose();
          }}
        />
      </div>
    </div>
  );
};

const EmployeeSidePanel = () => (
  <aside className="overflow-hidden rounded-2xl bg-white text-slate-800 shadow-sm ring-1 ring-slate-200">
    <div className="relative min-h-72 bg-linear-to-br from-slate-900 via-cyan-900 to-slate-800 p-6 text-white">
      <div className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 p-2 shadow-lg">
        <img src={logoImage} alt="Manpath logo" className="h-full w-full object-contain" />
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
          MANPATH ADMIN
        </p>
        <h1 className="max-w-sm text-3xl font-bold leading-tight md:text-4xl">
          Create a trusted team profile
        </h1>
      </div>
    </div>

    <div className="space-y-4 p-6">
      {[
        {
          icon: <ShieldCheck size={18} />,
          title: "Access control",
          text: "Employee details connect identity, contact, and role in one record.",
        },
        {
          icon: <BriefcaseBusiness size={18} />,
          title: "Operational clarity",
          text: "Clean staff data keeps follow-ups and admin workflows easier to manage.",
        },
        {
          icon: <BadgeCheck size={18} />,
          title: "Verified basics",
          text: "Phone, email, age, blood group, and Aadhar are checked before saving.",
        },
      ].map(({ icon, title, text }) => (
        <div key={title} className="flex gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
            {icon}
          </span>
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
          </div>
        </div>
      ))}
    </div>
  </aside>
);

const EmployeeInnerForm = ({
  formData,
  handleChange,
  fieldErrors,
  handleSubmit,
  loading,
  isEditing,
  overlay,
  onClose,
}) => {
  const controlClass =
    "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400";
  const selectClass = cx(
    "w-full rounded-lg border px-3 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400",
    controlClass
  );

  const renderError = (field) =>
    fieldErrors[field] ? (
      <p className="mt-1.5 text-xs font-medium text-red-500">
        {fieldErrors[field]}
      </p>
    ) : null;

  const fieldLabel = (label, required = false) => (
    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-7 p-5 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {isEditing ? "Employee update" : "New employee"}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {isEditing ? "Update employee profile" : "Create employee profile"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700">
            <UsersRound size={16} />
            {isEditing ? "Admin edit" : "Staff profile"}
          </span>
          {overlay && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close employee form"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <UserRound size={18} className="text-cyan-600" />
          <h3 className="text-base font-semibold">Personal details</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["first_name", "First name", true],
            ["middle_name", "Middle name", false],
            ["last_name", "Last name", true],
          ].map(([field, label, required]) => (
            <div key={field}>
              {fieldLabel(label, required)}
              <InputField
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={cx(
                  controlClass,
                  fieldErrors[field] && "border-red-400 focus:ring-red-300"
                )}
                aria-invalid={Boolean(fieldErrors[field])}
              />
              {renderError(field)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            {fieldLabel("Age", true)}
            <InputField
              type="number"
              name="age"
              min="18"
              max="60"
              value={formData.age}
              onChange={handleChange}
              className={cx(
                controlClass,
                fieldErrors.age && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.age)}
            />
            {renderError("age")}
          </div>
          <div>
            {fieldLabel("Blood group", true)}
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className={cx(
                selectClass,
                fieldErrors.blood_group && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.blood_group)}
            >
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map((bloodGroup) => (
                <option key={bloodGroup} value={bloodGroup}>
                  {bloodGroup}
                </option>
              ))}
            </select>
            {renderError("blood_group")}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <LockKeyhole size={18} className="text-cyan-600" />
          <h3 className="text-base font-semibold">Account access</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            {fieldLabel("Username", true)}
            <InputField
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={cx(
                controlClass,
                fieldErrors.username && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.username)}
            />
            {renderError("username")}
          </div>
          <div>
            {fieldLabel("Role")}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="SUPERADMIN">Super admin</option>
            </select>
          </div>
        </div>

        {!isEditing && (
          <div>
            {fieldLabel("Password", true)}
            <InputField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={cx(
                controlClass,
                fieldErrors.password && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.password)}
            />
            {renderError("password")}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-cyan-600" />
          <h3 className="text-base font-semibold">Contact details</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            {fieldLabel("Email", true)}
            <div className="relative">
              <Mail
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <InputField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={cx(
                  "pl-9",
                  controlClass,
                  fieldErrors.email && "border-red-400 focus:ring-red-300"
                )}
                aria-invalid={Boolean(fieldErrors.email)}
              />
            </div>
            {renderError("email")}
          </div>
          <div>
            {fieldLabel("Phone", true)}
            <InputField
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className={cx(
                controlClass,
                fieldErrors.phone_number && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.phone_number)}
            />
            {renderError("phone_number")}
          </div>
        </div>
        <div>
          {fieldLabel("Address", true)}
          <div className="relative">
            <MapPin
              size={17}
              className="pointer-events-none absolute left-3 top-3 text-slate-500"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={cx(
                "w-full resize-none rounded-lg border px-3 py-2.5 pl-9 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400",
                controlClass,
                fieldErrors.address && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.address)}
            />
          </div>
          {renderError("address")}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <IdCard size={18} className="text-cyan-600" />
          <h3 className="text-base font-semibold">Verification</h3>
        </div>
        <div>
          {fieldLabel("Aadhar number", true)}
          <div className="relative">
            <Fingerprint
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <InputField
              name="aadhar_number"
              value={formData.aadhar_number}
              onChange={handleChange}
              className={cx(
                "pl-9",
                controlClass,
                fieldErrors.aadhar_number && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.aadhar_number)}
            />
          </div>
          {renderError("aadhar_number")}
        </div>
      </section>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading
          ? "Please wait..."
          : isEditing
          ? "Update employee"
          : "Create employee"}
      </button>
    </form>
  );
};

export default CreateEmployeeForm;
