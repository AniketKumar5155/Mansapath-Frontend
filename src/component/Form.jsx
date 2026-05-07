import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import InputField from "./Input";
import SuccessModal from "./SuccessModal";
import useFormStore from "../store/formStore";
import {
  formSubmissionSchema,
  formUpdateSchema,
} from "../validator/formSchema";
import homepageImage from "../assets/Homepage_Image.jpeg";

function mapZodIssuesToFieldErrors(zodError) {
  const fieldErrors = {};

  if (zodError && Array.isArray(zodError.issues)) {
    zodError.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });
  }

  return fieldErrors;
}

const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0)
    )
  );

const cx = (...classes) => classes.filter(Boolean).join(" ");

const ISSUE_CATEGORIES = {
  Addictions: [
    { id: 1, name: "Alcohol Addiction" },
    { id: 2, name: "Drug Addiction" },
    { id: 3, name: "Cigarette Addiction" },
    { id: 4, name: "Gambling Addiction" },
    { id: 5, name: "Mobile Addiction" },
  ],
  "Mental Health & Emotional Well-being": [
    { id: 6, name: "Anxiety" },
    { id: 7, name: "Depression" },
    { id: 8, name: "Stress" },
    { id: 9, name: "Angriness" },
    { id: 10, name: "Overwhelmed" },
    { id: 11, name: "Mental Block" },
  ],
  "Sleep-Related Issues": [
    { id: 12, name: "Sleeping Issues" },
    { id: 13, name: "Insomnia" },
    { id: 14, name: "Restless Nights" },
    { id: 15, name: "Tossing & Turning" },
    { id: 16, name: "Vivid Dreams" },
    { id: 17, name: "Fatigue" },
  ],
  "Academic & Professional Challenges": [
    { id: 18, name: "Study Burnout" },
    { id: 19, name: "Exhaustion" },
    { id: 20, name: "Lack of Focus" },
    { id: 21, name: "Deadlines" },
    { id: 22, name: "Exams" },
  ],
  "Behavioral & Physical Development": [
    { id: 23, name: "Child / Adolescent Improving Behaviour" },
    { id: 24, name: "Personality Development" },
    { id: 25, name: "Obesity" },
    { id: 26, name: "Relationship Problems" },
  ],
};

const STATUS_LABELS = {
  ENROLLED: "Enrolled",
  PENDING: "Pending",
  REJECTED: "Rejected",
};

const CATEGORY_LABELS = {
  CHAITANYA: "Chaitanya",
  "BRAIN GYM": "Brain Gym",
  BODH: "Bodh",
};

const INITIAL_FORM_DATA = {
  first_name: "",
  middle_name: "",
  last_name: "",
  gender: "",
  age: "",
  status: "",
  category: "",
  email: "",
  phone_number: "",
  address: "",
  issues: [],
  problem_description: "",
};

const Form = ({ overlay = false, onClose = () => {}, id, dark = false }) => {
  const isDark = overlay ? false : dark;
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { loading, submitForm, updateSubmission, submissions } = useFormStore();

  useEffect(() => {
    setIsEditing(Boolean(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const existing = submissions.find((submission) => submission.id === id);
    if (!existing) return;

    setFormData({
      first_name: existing.first_name ?? "",
      middle_name: existing.middle_name ?? "",
      last_name: existing.last_name ?? "",
      gender: existing.gender ?? "",
      age: existing.age ?? "",
      status: existing.status ?? "",
      category: existing.category ?? "",
      email: existing.email ?? "",
      phone_number: existing.phone_number ?? "",
      address: existing.address ?? "",
      problem_description: existing.problem_description ?? "",
      issues: (existing.Issues || existing.issues || []).map((issue) =>
        Number(issue.id ?? issue)
      ),
    });
  }, [id, submissions]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
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
      email: formData.email || undefined,
      middle_name: formData.middle_name || undefined,
      problem_description: formData.problem_description || undefined,
      status: formData.status || undefined,
      category: formData.category || undefined,
    });

    const parsed = isEditing
      ? formUpdateSchema.safeParse(cleanedData)
      : formSubmissionSchema.safeParse(cleanedData);

    if (!parsed.success) {
      setFieldErrors(mapZodIssuesToFieldErrors(parsed.error));
      toast.error("Please fix the highlighted errors");
      return;
    }

    const res = isEditing
      ? await updateSubmission(id, cleanedData)
      : await submitForm(cleanedData);

    if (res?.success) {
      setSubmitted(true);
    } else {
      toast.error(res?.message || res?.error || "Action failed");
    }
  };

  return (
    <div
      className={
        overlay
          ? "fixed inset-0 z-50 flex justify-center overflow-y-auto bg-slate-950/60 px-3 py-6 backdrop-blur-sm sm:px-6"
          : isDark
          ? "min-h-screen w-full bg-gray-900 text-gray-200"
          : "min-h-screen w-full bg-linear-to-br from-sky-50 via-white to-cyan-50 text-gray-800"
      }
      onClick={overlay ? onClose : undefined}
    >
      <div
        className={`w-full ${
          overlay
            ? "max-w-5xl"
            : "mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`grid ${
            overlay ? "" : "items-start gap-8 lg:grid-cols-[0.88fr_1.12fr]"
          }`}
        >
          {!overlay && <FormSidePanel isDark={isDark} />}

          <div
            className={`rounded-2xl shadow-sm ring-1 ${
              overlay
                ? "bg-white text-slate-800 ring-slate-200"
                : isDark
                ? "bg-gray-800 text-gray-200 ring-white/10"
                : "bg-white text-gray-800 ring-slate-200"
            }`}
          >
            <InnerForm
              formData={formData}
              handleChange={handleChange}
              fieldErrors={fieldErrors}
              handleSubmit={handleSubmit}
              loading={loading}
              isEditing={isEditing}
              dark={isDark}
              overlay={overlay}
              onClose={onClose}
            />
          </div>
        </div>

        <SuccessModal
          isOpen={submitted}
          title={isEditing ? "Form Updated" : "Form Submitted"}
          messageline1="Your request has been processed."
          messageline2="Thank you."
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

const FormSidePanel = ({ isDark }) => (
  <aside
    className={`overflow-hidden rounded-2xl shadow-sm ring-1 ${
      isDark ? "bg-gray-800 text-gray-200 ring-white/10" : "bg-white text-gray-800 ring-slate-200"
    }`}
  >
    <div className="relative aspect-[4/3] min-h-72">
      <img
        src={homepageImage}
        alt="Mental health consultation"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
          MANASPATH
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          Book a confidential session
        </h1>
      </div>
    </div>

    <div className="space-y-4 p-6">
      {[
        {
          icon: <ShieldCheck size={18} />,
          title: "Private by design",
          text: "Your details are used only to understand and process the request.",
        },
        {
          icon: <HeartPulse size={18} />,
          title: "Context first",
          text: "Share the concerns that matter most so the team can prepare well.",
        },
        {
          icon: <CheckCircle2 size={18} />,
          title: "Simple follow-up",
          text: "A valid WhatsApp number helps the team reach you quickly.",
        },
      ].map(({ icon, title, text }) => (
        <div key={title} className="flex gap-3">
          <span
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              isDark ? "bg-cyan-400/10 text-cyan-300" : "bg-cyan-50 text-cyan-700"
            }`}
          >
            {icon}
          </span>
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p
              className={`mt-1 text-sm leading-6 ${
                isDark ? "text-gray-400" : "text-slate-500"
              }`}
            >
              {text}
            </p>
          </div>
        </div>
      ))}
    </div>
  </aside>
);

const InnerForm = ({
  formData,
  handleChange,
  fieldErrors,
  handleSubmit,
  loading,
  isEditing,
  dark,
  overlay,
  onClose,
}) => {
  const textMuted = dark ? "text-gray-400" : "text-slate-500";
  const labelClass = dark ? "text-gray-200" : "text-slate-700";
  const controlClass = dark
    ? "border-white/10 bg-slate-900/70 text-gray-100 placeholder:text-gray-500"
    : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400";
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
    <label className={`mb-1.5 block text-sm font-semibold ${labelClass}`}>
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-7 p-5 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={`text-sm font-semibold ${textMuted}`}>
            {isEditing ? "Submission update" : "New submission"}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-inherit">
            {isEditing ? "Update request details" : "Create a session request"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cx(
              "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold",
              dark ? "bg-cyan-400/10 text-cyan-200" : "bg-cyan-50 text-cyan-700"
            )}
          >
            <ClipboardList size={16} />
            {isEditing ? "Admin edit" : "Confidential"}
          </span>
          {overlay && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close submission form"
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
            {fieldLabel("Gender", true)}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={cx(
                selectClass,
                fieldErrors.gender && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.gender)}
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="RATHER NOT SAY">Rather not say</option>
            </select>
            {renderError("gender")}
          </div>
          <div>
            {fieldLabel("Age", true)}
            <InputField
              type="number"
              name="age"
              min="1"
              max="120"
              value={formData.age}
              onChange={(event) =>
                handleChange({
                  target: {
                    name: "age",
                    value:
                      event.target.value === "" ? "" : Number(event.target.value),
                  },
                })
              }
              className={cx(
                controlClass,
                fieldErrors.age && "border-red-400 focus:ring-red-300"
              )}
              aria-invalid={Boolean(fieldErrors.age)}
            />
            {renderError("age")}
          </div>
        </div>
      </section>

      {isEditing && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-cyan-600" />
            <h3 className="text-base font-semibold">Admin classification</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              {fieldLabel("Status")}
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select status</option>
                <option value="ENROLLED">{STATUS_LABELS.ENROLLED}</option>
                <option value="PENDING">{STATUS_LABELS.PENDING}</option>
                <option value="REJECTED">{STATUS_LABELS.REJECTED}</option>
              </select>
            </div>
            <div>
              {fieldLabel("Category")}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select category</option>
                <option value="CHAITANYA">{CATEGORY_LABELS.CHAITANYA}</option>
                <option value="BRAIN GYM">{CATEGORY_LABELS["BRAIN GYM"]}</option>
                <option value="BODH">{CATEGORY_LABELS.BODH}</option>
              </select>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-cyan-600" />
          <h3 className="text-base font-semibold">Contact details</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            {fieldLabel("Email")}
            <div className="relative">
              <Mail
                size={17}
                className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`}
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
            {fieldLabel("WhatsApp number", true)}
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
              className={`pointer-events-none absolute left-3 top-3 ${textMuted}`}
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
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HeartPulse size={18} className="text-cyan-600" />
            <h3 className="text-base font-semibold">Concerns</h3>
          </div>
          <span className={`text-sm ${textMuted}`}>
            {formData.issues.length} selected
          </span>
        </div>
        <div className="space-y-4">
          {Object.entries(ISSUE_CATEGORIES).map(([category, issues]) => (
            <div
              key={category}
              className={cx(
                "rounded-xl border p-4",
                dark
                  ? "border-white/10 bg-slate-900/40"
                  : "border-slate-200 bg-slate-50/70"
              )}
            >
              <h4 className="text-sm font-semibold">{category}</h4>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {issues.map((issue) => {
                  const checked = formData.issues.includes(issue.id);

                  return (
                    <label
                      key={issue.id}
                      className={cx(
                        "flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                        checked
                          ? "border-cyan-300 bg-cyan-50 text-cyan-800"
                          : dark
                          ? "border-white/10 bg-slate-900/60 text-gray-300 hover:border-cyan-400/50"
                          : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300"
                      )}
                    >
                      <input
                        type="checkbox"
                        value={issue.id}
                        checked={checked}
                        onChange={(event) => {
                          const issueId = Number(event.target.value);
                          const updated = event.target.checked
                            ? [...formData.issues, issueId]
                            : formData.issues.filter((item) => item !== issueId);
                          handleChange({
                            target: { name: "issues", value: updated },
                          });
                        }}
                        className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
                      />
                      <span>{issue.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {renderError("issues")}
      </section>

      <section>
        {fieldLabel("Problem description")}
        <textarea
          name="problem_description"
          value={formData.problem_description}
          onChange={handleChange}
          rows={5}
          placeholder="Share any details that would help the team understand the situation."
          className={cx(
            "w-full resize-none rounded-lg border px-3 py-2.5 text-sm leading-6 transition focus:outline-none focus:ring-2 focus:ring-blue-400",
            controlClass,
            fieldErrors.problem_description && "border-red-400 focus:ring-red-300"
          )}
          aria-invalid={Boolean(fieldErrors.problem_description)}
        />
        {renderError("problem_description")}
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
          ? "Update submission"
          : "Submit request"}
      </button>
    </form>
  );
};

export default Form;
