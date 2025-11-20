import { useState } from "react";
import InputField from "./Input";
import { toast } from "react-toastify";
import useEmployeeStore from "../store/useEmployeeStore";
import SuccessModal from "./SuccessModal";
import { employeeSchema } from "../validator/employeeSchema";

const CreateEmployeeForm = () => {
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
    const { createEmployee, loading } = useEmployeeStore();
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataForValidation = {
            ...formData,
            age: formData.age === "" ? undefined : Number(formData.age),
        };

        const validatedData = employeeSchema.safeParse(dataForValidation);

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
            const submit = await createEmployee(validatedData.data);

            if (submit.success) {
                setSubmitted(true);
            } else {
                toast.error(submit?.error || "Submit failed");
            }
        } catch (error) {
            toast.error("Unexpected error occurred");
        }
    };

    return (
        <>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-4 font-bold justify-center text-2xl">FORM</div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">First name*</label>
                            <InputField
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            {fielderrors.first_name && <p className="text-red-500 text-sm">{fielderrors.first_name}</p>}
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
                            <label className="block mb-1 font-medium">Last Name*</label>
                            <InputField
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            {fielderrors.last_name && <p className="text-red-500 text-sm">{fielderrors.last_name}</p>}
                        </div>
                    </div>

                    <label className="block mb-1 mt-6 font-medium">Username*</label>
                    <InputField
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {fielderrors.username && <p className="text-red-500 text-sm">{fielderrors.username}</p>}

                    <label className="block mb-1 mt-6 font-medium">Email*</label>
                    <InputField
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {fielderrors.email && <p className="text-red-500 text-sm">{fielderrors.email}</p>}

                    <label className="block mb-1 mt-6 font-medium">Phone number*</label>
                    <InputField
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    {fielderrors.phone_number && <p className="text-red-500 text-sm">{fielderrors.phone_number}</p>}

                    <label className="block mb-1 mt-6 font-medium">Blood Group*</label>
                    <select
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                    {fielderrors.blood_group && <p className="text-red-500 text-sm">{fielderrors.blood_group}</p>}

                    <label className="block mb-1 mt-6 font-medium">Age*</label>
                    <InputField
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                    {fielderrors.age && <p className="text-red-500 text-sm">{fielderrors.age}</p>}

                    <label className="block mb-1 mt-6 font-medium">Address*</label>
                    <InputField
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {fielderrors.address && <p className="text-red-500 text-sm">{fielderrors.address}</p>}

                    <label className="block mb-1 mt-6 font-medium">Aadhaar Number*</label>
                    <InputField
                        name="aadhar_number"
                        value={formData.aadhar_number}
                        onChange={handleChange}
                    />
                    {fielderrors.aadhar_number && <p className="text-red-500 text-sm">{fielderrors.aadhar_number}</p>}

                    <label className="block mb-1 mt-6 font-medium">Password*</label>
                    <InputField
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {fielderrors.password && <p className="text-red-500 text-sm">{fielderrors.password}</p>}

                    <label className="block mb-1 mt-6 font-medium">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="EMPLOYEE">Employee</option>
                    </select>
                    <button
                        type="submit"
                        className="mt-8 w-full bg-amber-500 text-white py-3 rounded-md"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>

            <SuccessModal
                isOpen={submitted}
                title="Form Submitted"
                messageline1="Employee Created Successfully"
                buttonText="OK"
                onClose={() => setSubmitted(false)}
            />
        </>
    );
};

export default CreateEmployeeForm;
