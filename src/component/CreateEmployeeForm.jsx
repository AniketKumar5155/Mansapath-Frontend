import { useEffect, useState } from "react";
import InputField from "./Input";
import { toast } from "react-toastify";
import useEmployeeStore from "../store/useEmployeeStore";
import SuccessModal from "./SuccessModal";
import { employeeSchema } from "../validator/employeeSchema";

const CreateEmployeeForm = ({ overlay = false, onClose = () => {}, id }) => {
  const { createEmployee, updateEmployee, employees, loading } =
    useEmployeeStore();

  const [formData, setFormData] = useState({
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
  });

  const [fielderrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(!!id);
  }, [id]);

  useEffect(() => {
    if (id && employees.length) {
      const employee = employees.find((e) => e.id === id);
      if (employee) {
        setFormData({ ...employee, password: "" });
      }
    }
  }, [id, employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      age: formData.age === "" ? undefined : Number(formData.age),
      password: formData.password || undefined,
    };

    const validatedData = employeeSchema.safeParse(cleanedData);

    if (!validatedData.success) {
      const errorsMap = {};
      validatedData.error.issues.forEach((issue) => {
        const fieldName = issue.path?.[0];
        errorsMap[fieldName] = issue.message;
      });
      setFieldErrors(errorsMap);
      return;
    }

    setFieldErrors({});

    try {
      const submit = isEditing
        ? await updateEmployee(id, validatedData.data)
        : await createEmployee(validatedData.data);

      if (submit.success) {
        setSubmitted(true);
      } else {
        toast.error(submit?.error || "Action failed");
      }
    } catch {
      toast.error("Unexpected error occurred");
    }
  };

  const FormContent = (
    <div className={`${overlay ? "" : "max-w-6xl mx-auto p-8 bg-white rounded-xl shadow"}`}>
      {!overlay && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {isEditing ? "Update Employee" : "Create Employee"}
          </h1>
          <p className="text-gray-500 mt-1">
            Fill all the required information carefully.
          </p>
        </div>
      )}

      <EmployeeInnerForm
        formData={formData}
        handleChange={handleChange}
        fielderrors={fielderrors}
        handleSubmit={handleSubmit}
        loading={loading}
        isEditing={isEditing}
      />

      <SuccessModal
        isOpen={submitted}
        title={isEditing ? "Employee Updated" : "Employee Created"}
        messageline1="Action completed successfully"
        buttonText="OK"
        onClose={() => {
          setSubmitted(false);
          onClose();
        }}
      />
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 p-6 overflow-y-auto">
        <div className="min-h-screen flex justify-center items-start">
          <div className="relative bg-white rounded-2xl w-full max-w-5xl shadow-2xl my-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-3xl font-bold hover:text-red-500 z-10"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              <div className="hidden md:flex flex-col justify-center p-10 bg-amber-50">
                <h2 className="text-3xl font-bold mb-4">
                  {isEditing
                    ? "Update Employee"
                    : "Create New Employee"}
                </h2>

                <p className="text-gray-600 mb-6">
                  Fill all the required information carefully.
                </p>

                <div className="w-full h-64 bg-white border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400">
                  Employee Information
                </div>
              </div>

              <div className="p-8">{FormContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return FormContent;
};
const EmployeeInnerForm = ({
  formData,
  handleChange,
  fielderrors,
  handleSubmit,
  loading,
  isEditing,
}) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            First name*
          </label>
          <InputField
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {fielderrors.first_name && (
            <p className="text-red-500 text-xs mt-1">
              {fielderrors.first_name}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Middle name
          </label>
          <InputField
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Last name*
          </label>
          <InputField
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {fielderrors.last_name && (
            <p className="text-red-500 text-xs mt-1">
              {fielderrors.last_name}
            </p>
          )}
        </div>
      </div>
    </div>

    <div className="pt-2">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Account Details
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Username*
          </label>
          <InputField
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email*
          </label>
          <InputField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Phone*
          </label>
          <InputField
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        {!isEditing && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password*
            </label>
            <InputField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>


    <div className="pt-2">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Additional Information
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Blood Group*
          </label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
              (bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Age*
          </label>
          <InputField
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Address*
        </label>
        <InputField
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Aadhar*
        </label>
        <InputField
          name="aadhar_number"
          value={formData.aadhar_number}
          onChange={handleChange}
        />
      </div>
    </div>


    <button
      type="submit"
      className="
        mt-8 
        w-full 
        bg-linear-to-r from-amber-400 to-amber-600 
        hover:from-amber-500 hover:to-amber-700
        text-white 
        py-3 
        rounded-xl 
        font-semibold
        tracking-wide
        transition
        disabled:opacity-60
      "
      disabled={loading}
    >
      {loading
        ? "Please wait..."
        : isEditing
        ? "Update Employee"
        : "Create Employee"}
    </button>
  </form>
);


export default CreateEmployeeForm;
