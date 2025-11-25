import { useState } from "react";
import InputField from "../component/Input";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OperatorLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const { login, loading, user } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            toast.error("Unexpected error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-5 bg-white border rounded-md shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-center">Operator Login</h2>

                <form onSubmit={handleSubmit}>
                    <label className="block mb-1">Email</label>
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {fieldErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                    )}

                    <label className="block mt-4 mb-1">Password</label>
                    <InputField
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {fieldErrors.password && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OperatorLogin;
