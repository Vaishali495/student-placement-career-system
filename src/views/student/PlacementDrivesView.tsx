import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  GitBranch,
  Star,
  MapPin,
  BadgeCheck,
  Bookmark,
  Share2,
  FileText,
  CheckCircle2,
  Clock,
  ChevronRight,
  Download,
  Check,
  Sparkles,  
} from "lucide-react";

// Mock Data for Placement Drives
const DRIVES_DATA = [
  {
    id: "microsoft",
    company: "Microsoft Corporation",
    shortName: "Microsoft",
    logoBg: "bg-blue-100 text-blue-600",
    role: "Software Development Engineer 1",
    tier: "Dream Tier",
    ctc: "44.0",
    location: "Hyderabad / Bangalore",
    deadline: "2 days left",
    eligible: true,
    userCgpa: "8.84",
    minCgpa: "8.0",
    type: "Full Time + PPO",
    batch: "Batch '25",
    resumeName: "Arjun_Sharma_SDE_v3.pdf",
    resumeUpdated: "Updated 3d ago",
    compensation: {
      base: "18.0 LPA",
      rsu: "20.0 LPA",
      bonus: "6.0 LPA",
      total: "44.0 LPA",
    },
    deadlines: [
      { label: "REGISTRATION CLOSES", time: "Nov 18, 11:59 PM", note: "TPO portal auto-locks", status: "urgent" },
      { label: "PRE-PLACEMENT TALK", time: "Nov 20, 04:00 PM", note: "Main Auditorium & Teams", status: "normal" },
      { label: "CODILITY ASSESSMENT", time: "Nov 22, 09:00 AM", note: "Online proctored test", status: "normal" },
      { label: "TECHNICAL INTERVIEWS", time: "Nov 26, Full Day", note: "3 Rounds + HR", status: "normal" },
    ],
    eligibilityChecks: [
      { label: "CGPA Requirement", req: "Required: ≥ 8.0", value: "Your CGPA: 8.84", status: true },
      { label: "Branch Eligibility", req: "Required: CSE, IT, ECE", value: "Your Branch: CSE", status: true },
      { label: "Active Backlogs", req: "Required: 0 Active", value: "Your Backlogs: 0", status: true },
      { label: "10th / 12th Academic Marks", req: "Required: ≥ 75%", value: "Your Score: 94.2%", status: true },
    ],
    skillsMatched: ["Data Structures & Algorithms", "Modern C++ / Java", "Distributed Systems", "Azure Cloud Services"],
    missingSkills: ["System Design (High-Level)"],
    matchPercent: 85,
    stages: [
      { num: 1, title: "Stage 1: Resume & Academic Screening", desc: "Automated TPO compliance verification", status: "passed", tag: "AUTOMATIC PASSED" },
      { num: 2, title: "Stage 2: Codility Online Assessment", desc: "3 Coding Problems • 90 Minutes • Core DSA", status: "upcoming", tag: "Upcoming: Nov 22" },
      { num: 3, title: "Stage 3: Technical Round 1 (LiveDSA & OS)", desc: "Problem solving, multi-threading, and system memory", status: "pending", tag: "Stage 3 of 5" },
      { num: 4, title: "Stage 4: Technical Round 2 (Architecture & Projects)", desc: "Capstone review, scaling patterns, API design", status: "pending", tag: "Stage 4 of 5" },
      { num: 5, title: "Stage 5: AA / HR Cultural & Values Alignment", desc: "Growth mindset, collaboration, leadership principles", status: "pending", tag: "Final Round" },
    ],
    description: "As a Software Development Engineer (SDE 1) at Microsoft Cloud & Enterprise group, you will design, implement, and maintain hyper-scale web services, microservices, and client platforms serving over a billion users worldwide.",
    responsibilities: [
      "Build resilient, fault-tolerant cloud microservices using C#, Go, or Modern C++.",
      "Collaborate with Principal Architects to design distributed caching and telemetry ingestion systems.",
      "Maintain CI/CD automation and automated test pipelines adhering to high reliability SLOs (99.99%).",
    ],
    attachments: [
      { name: "Detailed_JD_SDE_FY25.pdf", size: "2.4 MB • Official JD" },
      { name: "Microsoft_Campus_Deck.pptx", size: "14.1 MB • PPT Presentation" },
    ],
  },
  {
    id: "goldman",
    company: "Goldman Sachs",
    shortName: "Goldman Sachs",
    logoBg: "bg-amber-100 text-amber-700",
    role: "Operations & Technology Analyst",
    tier: "FinTech Tier",
    ctc: "28.5",
    location: "Bangalore Campus",
    deadline: "Nov 21, 2024",
    eligible: true,
    userCgpa: "8.84",
    minCgpa: "8.0",
    type: "All Streams",
    batch: "Quantitative Tech",
    resumeName: "Arjun_Sharma_FinTech_v2.pdf",
    resumeUpdated: "Updated 1d ago",
    compensation: {
      base: "16.0 LPA",
      rsu: "8.5 LPA",
      bonus: "4.0 LPA",
      total: "28.5 LPA",
    },
    deadlines: [
      { label: "OA TEST", time: "Nov 21, 02:00 PM", note: "HackerRank Platform", status: "urgent" },
    ],
    eligibilityChecks: [
      { label: "CGPA Requirement", req: "Required: ≥ 8.0", value: "Your CGPA: 8.84", status: true },
    ],
    skillsMatched: ["Algorithms", "Java / C++", "Database Management"],
    missingSkills: ["Financial Engineering"],
    matchPercent: 78,
    stages: [
      { num: 1, title: "Stage 1: Resume Shortlisting", desc: "TPO Verified", status: "passed", tag: "PASSED" },
    ],
    description: "Technology Analyst role focused on building low-latency trading engines, risk management tools, and financial transaction pipelines.",
    responsibilities: [
      "Develop secure, scalable microservices in Java/Spring Boot.",
      "Optimize SQL/NoSQL queries for high-throughput transaction processing.",
    ],
    attachments: [{ name: "GS_Tech_Role_2025.pdf", size: "1.8 MB • Role Details" }],
  },
];

const PlacementDrivesView = () => {
  const [selectedDriveId, setSelectedDriveId] = useState("microsoft");
  const activeDrive = DRIVES_DATA.find((d) => d.id === selectedDriveId) || DRIVES_DATA[0];

  return (
    <div className="flex flex-col gap-5 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            UNIVERSITY CAREER PORTAL • Cohort of 2025
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            Campus Placement Drives
          </h2>
        </div>

        <div className="flex bg-white border border-slate-200/80 shadow-xs justify-between items-center rounded-2xl px-4 py-2.5 gap-3">
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile Clearance</p>
            <p className="text-xs font-bold text-emerald-700">Eligible for 18 Active Drives</p>
          </div>
          <div className="flex justify-center items-center bg-emerald-600 w-9 h-9 rounded-xl shadow-xs">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap lg:flex-nowrap gap-3">
          <div className="bg-slate-50 border border-slate-100 p-2.5 flex-1 flex items-center gap-2 rounded-xl text-slate-500 text-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by company, role, required skills (e.g. C, C++, Java, Python, React...)"
              className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-400 text-xs font-medium"
            />
          </div>

          <div className="bg-slate-50 border border-slate-100 px-3 py-2 flex items-center gap-2 rounded-xl">
            <GitBranch className="w-4 h-4 text-slate-600 shrink-0" />
            <select className="bg-transparent text-slate-800 text-xs font-bold outline-none cursor-pointer">
              <option value="">Branch: CSE, IT, ECE</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div className="bg-slate-50 border border-slate-100 px-3 py-2 flex items-center gap-2 rounded-xl text-xs font-bold text-slate-700">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span>Min CGPA ≥ 8.0</span>
          </div>

          <div className="bg-slate-50 border border-slate-100 px-3 py-2 flex items-center gap-2 rounded-xl text-xs font-bold text-slate-700">
            <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
            <span>Pan India</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
            All Drives (32)
          </button>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer">
            Eligible for Me (18)
          </button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
            Dream Tier (&gt; ₹20 LPA)
          </button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
            Super Dream (&gt; ₹30 LPA)
          </button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
            Core Engineering
          </button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
            Software & IT Field
          </button>
        </div>
      </div>

      {/* Main Split Body Layout */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-6">
        
        {/* Left Column: Active Drives List (40% width) */}
        <div className="w-full lg:w-[40%] flex flex-col gap-3 shrink-0">
          <div className="flex justify-between items-center px-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              ACTIVE RECRUITER PIPELINES
            </span>
            <span className="text-xs font-bold text-blue-600">Showing 5 of 18 Eligible</span>
          </div>

          {/* Drive Cards Container */}
          <div className="flex flex-col gap-3">
            {DRIVES_DATA.map((drive) => {
              const isActive = drive.id === selectedDriveId;
              return (
                <div
                  key={drive.id}
                  onClick={() => setSelectedDriveId(drive.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3 relative ${
                    isActive
                      ? "bg-blue-50/70 border-blue-400 shadow-md ring-1 ring-blue-400"
                      : "bg-white border-slate-200/80 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  {/* Company & Role Header */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 rounded-xl ${drive.logoBg} flex items-center justify-center font-bold text-lg shrink-0 shadow-xs`}>
                        {drive.company[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{drive.shortName}</h3>
                          <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md uppercase">
                            {drive.tier}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium truncate max-w-45">
                          {drive.role}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xl font-black text-slate-900">₹{drive.ctc}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">LPA CTC</p>
                    </div>
                  </div>

                  {/* Location & Deadline */}
                  <div className={`flex justify-between items-center p-2.5 rounded-xl text-xs font-medium ${
                    isActive ? "bg-white/80 border border-blue-100" : "bg-slate-50"
                  }`}>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{drive.location}</span>
                    </div>
                    <span className="text-red-600 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {drive.deadline}
                    </span>
                  </div>

                  {/* Badges & Status */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      <span>Eligible • CGPA {drive.userCgpa} ≥ {drive.minCgpa}</span>
                    </div>

                    <div className="flex gap-1.5 text-[10px] font-bold">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                        {drive.type}
                      </span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {drive.batch}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Complete Detailed Company Panel (60% width) */}
        <div className="w-full lg:w-[60%] bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-6">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${activeDrive.logoBg} flex items-center justify-center font-bold text-xl shrink-0 shadow-xs`}>
                {activeDrive.company[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{activeDrive.company}</h2>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Cloud + AI Platform • Core SDE Hiring Pipeline 2025
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Resume & Quick Apply Card */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Active Resume Linked: <span className="text-blue-700 underline cursor-pointer">{activeDrive.resumeName}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{activeDrive.resumeUpdated} • Verified by TPO</p>
              </div>
            </div>

            <button className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0">
              Apply with Default Resume <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Compensation Architecture Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              COMPENSATION ARCHITECTURE
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Base Salary (Annual)</span>
                <span className="text-base font-black text-slate-900 mt-1 block">₹{activeDrive.compensation.base}</span>
                <span className="text-[10px] text-slate-400">Paid monthly</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">RSUs / Stocks</span>
                <span className="text-base font-black text-blue-600 mt-1 block">₹{activeDrive.compensation.rsu}</span>
                <span className="text-[10px] text-slate-400">Vested over 4 years</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Joining Bonus</span>
                <span className="text-base font-black text-slate-900 mt-1 block">₹{activeDrive.compensation.bonus}</span>
                <span className="text-[10px] text-slate-400">First year payout</span>
              </div>
              <div className="border-l border-slate-200/80 pl-3">
                <span className="text-[10px] font-bold text-blue-700 block uppercase">Total CTC Package</span>
                <span className="text-base font-black text-blue-700 mt-1 block">₹{activeDrive.compensation.total}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Dream Tier Verified</span>
              </div>
            </div>
          </div>

          {/* Important Placement Deadlines */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              IMPORTANT PLACEMENT DEADLINES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeDrive.deadlines.map((item, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                      item.status === "urgent" ? "text-red-600" : "text-slate-500"
                    }`}>
                      {item.label}
                    </span>
                    <p className="text-xs font-extrabold text-slate-900 mt-1">{item.time}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TPO Official Eligibility Clearance */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                TPO OFFICIAL ELIGIBILITY CLEARANCE
              </h4>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                100% CLEARED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeDrive.eligibilityChecks.map((chk, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{chk.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {chk.req} • <span className="text-emerald-700 font-bold">{chk.value}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Match Analysis */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                SKILL MATCH ANALYSIS
              </h4>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {activeDrive.matchPercent}% Profile Fit
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeDrive.skillsMatched.map((skill, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600" /> {skill}
                </span>
              ))}
              {activeDrive.missingSkills.map((skill, idx) => (
                <span key={idx} className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 5-Stage Evaluation Pipeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              5-STAGE EVALUATION PIPELINE
            </h4>

            <div className="space-y-3">
              {activeDrive.stages.map((stg) => (
                <div key={stg.num} className="flex items-start justify-between bg-slate-50/80 border border-slate-100 p-3.5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      stg.status === "passed"
                        ? "bg-emerald-600 text-white"
                        : stg.status === "upcoming"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}>
                      {stg.num}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{stg.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{stg.desc}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md shrink-0 uppercase ${
                    stg.status === "passed"
                      ? "bg-emerald-100 text-emerald-800"
                      : stg.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {stg.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Role Description & Responsibilities */}
          <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ROLE DESCRIPTION & RESPONSIBILITIES
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeDrive.description}
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-600">
              {activeDrive.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>

          {/* Official Drive Attachments & Guidelines */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              OFFICIAL DRIVE ATTACHMENTS & GUIDELINES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeDrive.attachments.map((att, idx) => (
                <div key={idx} className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 truncate max-w-40">{att.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{att.size}</p>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PlacementDrivesView;