import { useEffect, useState } from "react";
import InputField from "./Input";
import toast from "react-hot-toast";
import useFormStore from "../store/formStore";
import SuccessModal from "./SuccessModal";
import { X } from "lucide-react";
import {
  formSubmissionSchema,
  formUpdateSchema,
} from "../validator/formSchema";

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
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );



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

const Form = ({
  overlay = false,
  onClose = () => {},
  id,
  dark = false,
}) => {
  const isDark = overlay ? false : dark;

  const [formData, setFormData] = useState({
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
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { loading, submitForm, updateSubmission, submissions } = useFormStore();

  useEffect(() => {
    setIsEditing(!!id);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const existing = submissions.find((s) => s.id === id);
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
      issues: (existing.Issues || []).map((issue) => issue.id),
    });
  }, [id, submissions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (res?.success) setSubmitted(true);
    else toast.error(res?.message || "Action failed");
  };

  return (
    <div
      className={
        overlay
          ? "fixed inset-0 z-50 bg-black/50 flex justify-center overflow-y-auto"
          : isDark
          ? "min-h-screen w-full bg-gray-900 text-gray-200"
          : "min-h-screen w-full bg-linear-to-br from-blue-50 via-white to-blue-100 text-gray-800"
      }
      onClick={overlay ? onClose : undefined}
    >
      <div
        className={`w-full ${
          overlay
            ? "max-w-5xl mx-auto px-6 pt-16 pb-10"
            : "max-w-6xl mx-auto px-4 md:px-8 py-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {overlay && (
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-full p-2 shadow"
          >
            <X size={22} />
          </button>
        )}

        <div className={`grid ${overlay ? "" : "md:grid-cols-2"} gap-10`}>
          {!overlay && (
            <div
              className={`rounded-xl shadow-sm p-8 flex flex-col justify-center space-y-6 ${
                isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
              }`}
            >
              <h1 className="text-4xl font-bold text-blue-500 tracking-wide">
                MANASPATH
              </h1>
              <p className="text-lg text-gray-400">
                Begin your journey towards better mental health.
              </p>
              <img
                src="src/assets/Homepage_Image.jpeg"
                alt="Mental health"
                className="w-full rounded-xl"
              />
              <p className="text-sm text-gray-500">
                All information remains confidential.
              </p>
            </div>
          )}

          <div
            className={`rounded-xl shadow-sm p-8 ${
              isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
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
            overlay && onClose();
          }}
        />
      </div>
    </div>
  );
};

const InnerForm = ({
  formData,
  handleChange,
  fieldErrors,
  handleSubmit,
  loading,
  isEditing,
  dark,
}) => (
  <form onSubmit={handleSubmit} className="space-y-5">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {["first_name", "middle_name", "last_name"].map((field) => (
      <div key={field}>
        <label className="block mb-1 text-sm font-semibold text-gray-700 capitalize">
          {field.replace("_", " ")} {field !== "middle_name" && "*"}
        </label>
        <InputField
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className="w-full"
        />
        {fieldErrors[field] && (
          <p className="text-red-500 text-xs mt-1">
            {fieldErrors[field]}
          </p>
        )}
      </div>
    ))}
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block mb-1 text-sm font-semibold text-gray-700">
        Gender*
      </label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
        <option value="RATHER NOT SAY">Rather not say</option>
      </select>
      {fieldErrors.gender && (
        <p className="text-red-500 text-xs mt-1">
          {fieldErrors.gender}
        </p>
      )}
    </div>
    <div>
      <label className="block mb-1 text-sm font-semibold text-gray-700">
        Age*
      </label>
      <InputField
        type="number"
        name="age"
        value={formData.age}
        onChange={(e) =>
          handleChange({
            target: {
              name: "age",
              value:
                e.target.value === "" ? "" : Number(e.target.value),
            },
          })
        }
      />
      {fieldErrors.age && (
        <p className="text-red-500 text-xs mt-1">
          Enter a valid age
        </p>
      )}
    </div>
  </div>
  {isEditing && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select status</option>
          <option value="ENROLLED">{STATUS_LABELS.ENROLLED}</option>
          <option value="PENDING">{STATUS_LABELS.PENDING}</option>
          <option value="REJECTED">{STATUS_LABELS.REJECTED}</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="CHAITANYA">{CATEGORY_LABELS.CHAITANYA}</option>
          <option value="BRAIN GYM">{CATEGORY_LABELS["BRAIN GYM"]}</option>
          <option value="BODH">{CATEGORY_LABELS.BODH}</option>
        </select>
      </div>
    </div>
  )}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block mb-1 text-sm font-semibold text-gray-700">
        Email
      </label>
      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
    <div>
      <label className="block mb-1 text-sm font-semibold text-gray-700">
        Phone number* (Whatsapp)
      </label>
      <InputField
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
      />
      {fieldErrors.phone_number && (
        <p className="text-red-500 text-xs mt-1">
          {fieldErrors.phone_number}
        </p>
      )}
    </div>
  </div>
  <div>
    <label className="block mb-1 text-sm font-semibold text-gray-700">
      Address*
    </label>
    <InputField
      name="address"
      value={formData.address}
      onChange={handleChange}
    />
    {fieldErrors.address && (
      <p className="text-red-500 text-xs mt-1">
        {fieldErrors.address}
      </p>
    )}
  </div>
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">
      Issues (optional)
    </label>
    {Object.entries(ISSUE_CATEGORIES).map(([category, issues]) => (
      <div key={category} className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-500 text-xl">•</span>
          <span className="font-semibold text-gray-800">
            {category}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {issues.map((issue) => (
            <label
              key={issue.id}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              <input
                type="checkbox"
                value={issue.id}
                checked={formData.issues.includes(issue.id)}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  const updated = e.target.checked
                    ? [...formData.issues, id]
                    : formData.issues.filter((i) => i !== id);
                  handleChange({
                    target: { name: "issues", value: updated },
                  });
                }}
                className="accent-blue-500"
              />
              {issue.name}
            </label>
          ))}
        </div>
      </div>
    ))}
    {fieldErrors.issues && (
      <p className="text-red-500 text-xs mt-1">{fieldErrors.issues}</p>
    )}
  </div>
  <div>
    <label className="block mb-1 text-sm font-semibold text-gray-700">
      Problem description
    </label>
    <textarea
      name="problem_description"
      value={formData.problem_description}
      onChange={handleChange}
      className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 resize-non h-24"
    />
  </div>
  <button
    type="submit"
    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition text-white font-semibold"
  >
    {loading ? "Submitting..." : isEditing ? "Update" : "Submit"}
  </button>
</form>
);

export default Form;
