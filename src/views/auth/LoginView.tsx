import React, { useState } from "react";
import Header from "../../components/Header";
import LockIcon from "../../assets/lock-icon.png";
import PlaceCraftLogo from "../../assets/PlaceCraft-logo.png";
import Graduatelogo from "../../assets/graduate.png";
import GirlImage from "../../assets/girl-image.jpg";
import VerifiedIcon from "../../assets/verified-icon.png";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LOGIN_ITEMS = [
  { id: "student", label: "Candidate Login" },
  { id: "recruiter", label: "TPO / RecruiterLogin" },
];

const LoginView = () => {
  const [activeTab, setActiveTab] = useState<string>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Form state management
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setFormData({ identifier: "", password: "" }); // Reset inputs on tab change
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler for authentication API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call here
      console.log("Submitting Payload:", { role: activeTab, ...formData });

      // Example redirection after login success:
      // navigate(activeTab === "student" ? "/student/dashboard" : "/tpo/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center w-full bg-[#f8f9ff] px-8 py-6 gap-10 min-h-[calc(100vh-80px)]">
        {/* Left side Information */}
        <div className="w-[40%] flex flex-col gap-3 items-start">
          <div className="flex items-center gap-1">
            <img className="w-4 h-4.5" src={LockIcon} alt="Lock Icon" />
            <p className="text-[14px] text-gray-600">Secure Placement Session</p>
          </div>
          <div className="flex flex-col gap-4 bg-[#e5eeff] rounded-xl w-full h-full px-12 py-5">
            <div className="flex justify-between items-center">
              <div className="w-36 flex items-center">
                <img className="w-full h-auto object-contain" src={PlaceCraftLogo} alt="PlaceCraft Logo" />
              </div>
              <div className="bg-white px-3.5 py-0.5 flex gap-2 items-center rounded-xl">
                <img src={Graduatelogo} alt="Logo" className="w-4 h-4" />
                <p className="text-xs font-semibold tracking-wider text-green-800">Tier-1 Accredited</p>
              </div>
            </div>
            <div>
              <p className="font-bold text-4xl">Empowering Campus Careers & Dream Placements</p>
              <p className="text-gray-700 text-xs tracking-wider">
                Centralized recruitment tracking, round eligibility validation, automated slot booking, and verified offer disclosures for university
                students and corporate partners.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              {/* Card 1 */}
              <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-between min-w-0">
                <p className="text-2xl font-bold text-blue-800 tracking-tight">94.8%</p>
                <p className="text-[11px] text-gray-700 font-medium leading-tight">Placement Rate</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-between min-w-0">
                <p className="text-2xl font-bold text-green-800 tracking-tight">350+</p>
                <p className="text-[11px] text-gray-700 font-medium leading-tight">Tier-1 Recruiter</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-between min-w-0">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">₹52 LPA</p>
                <p className="text-[11px] text-gray-700 font-medium leading-tight">Highest CTC</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 bg-white rounded-lg p-5.5">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img src={GirlImage} alt="Girl Image" className="w-12 h-12 rounded-full object-cover object-top" />
                  <span>
                    <p className="text-base">Ananya Deshmukh</p>
                    <p className="text-sm text-gray-700">B.Tech CSE • Class of 2024</p>
                  </span>
                </div>
                <div className="flex gap-2 items-center bg-green-300 px-2.5 py-0.5 rounded-xl">
                  <img src={VerifiedIcon} alt="VerifiedIcon" className="w-5 h-5" />
                  <p className="text-xs">Placed • Microsoft</p>
                </div>
              </div>
              <p className="text-gray-800 text-sm">
                "PlaceCraft made tracking 14 concurrent company drives and clearing live OAs seamless. Instant cut-off verification removed all
                guesswork during slot bookings."
              </p>
              <div className="flex gap-6 items-center text-sm tracking-wide">
                <p>6 Rounds Cleared</p>
                <p>Day 0 Offer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="w-[55%] flex flex-col gap-8 items-end">
          <div className="flex items-center gap-1 bg-[#dce9ff] w-fit rounded-xl px-4 py-0.5">
            <span className="inline-block bg-green-700 rounded-full w-2 h-2"></span>
            <p className="text-xs tracking-widest font-semibold text-gray-700">Placement Session 2025-26 Live</p>
          </div>

          <div className="w-full h-full rounded-xl shadow-sm bg-white flex flex-col px-6 py-7 ">
            <p className="text-gray-600 uppercase text-xs tracking-wide font-semibold mb-1">Access Category</p>

            <div className="bg-[#e5eeff] flex w-full rounded-md px-1 py-1">
              {LOGIN_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  className={`w-1/2 py-2.5 rounded-lg text-[15px] transition-all duration-200 flex items-center justify-center gap-2 font-semibold ${
                    activeTab === item.id
                      ? "text-[#1d4ed8] bg-white shadow-sm"
                      : "text-slate-700 bg-transparent hover:cursor-pointer hover:text-slate-900"
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Dynamic Heading based on Active Tab */}
            <div className="my-4">
              <h1 className="text-xl font-bold">{activeTab === "student" ? "Student Portal Authentication" : "TPO & Recruiter Authentication"}</h1>
              <p className="text-gray-600 text-sm">
                {activeTab === "student"
                  ? "Enter your institutional credentials to access your placement drives, assessments, and interview schedules."
                  : "Enter your corporate or official cell credentials to manage placement drives, student verification, and drive slots."}
              </p>
            </div>

            {/* Form Tag Wrapping Inputs */}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                {activeTab === "student" ? "Campus RollNo. /Institutional Email" : "Work Email"} <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                required
                value={formData.identifier}
                onChange={handleChange}
                placeholder={activeTab === "student" ? "2726160006/student@campus.edu" : "recruiter@campus.edu"}
                className="block w-full bg-[#eff4ff] p-2.5 text-base rounded-lg"
              />
              <div className="flex justify-between items-center text-sm mt-4">
                <label htmlFor="password">
                  Secret Passcode / Password<span className="text-red-700">*</span>
                </label>
                <Link to="/forgot-password" className="text-[#4869d3] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="•••••••••••••••"
                  className="block w-full bg-[#eff4ff] p-2.5 text-base rounded-lg placeholder:text-2xl placeholder:tracking-widest"
                />

                {/* Toggle Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none">
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#2563eb] p-2.5 rounded-lg text-white tracking-tighter text-base my-4 hover:cursor-pointer hover:bg-[#3a72eb] transition-all">
                {loading ? "Authenticating..." : "Sign In to Placement Portal"}
              </button>
            </form>

            <div className="flex justify-between items-center p-2 rounded-lg my-4 bg-[#eff4ff]">
              <p className="text-gray-700 text-sm">Don't have your portal account yet?</p>
              <Link to={`/register?role=${activeTab}`} className="text-[#4869d3] font-semibold tracking-tighter text-sm hover:underline">
                {activeTab === "student" ? " Register as Student ⇨" : " Register as Recruiter ⇨"}
              </Link>
            </div>

            <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
              Official Campus Placement &amp; Training Cell authentication node. Access is logged with IP, device signature, and university seat
              credentials in adherence with University Placement Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginView;
