import { useEffect, useState } from "react";
import InputField from "./Input";
import { toast } from "react-toastify";
import useFormStore from "../store/formStore";
import SuccessModal from "./SuccessModal";
import {
  formSubmissionSchema,
  formUpdateSchema
} from "../validator/formSchema";

const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v !== undefined && v !== null
    )
  );


const Form = ({ overlay = false, onClose = () => {}, id }) => {
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
    problem_description: "",
  });

  const [fielderrors, setFieldErrors] = useState({});
  const { loading, submitForm, updateSubmission, submissions } = useFormStore();
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(!!id);
  }, [id]);

  useEffect(() => {
    if (id) {
      const existing = submissions.find((s) => s.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, submissions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = removeEmpty({
  ...formData,
  age: formData.age === "" ? undefined : Number(formData.age),
  category: formData.category === "" ? undefined : formData.category,
  status: formData.status === "" ? undefined : formData.status,
  email: formData.email === "" ? undefined : formData.email,
  middle_name: formData.middle_name === "" ? undefined : formData.middle_name,
  problem_description:
    formData.problem_description === "" ? undefined : formData.problem_description,
});

    const validatedData = isEditing
      ? formUpdateSchema.safeParse(cleanedData)
      : formSubmissionSchema.safeParse(cleanedData);

    if (!validatedData.success) {
      const errorsMap = {};

      validatedData.error.issues.forEach((issue) => {
        const field = issue.path?.[0] || "form";
        errorsMap[field] = issue.message;
      });

      setFieldErrors(errorsMap);
      console.log("Validation errors:", errorsMap);
      toast.error("Please fix the errors");
      return;
    }

    setFieldErrors({});

    try {
      const submit = isEditing
        ? await updateSubmission(id, cleanedData)
        : await submitForm(cleanedData);

      if (submit.success) {
        setSubmitted(true);
      } else {
        toast.error(submit?.error || submit.message || "Action failed");
      }
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <>
      {overlay && (
        <div className="fixed inset-0 bg-black/40 overflow-y-auto z-50 p-6">
          <div className="min-h-screen flex justify-center items-start">

            <div className="relative bg-white rounded-2xl w-full max-w-5xl shadow-2xl my-10">

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-2xl font-semibold hover:text-red-500 z-10"
              >
                ×
              </button>

              <div className="grid md:grid-cols-2">
                <div className="hidden md:flex flex-col justify-center p-10 bg-amber-50">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Begin Your Healing Journey
                  </h2>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Mental health is just as important as physical health.
                  </p>

                  <div className="w-full h-64 bg-white border-2 border-dashed border-gray-300
                   rounded-2xl flex items-center justify-center text-gray-400 overflow-hidden">
                    Add Poster / Illustration Here
                  </div>
                </div>

                <div className="p-8">
                  <InnerForm
                    formData={formData}
                    handleChange={handleChange}
                    fielderrors={fielderrors}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            </div>

            <SuccessModal
              isOpen={submitted}
              title={isEditing ? "Form Updated" : "Form Submitted"}
              messageline1="Your request has been processed."
              messageline2="Thank you."
              buttonText="OK"
              onClose={() => setSubmitted(false)}
            />
          </div>
        </div>
      )}

      {!overlay && (
        <div className="min-h-screen w-full bg-linear-to-br from-blue-50 via-white to-blue-100 
        flex items-center justify-center px-4 py-16">

          <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">

            <div className="hidden md:flex flex-col justify-between p-12 bg-blue-500/10">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-5">
                  Mental Health Support Form
                </h1>
                <p className="text-gray-700 leading-relaxed mb-8">
                  You are not alone. This confidential form allows us to understand
                  your concerns and help you find the support you deserve.
                </p>
              </div>

              <div className="w-full h-80 bg-white border-2 border-dashed border-gray-300 
              rounded-2xl flex items-center justify-center text-gray-400 overflow-hidden">
                <img
                  src="src/assets/confi.jpg"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="text-sm text-gray-500 mt-6">
                All information remains confidential and secured.
              </p>
            </div>

            <div className="p-8 md:p-12">
              <InnerForm
                formData={formData}
                handleChange={handleChange}
                fielderrors={fielderrors}
                handleSubmit={handleSubmit}
                loading={loading}
                isEditing={isEditing}
              />

              <SuccessModal
                isOpen={submitted}
                title={isEditing ? "Form Updated" : "Form Submitted"}
                messageline1="Your form has been submitted."
                messageline2="We will contact you during working hours."
                buttonText="OK"
                onClose={() => setSubmitted(false)}
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
};

const InnerForm = ({
  formData,
  handleChange,
  fielderrors,
  handleSubmit,
  loading,
  isEditing,
}) => (
  <form onSubmit={handleSubmit}>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="block mb-1 font-medium">First name*</label>
        <InputField
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {fielderrors.first_name && (
          <p className="text-red-500 text-sm mt-1">{fielderrors.first_name}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Middle name</label>
        <InputField
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Last name*</label>
        <InputField
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {fielderrors.last_name && (
          <p className="text-red-500 text-sm mt-1">{fielderrors.last_name}</p>
        )}
      </div>
    </div>

    <label className="block mb-1 mt-6 font-medium">Gender*</label>
    <select
      name="gender"
      className="px-3 py-2 border rounded-md w-full"
      value={formData.gender}
      onChange={handleChange}
    >
      <option value="">Select gender</option>
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
      <option value="OTHER">Other</option>
      <option value="RATHER NOT SAY">Rather not say</option>
    </select>

    <label className="block mb-1 mt-6 font-medium">Age*</label>
    <InputField
      name="age"
      type="number"
      value={formData.age}
      onChange={(e) =>
        handleChange({
          target: {
            name: "age",
            value: e.target.value === "" ? "" : Number(e.target.value),
          },
        })
      }
    />

    {isEditing && (
      <>
        <label className="block mb-1 mt-6 font-medium">Status</label>
        <select
          name="status"
          className="px-3 py-2 border rounded-md w-full"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          <option value="OPEN">Accepted</option>
          <option value="PENDING">Pending</option>
          <option value="CLOSED">Rejected</option>
        </select>

        <label className="block mb-1 mt-6 font-medium">Category</label>
        <select
          name="category"
          className="px-3 py-2 border rounded-md w-full"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="MENTAL FITNESS">Mental Fitness</option>
          <option value="MENTAL THERAPY">Mental Therapy</option>
          <option value="CHAITAINYA">CHAITAINYA</option>
        </select>
      </>
    )}

    <label className="block mb-1 mt-6 font-medium">Email</label>
    <InputField
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />

    <label className="block mb-1 mt-6 font-medium">Phone number* (Whatsapp)</label>
    <InputField
      name="phone_number"
      value={formData.phone_number}
      onChange={handleChange}
    />

    <label className="block mb-1 mt-6 font-medium">Address*</label>
    <InputField
      name="address"
      value={formData.address}
      onChange={handleChange}
    />

    <label className="block mb-1 mt-6 font-medium">Problem description</label>
    <textarea
      name="problem_description"
      className="px-3 py-2 border rounded-md w-full"
      value={formData.problem_description}
      onChange={handleChange}
    />

    <button
      type="submit"
      className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-3
      rounded-xl font-semibold tracking-wide transition"
    >
      {loading ? "Submitting..." : isEditing ? "Update" : "Submit"}
    </button>

  </form>
);

export default Form;
