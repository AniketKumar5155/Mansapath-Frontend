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
        password: "",
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
        const validatedData = employeeSchema.safeParse(formData);

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
            const submit = await createEmployee(formData);

            if (submit.success) {
                setSubmitted(true);
            } else {
                toast.error(submit?.error || submit.message || "Submit failed");
            }
        } catch (error) {
            toast.error("Unexpected error occurred");
        }
    };

    return (
        <>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
                <form onSubmit={handleSubmit}>

                    <div className="flex mb-4 font-bold justify-center items-center text-2xl">FORM</div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">First name*</label>
                            <InputField
                                name="first_name"
                                placeholder="First name*"
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
                                placeholder="Middle name"
                                value={formData.middle_name}
                                onChange={handleChange}
                            />
                            {fielderrors.middle_name && (
                                <p className="text-red-500 text-sm mt-1">{fielderrors.middle_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Last name*</label>
                            <InputField
                                name="last_name"
                                placeholder="Last name*"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            {fielderrors.last_name && (
                                <p className="text-red-500 text-sm mt-1">{fielderrors.last_name}</p>
                            )}
                        </div>
                    </div>

                    <label className="block mb-1 mt-6 font-medium">Username*</label>
                    <InputField
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {fielderrors.username && (
                        <p className="text-red-500 text-sm mt-1">{fielderrors.username}</p>
                    )}

                    <label className="block mb-1 mt-6 font-medium">Email</label>
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {fielderrors.email && (
                        <p className="text-red-500 text-sm mt-1">{fielderrors.email}</p>
                    )}

                    <label className="block mb-1 mt-6 font-medium">Phone number* (Whatsapp)</label>
                    <InputField
                        name="phone_number"
                        placeholder="Phone number*"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    {fielderrors.phone_number && (
                        <p className="text-red-500 text-sm mt-1">{fielderrors.phone_number}</p>
                    )}

                    {/* <label className="block mb-1 mt-6 font-medium">Address</label> */}
                    {/* <InputField */}
                        {/* name="address" */}
                        {/* placeholder="Address*" */}
                        {/* value={formData.address} */}
                        {/* onChange={handleChange} */}
                    {/* /> */}

                    <label className="block mb-1 mt-6 font-medium">password*</label>
                    <InputField 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {fielderrors.password && (
                        <p className="text-red-500 text-sm mt-1">{fielderrors.password}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-8 w-full bg-amber-500 text-white py-3 rounded-md font-semibold hover:bg-amber-600 transition-all"
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
