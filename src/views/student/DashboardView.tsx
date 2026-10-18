import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Megaphone,
  Send,
  Calendar,
  Award,
  Bell,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardView = () => {
  const navigate = useNavigate();
  const [driveFilter, setDriveFilter] = useState<"all" | "eligible" | "tier1">("eligible");

  // Calculated Readiness Score Values
  const isProfileComplete = true; // 30%
  const isResumeUploaded = true;  // 30%
  const isSkillsAdded = true;     // 20%
  const isTpoCleared = true;      // 20%

  const overallReadiness =
    (isProfileComplete ? 30 : 0) +
    (isResumeUploaded ? 30 : 0) +
    (isSkillsAdded ? 20 : 0) +
    (isTpoCleared ? 20 : 0);

  // SVG Circular Donut Math
  const radius = 28;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallReadiness / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Section 1: Integrated Welcome Banner & Progress Bar Card */}
      <div className="w-full bg-[#edf2ff] border border-blue-100 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col lg:flex-row items-stretch justify-between gap-6">
        
        {/* Left Welcome Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-white px-2.5 py-1 rounded-xl border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-green-600 shrink-0"></span>
              OFFICIAL TPO CLEARANCE: TIER-1 DREAM STATUS ACTIVE
            </span>
            <h1 className="text-3xl font-bold mt-3 text-slate-900 tracking-wide">Welcome back, Arjun! 👋</h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Campus Recruitment Season 2025-26 • B.Tech Computer Science (Sem 7) •{" "}
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                CGPA: 8.84 (Verified)
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => navigate("/student/profile")}
              className="bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
              Update Resume (v3.4)
            </button>
            <button
              onClick={() => navigate("/student/drives")}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
              View Eligible Drives (14)
            </button>
          </div>
        </div>

        {/* Right Progress Card (Inside Blue Div) */}
        <div className="w-full lg:w-[380px] bg-white rounded-2xl p-5 shadow-xs flex flex-col justify-between border border-blue-100/80 shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm">Placement Readiness</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">COHORT TOP 5%</span>
          </div>

          <div className="flex items-center gap-4 my-3">
            <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
              <svg className="w-18 h-18 transform -rotate-90">
                <circle cx="36" cy="36" r={radius} stroke="#e2e8f0" strokeWidth={strokeWidth} fill="transparent" />
                <circle
                  cx="36"
                  cy="36"
                  r={radius}
                  stroke="#2563eb"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <span className="absolute text-base font-extrabold text-blue-600">{overallReadiness}%</span>
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                  <span>Academic Clearances</span>
                  <span className="text-emerald-600 font-bold">100% Verified</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                  <span>Resume & Skill Mapping</span>
                  <span className="text-blue-600 font-bold">Uploaded</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Full Access to Campus Placement Drives</span>
          </p>
        </div>
      </div>

      {/* Section 2: 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Eligible Drives */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">+4 New</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Eligible Drives</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">28</span>
              <span className="text-xs text-slate-500 font-medium">Total</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 14 Active Deadlines this week
            </p>
          </div>
        </div>

        {/* Card 2: Applications Sent */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
              <Send className="w-5 h-5" />
            </div>
            <span className="bg-purple-100 text-purple-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">In Pipeline</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications Sent</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">9</span>
              <span className="text-xs text-slate-500 font-medium">Applied</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-slate-600 font-medium">3 Active rounds</span>
              <span className="text-emerald-600 font-bold">1 Offer Received</span>
            </div>
          </div>
        </div>

        {/* Card 3: Shortlisted / Interviews */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Round 2</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shortlisted / Interviews</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">4</span>
              <span className="text-xs text-slate-500 font-medium">Rounds</span>
            </div>
            <p className="text-xs text-red-600 font-semibold mt-2 truncate">
              Next: Oracle Tech Round tomorrow...
            </p>
          </div>
        </div>

        {/* Card 4: Dream Offer Target */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Dream Tier</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dream Offer Target</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-blue-700">₹24.5</span>
              <span className="text-xs text-blue-900 font-bold">LPA</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2">
              Peak: Microsoft SDE @ <span className="font-bold text-slate-800">₹42 LPA</span>
            </p>
          </div>
        </div>

      </div>

      {/* Section 3: Main Split Grid (Drives List + Right Sidebar Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Upcoming Placement Drives & Critical Deadlines */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Header Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Upcoming Placement Drives & Critical Deadlines</h2>
              <p className="text-xs text-slate-500 mt-0.5">Verified on-campus recruiting schedules. Applications close automatically.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setDriveFilter("eligible")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  driveFilter === "eligible" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}>
                Eligible Only
              </button>
              <button
                onClick={() => setDriveFilter("tier1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  driveFilter === "tier1" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}>
                Tier-1 Dream
              </button>
            </div>
          </div>

          {/* Drive Card 1: Google India */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700 text-lg shrink-0">
                  G
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">Google India</h3>
                    <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md uppercase">
                      Tier 1 • Super Dream
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Software Development Engineer - 1 (Cloud Platform)</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl font-black text-slate-900">₹32.0 <span className="text-sm font-bold">LPA</span></span>
                <p className="text-[11px] text-slate-400 mt-0.5">Base: ₹19.5 LPA + Stocks</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 bg-slate-50 rounded-xl text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">ELIGIBILITY</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CGPA ≥ 8.5 Met
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">LOCATION</span>
                <span className="font-medium text-slate-700 mt-0.5 block">Bengaluru / Hyderabad</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">ASSESSMENT SLOT</span>
                <span className="font-medium text-slate-700 mt-0.5 block">Nov 18, 09:00 AM</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">REGISTRATION CUTOFF</span>
                <span className="font-bold text-red-600 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Closes in 18 hrs
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
              <span className="text-xs text-slate-400 font-mono">TPO Drive ID: #PC-2025-089 • PPT Attendance Required</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer">
                  JD & Syllabus
                </button>
                <button className="flex-1 sm:flex-initial bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs">
                  Quick Apply
                </button>
              </div>
            </div>
          </div>

          {/* Drive Card 2: Goldman Sachs */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700 text-lg shrink-0">
                  GS
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">Goldman Sachs</h3>
                    <span className="text-[10px] font-extrabold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md uppercase">
                      Tier 1 • Dream
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Summer Engineering Analyst (Conversion Track)</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl font-black text-slate-900">₹26.0 <span className="text-sm font-bold">LPA</span></span>
                <p className="text-[11px] text-slate-400 mt-0.5">Stipend: ₹1.25L / mo</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 bg-slate-50 rounded-xl text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">ELIGIBILITY</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eligible ✓
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">LOCATION</span>
                <span className="font-medium text-slate-700 mt-0.5 block">Bengaluru</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">ONLINE TEST (OA)</span>
                <span className="font-medium text-slate-700 mt-0.5 block">Saturday, 4:00 PM</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">REGISTRATION CUTOFF</span>
                <span className="font-bold text-red-600 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Closes in 2 days
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Eligibility Form Pre-filled
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer">
                  Details
                </button>
                <button className="flex-1 sm:flex-initial bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs">
                  Quick Apply
                </button>
              </div>
            </div>
          </div>

          {/* Drive Card 3: Atlassian */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700 text-lg shrink-0">
                  ATL
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">Atlassian</h3>
                    <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md uppercase">
                      Super Dream
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Associate Site Reliability Engineer (Remote First)</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl font-black text-slate-900">₹34.5 <span className="text-sm font-bold">LPA</span></span>
                <p className="text-[11px] text-slate-400 mt-0.5">Includes WFH Allowances</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 bg-slate-50 rounded-xl text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">ELIGIBILITY</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eligible ✓
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">WORK MODE</span>
                <span className="font-medium text-slate-700 mt-0.5 block">Remote / Hybrid</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">CODING ASSESSMENT</span>
                <span className="font-medium text-slate-700 mt-0.5 block">Nov 22, 11:00 AM</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">REGISTRATION CUTOFF</span>
                <span className="font-bold text-slate-700 mt-0.5 block">Closes in 4 days</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
              <span className="text-xs text-slate-500 font-medium">Shortlist Criteria: DSA + Distributed Systems fundamentals</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer">
                  Details
                </button>
                <button className="flex-1 sm:flex-initial bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs">
                  Quick Apply
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Widgets Stack (Action Alerts + Goal Fit Snapshot) */}
        <div className="space-y-6">
          
          {/* Widget 1: Action Alerts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" />
                <h3 className="text-base font-bold text-slate-900">Action Alerts</h3>
              </div>
              <span className="text-[10px] font-extrabold bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full uppercase">
                2 Urgent
              </span>
            </div>

            <div className="space-y-3">
              
              {/* Alert 1 */}
              <div className="p-3.5 bg-red-50/80 border-l-4 border-red-500 rounded-r-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
                    URGENT DEADLINE
                  </span>
                  <span className="text-[10px] text-red-600 font-bold">Today • 6:00 PM</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-1.5">
                  Oracle Technical Interview Slot Booking
                </p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Confirm your 45-minute panel slot before 6 PM today or slot will forfeit to waiting list.
                </p>
                <button className="text-xs font-bold text-red-700 hover:underline mt-2 flex items-center gap-1 cursor-pointer">
                  Select Interview Slot <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Alert 2 */}
              <div className="p-3.5 bg-blue-50/80 border-l-4 border-blue-500 rounded-r-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                    FEEDBACK
                  </span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-1.5">
                  Resume Feedback: Approved v3.4
                </p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Prof. Nair (TPO) approved your resume version for Tier-1 Super Dream companies with 0 flags.
                </p>
              </div>

              {/* Alert 3 */}
              <div className="p-3.5 bg-indigo-50/80 border-l-4 border-indigo-500 rounded-r-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                    ASSESSMENT
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Sat • 4:00 PM</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-1.5">
                  Goldman Sachs HackerRank OA
                </p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  System readiness check required 30 mins prior. Requires webcam + Chrome proctoring extension.
                </p>
                <button className="text-xs font-bold text-indigo-700 hover:underline mt-2 flex items-center gap-1 cursor-pointer">
                  Test System Setup <ExternalLink className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

          {/* Widget 2: Goal Fit Snapshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">Goal Fit Snapshot</h3>
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Career AI
              </span>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  TARGET ASPIRANT ROLE
                </span>
                <span className="text-xl font-extrabold text-blue-600">76%</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">Full Stack Cloud Engineer</h4>

              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                Based on 14 eligible job descriptions, you are highly competitive in Spring Boot, React, and Data Structures.
              </p>

              <div className="mt-3.5 pt-3 border-t border-blue-100/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  MISSING SKILL TAGS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    System Design (HLD)
                  </span>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Kubernetes
                  </span>
                  <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    gRPC / Protobuf
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/student/career")}
                className="w-full mt-4 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                Open Full Career Plan <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardView;