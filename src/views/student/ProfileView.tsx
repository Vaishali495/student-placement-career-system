import React, { useState } from "react";
import {
  Download,
  Edit,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  FileText,
  GraduationCap,
  Code2,
  Briefcase,
  Eye,
} from "lucide-react";

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState("academic");

  // Bar Chart Data (Sem 1 to 6)
  const semesterData = [
    { sem: "Sem 1", sgpa: 8.60, height: "86%" },
    { sem: "Sem 2", sgpa: 8.70, height: "87%" },
    { sem: "Sem 3", sgpa: 8.90, height: "89%" },
    { sem: "Sem 4", sgpa: 8.80, height: "88%" },
    { sem: "Sem 5", sgpa: 9.10, height: "91%", isPeak: true },
    { sem: "Sem 6", sgpa: 8.90, height: "89%" },
  ];

  // Semester Transcript Table Data
  const transcriptRows = [
    { sem: "Semester 6", credits: "22.0 / 22.0", sgpa: "8.90", status: "Cleared" },
    { sem: "Semester 5", credits: "24.0 / 24.0", sgpa: "9.10", status: "Cleared" },
    { sem: "Semester 4", credits: "23.0 / 23.0", sgpa: "8.80", status: "Cleared" },
  ];

  return (
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      
      {/* 1. Main Student Profile Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-6">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          {/* Avatar & Personal Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Arjun Sharma"
                className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
              <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-600 text-white p-1 rounded-full border-2 border-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-slate-900">Arjun Sharma</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-md">
                  21BCE1042
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-md uppercase">
                  Cohort 2025
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-800">B.Tech in Computer Science and Engineering</span> • Apex Institute of Technology, Class of 2025
              </p>

              {/* Clearance Tags */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> TPO Verified Profile
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Academic Eligibility Cleared
                </span>
                <span className="bg-blue-50 text-blue-800 border border-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Placement Cell Enrolled
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2.5 w-full lg:w-auto shrink-0">
            <button className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export Full Placement Dossier
            </button>
            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5">
              <Edit className="w-3.5 h-3.5 text-slate-500" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Contact Info Footer Bar inside Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50/80 border border-slate-100 rounded-2xl text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">CAMPUS EMAIL</span>
            <span className="font-bold text-slate-800 mt-1 flex items-center gap-1.5 truncate">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> arjun.sharma21@campus.edu
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">CONTACT NUMBER</span>
            <span className="font-bold text-slate-800 mt-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" /> +91 98765 43210
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">CURRENT CUMULATIVE GPA</span>
            <span className="text-base font-black text-blue-600 mt-0.5 block">
              8.84 <span className="text-xs font-normal text-slate-400">/ 10.0</span>
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">STANDING & DISCIPLINE</span>
            <span className="font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 0 Active Backlogs (Clean)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sub Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={() => setActiveTab("academic")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "academic"
              ? "bg-[#2563eb] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Academic Records
        </button>

        <button
          onClick={() => setActiveTab("resume")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "resume"
              ? "bg-[#2563eb] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-4 h-4" /> Resume & Documents Hub
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
            activeTab === "resume" ? "bg-white text-blue-700" : "bg-emerald-100 text-emerald-800"
          }`}>
            ATS 94
          </span>
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "skills"
              ? "bg-[#2563eb] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Code2 className="w-4 h-4" /> Technical & Domain Skills
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "projects"
              ? "bg-[#2563eb] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Briefcase className="w-4 h-4" /> Projects & Experience
        </button>
      </div>

      {/* 3. Main Split Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2/3 Width): Semester Trajectory & Transcript Logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Semester-wise Grade Trajectory */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Semester-wise Grade Trajectory</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Validated against institutional ERP semester marksheet logs
                </p>
              </div>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1 rounded-xl">
                CUMULATIVE: 8.84 CGPA
              </span>
            </div>

            {/* Bar Chart Visualizer */}
            <div className="bg-slate-50/80 border border-slate-100 p-6 rounded-2xl">
              <div className="flex items-end justify-between h-48 pt-6 px-4">
                {semesterData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-xs font-extrabold text-slate-800 mb-2 opacity-90">
                      {item.sgpa.toFixed(2)}
                    </span>
                    <div
                      style={{ height: item.height }}
                      className={`w-12 rounded-t-xl transition-all duration-300 ${
                        item.isPeak
                          ? "bg-emerald-600 group-hover:bg-emerald-700"
                          : "bg-[#2563eb] group-hover:bg-blue-700"
                      }`}
                    ></div>
                    <span className={`text-xs font-bold mt-3 ${item.isPeak ? "text-emerald-700" : "text-slate-600"}`}>
                      {item.sem}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transcript Table */}
            <div className="space-y-3">
              <div className="grid grid-cols-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3">
                <span>SEMESTER</span>
                <span>CREDITS EARNED</span>
                <span>SGPA</span>
                <span>STANDING STATUS</span>
              </div>

              <div className="space-y-2">
                {transcriptRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 items-center bg-slate-50/80 border border-slate-100 p-3.5 rounded-xl text-xs font-medium"
                  >
                    <span className="font-bold text-slate-800">{row.sem}</span>
                    <span className="text-slate-600">{row.credits}</span>
                    <span className="font-black text-blue-600">{row.sgpa}</span>
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {row.status}
                      </span>
                      <button className="text-blue-600 font-bold hover:underline text-xs flex items-center gap-1 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" /> View Sheet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1/3 Width): Eligibility & Pre-requisites Widgets */}
        <div className="space-y-6">
          
          {/* Eligibility & Pre-requisites Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Eligibility & Pre-requisites</h3>

            {/* Backlog Clearance Alert */}
            <div className="bg-emerald-50/80 border border-emerald-100 p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>0 Active & Historical Backlogs</span>
              </div>
              <p className="text-[11px] text-emerald-700 leading-relaxed pl-6">
                Eligible for Tier-1 Super Dream packages (&gt; 20 LPA) with unconditional zero-arrear mandate.
              </p>
            </div>

            {/* 10th Secondary Score */}
            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-900">Class 10th (Secondary)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Central Board of Secondary Education (CBSE)
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-blue-600">95.2%</span>
                <span className="text-[10px] font-bold text-emerald-600 block uppercase">Distinction</span>
              </div>
            </div>

            {/* 12th Sr Secondary Score */}
            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-900">Class 12th (Sr. Secondary)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  CBSE • PCM Stream with Computer Science
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-blue-600">93.8%</span>
                <span className="text-[10px] font-bold text-emerald-600 block uppercase">Distinction</span>
              </div>
            </div>
          </div>

          {/* TPO Verification Seals Widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              TPO VERIFICATION SEALS
            </h3>

            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Dean of Placements Stamp</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Cryptographically signed on 12 Aug 2024
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfileView;