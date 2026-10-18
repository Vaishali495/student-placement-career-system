import React, { useState } from "react";
import Header from "../../components/Header";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const RegisterView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "student";
  const [role, setRole] = useState<string>(defaultRole);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Unified Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    department: "",
    organization: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    setSearchParams({ role: newRole });
    // Reset specific fields when switching role
    setFormData((prev) => ({
      ...prev,
      rollNo: "",
      department: "",
      organization: "",
      designation: "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // API call payload according to active role
      const payload = {
        role,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        ...(role === "student"
          ? { rollNo: formData.rollNo, department: formData.department }
          : { organization: formData.organization, designation: formData.designation }),
      };

      console.log("Registration Payload:", payload);
      // await registerUserApi(payload);
      // navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Outer full-screen wrapper with the background color */
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Create {role === "student" ? "Student" : "TPO / Recruiter"} Account</h2>

          {/* Role Switcher Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === "student" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              }`}
              onClick={() => handleRoleChange("student")}>
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === "recruiter" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              }`}
              onClick={() => handleRoleChange("recruiter")}>
              TPO / Recruiter
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-gray-600 uppercase">
                Full Name <span className="text-red-700 text-[13px]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">
                {role === "student" ? "Institutional Email" : "Work Email"}
                <span className="text-red-700 text-[13px]">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder={role === "student" ? "student@campus.edu" : "recruiter@company.com"}
              />
            </div>

            {/* Conditional Fields for Student */}
            {role === "student" && (
              <>
                <div>
                  <label htmlFor="rollNo" className="block text-xs font-semibold text-gray-600 uppercase">
                    Campus Roll No. <span className="text-red-700 text-[13px]">*</span>
                  </label>
                  <input
                    type="text"
                    name="rollNo"
                    id="rollNo"
                    required
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 2726160006"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-xs font-semibold text-gray-600 uppercase">
                    Department / Branch <span className="text-red-700 text-[13px]">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    required
                    onChange={handleChange}
                    value={formData.department}
                    className="w-full mt-1 p-2 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="e.g. B.Tech CSE / MCA"
                  />
                </div>
              </>
            )}

            {/* Conditional Fields for TPO / Recruiter */}
            {role === "recruiter" && (
              <>
                <div>
                  <label htmlFor="organization" className="block text-xs font-semibold text-gray-600 uppercase">
                    Organization / Company Name <span className="text-red-700 text-[13px]">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    id="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Microsoft / MMU Placement Cell"
                  />
                </div>
                <div>
                  <label htmlFor="designation" className="block text-xs font-semibold text-gray-600 uppercase">
                    Designation <span className="text-red-700 text-[13px]">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    required
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="e.g. HR Manager / TPO Officer"
                  />
                </div>
              </>
            )}

            {/* Password Fields */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-600 uppercase">
                Password *
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none transition"
                  placeholder="••••••••" //Hold Alt and press 0149, then release alt.
                />

                {/* Toggle Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none">
                  {showPassword ? (
                    /* Eye Off Icon (Hide) */
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    /* Eye Icon (Show) */
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Fields */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-600 uppercase">
                Confirm Password *
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none transition"
                  placeholder="••••••••" //Hold Alt and press 0149, then release alt.
                />

                {/* Toggle Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none">
                  {showConfirmPassword ? (
                    /* Eye Off Icon (Hide) */
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    /* Eye Icon (Show) */
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4869d3] text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer mt-2">
              {loading ? "Creating Account..." : "Complete Registration"}
            </button>
          </form>

          {/* Login Redirection Link */}
          <div className="flex justify-center items-center gap-1.5 mt-6 text-sm text-gray-600">
            <span>Already have an account?</span>
            <Link to="/login" className="text-[#4869d3] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
