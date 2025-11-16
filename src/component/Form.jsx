import { useState } from "react";
import InputField from "./Input";
import { toast } from "react-toastify";
import useFormStore from "../store/formStore";
import formSubmissionSchema from "../validator/formSchema";
import SuccessModal from "./SuccessModal";

const Form = ({ overlay = false, onClose = () => { } }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        email: "",
        phone_number: "",
        address: "",
        problem_description: "",
    });

    const [fielderrors, setFieldErrors] = useState({});
    const { submitForm, loading } = useFormStore();
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validatedData = formSubmissionSchema.safeParse(formData);

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
            const submit = await submitForm(formData);
            if (submit.success) {
                setSubmitted(true);
            } else {
                toast.error(submit?.error || submit.message || "Submit failed");
            }
        } catch {
            toast.error("Unexpected error occurred");
        }
    };

    return (
        <>
            {overlay && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="relative bg-white p-6 rounded-lg w-[600px] max-h-full overflow-auto border-4">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-xl font-semibold cursor-pointer"
                        >
                            ×
                        </button>

                        <InnerForm
                            formData={formData}
                            handleChange={handleChange}
                            fielderrors={fielderrors}
                            handleSubmit={handleSubmit}
                            loading={loading}
                        />
                    </div>

                    <SuccessModal
                        isOpen={submitted}
                        title="Form Submitted"
                        messageline1="Your form has been submitted."
                        messageline2="We will contact you soon."
                        buttonText="OK"
                        onClose={() => setSubmitted(false)}
                    />
                </div>
            )}

            {!overlay && (
                <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
                    <InnerForm
                        formData={formData}
                        handleChange={handleChange}
                        fielderrors={fielderrors}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />

                    <SuccessModal
                        isOpen={submitted}
                        title="Form Submitted"
                        messageline1="Your form has been submitted."
                        messageline2="We will contact you soon."
                        buttonText="OK"
                        onClose={() => setSubmitted(false)}
                    />
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
                {fielderrors.middle_name && (
                    <p className="text-red-500 text-sm mt-1">{fielderrors.middle_name}</p>
                )}
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
        {fielderrors.gender && (
            <p className="text-red-500 text-sm mt-1">{fielderrors.gender}</p>
        )}

        <label className="block mb-1 mt-6 font-medium">Email</label>
        <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        {fielderrors.email && (
            <p className="text-red-500 text-sm mt-1">{fielderrors.email}</p>
        )}

        <label className="block mb-1 mt-6 font-medium">Phone number*</label>
        <InputField
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
        />
        {fielderrors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{fielderrors.phone_number}</p>
        )}

        <label className="block mb-1 mt-6 font-medium">Address</label>
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
        {fielderrors.problem_description && (
            <p className="text-red-500 text-sm mt-1">{fielderrors.problem_description}</p>
        )}

        <button
            type="submit"
            className="mt-8 w-full bg-amber-500 text-white py-3 rounded-md font-semibold"
        >
            {loading ? "Submitting..." : "Submit"}
        </button>
    </form>
);

export default Form;
