import React, { useState } from "react";
import Header from "../../components/Header";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { registerStudentApi, registerTpoApi } from "../../services/authService";
import axios from "axios";
import { Course, UserRole } from "../../types/auth";

const RegisterView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || UserRole.STUDENT;
  const [role, setRole] = useState<string>(defaultRole);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Unified Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    course: "",
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
      course: "",
      organization: "",
      designation: "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear all previous errors
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});

    try {
      // API call payload according to active role
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        ...(role === UserRole.STUDENT
          ? { rollNumber: formData.rollNo, course: formData.course }
          : { organization: formData.organization, designation: formData.designation }),
        role,
      };

      console.log("Registration Payload:", payload);
      const response = role === UserRole.STUDENT ? await registerStudentApi(payload) : await registerTpoApi(payload);

      console.log("Registration successful:", response);

      navigate("/verify-email-notice", { state: { email: formData.email } });
    } catch (error) {
      console.error("Registration error:", error);

      if (axios.isAxiosError(error)) {
        const apiErrors = error?.response?.data?.errors;
        if (Array.isArray(apiErrors)) {
          const errorMap: Record<string, string> = {};
          apiErrors.forEach((err: { field: string; message: string }) => {
            errorMap[err.field] = err.message;
          });
          setFieldErrors(errorMap);
        }
      }
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Create {role === UserRole.STUDENT ? "Student" : "TPO"} Account</h2>

          {/* Role Switcher Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === UserRole.STUDENT ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              }`}
              onClick={() => handleRoleChange(UserRole.STUDENT)}>
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === UserRole.TPO ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              }`}
              onClick={() => handleRoleChange(UserRole.TPO)}>
              TPO
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
              {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">
                {role === UserRole.STUDENT ? "Institutional Email" : "Work Email"}
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
                placeholder={role === UserRole.STUDENT ? "student@campus.edu" : "tpo@company.com"}
              />
              {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
            </div>

            {/* Conditional Fields for Student */}
            {role === UserRole.STUDENT && (
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

                  {fieldErrors.rollNumber && <p className="text-xs text-red-500 mt-1">{fieldErrors.rollNumber}</p>}
                </div>
                <div>
                  <label htmlFor="course" className="block text-xs font-semibold text-gray-600 uppercase">
                    Course <span className="text-red-700 text-[13px]">*</span>
                  </label>
                  <select
                    name="course"
                    id="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full mt-1 p-2 bg-gray-100 rounded-md outline-none transition cursor-pointer text-gray-700 ${
                      fieldErrors.course ? "border border-red-500 focus:ring-1 focus:ring-red-500" : "focus:ring-1 focus:ring-blue-500"
                    }`}>
                    <option value="" disabled>
                      Select Course
                    </option>
                    {Object.values(Course).map((courseVal) => (
                      <option key={courseVal} value={courseVal}>
                        {courseVal}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.course && <p className="text-xs text-red-500 mt-1">{fieldErrors.course}</p>}
                </div>
              </>
            )}

            {/* Conditional Fields for TPO */}
            {role === UserRole.TPO && (
              <>
                <div>
                  <label htmlFor="organization" className="block text-xs font-semibold text-gray-600 uppercase">
                    Organization <span className="text-red-700 text-[13px]">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    id="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="e.g. MMU Placement Cell"
                  />
                  {fieldErrors.organization && <p className="text-xs text-red-500 mt-1">{fieldErrors.organization}</p>}
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
                    placeholder="e.g. TPO Officer"
                  />
                  {fieldErrors.designation && <p className="text-xs text-red-500 mt-1">{fieldErrors.designation}</p>}
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
              {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>}
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
              {fieldErrors.confirmPassword && <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4869d3] text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer mt-2">
              {loading ? "Registering..." : "Complete Registration"}
            </button>
          </form>

          {/* Login Redirection Link */}
          <div className="flex justify-center items-center gap-1.5 mt-6 text-sm text-gray-600">
            <span>Already have an account? </span>
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
