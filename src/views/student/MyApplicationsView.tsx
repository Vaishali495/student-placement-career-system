import React, { useState } from "react";
import {
  Download,
  RotateCw,
  Search,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Check,
  Calendar,
  XCircle,
  ShieldAlert,
  ChevronRight,
  Award,
  AlertCircle,
} from "lucide-react";

const MyApplicationView = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      
      {/* 1. Page Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            TPO SEASON 2024-25 • Auto-synced 4m ago
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            My Placement Applications & Status Tracker
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time multi-stage pipeline, interview credentials, online tests, and official offer acceptance windows.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
            <Download className="w-4 h-4 text-slate-500" /> Export Tracker (PDF)
          </button>
          <button className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
            <RotateCw className="w-4 h-4" /> Refresh TPO Logs
          </button>
        </div>
      </div>

      {/* 2. Pipeline Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Applied */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">TOTAL APPLIED</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">09</p>
          <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Across 4 Sectors</p>
        </div>

        {/* In Review / TPO */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">IN REVIEW / TPO</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">02</p>
          <p className="text-[10px] font-bold text-blue-600 mt-0.5">Eligibility check ok</p>
        </div>

        {/* Shortlist & OA */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">SHORTLIST & OA</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">03</p>
          <p className="text-[10px] font-semibold text-slate-500 mt-0.5">1 Live HackerRank</p>
        </div>

        {/* Interviews */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">INTERVIEWS</span>
            <Video className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">02</p>
          <p className="text-[10px] font-bold text-purple-600 mt-0.5">1 Scheduled Nov 14</p>
        </div>

        {/* Offers Received */}
        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">OFFERS RECEIVED</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-900 mt-2">01</p>
          <p className="text-[10px] font-bold text-emerald-700 mt-0.5">SAP Labs • ₹16.8 LPA</p>
        </div>

        {/* Regrets */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">REGRETS</span>
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl font-black text-red-600 mt-2">01</p>
          <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Round 1 Archive</p>
        </div>
      </div>

      {/* 3. Filter Navigation & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "all", label: "All (9)" },
            { id: "active", label: "Active Only (7)" },
            { id: "interviews", label: "Interviews (2)" },
            { id: "offers", label: "Offers (1)" },
            { id: "archived", label: "Archived (1)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 flex items-center gap-2 rounded-xl text-xs w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-slate-800 placeholder-slate-400 text-xs"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button className="bg-white text-slate-800 px-2.5 py-1 rounded-lg shadow-xs">Pipeline View</button>
            <button className="text-slate-500 px-2.5 py-1 rounded-lg">Detailed List</button>
          </div>
        </div>
      </div>

      {/* 4. Applications List Pipeline */}
      <div className="flex flex-col gap-4">
        
        {/* CARD 1: Oracle Cloud (Active Interview Pipeline) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center text-xl shrink-0 border border-red-100">
                O
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-900">Oracle Cloud</h3>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                    Tier-1 Dream Drive
                  </span>
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Technical Interview Scheduled
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Cloud Systems Engineer • Infrastructure Core Platform • Hyderabad / Bengaluru
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400 font-bold uppercase">OFFERED CTC</p>
                <p className="text-2xl font-black text-slate-900">₹22.5 <span className="text-xs font-bold">LPA</span></p>
              </div>
              <button className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5">
                <Video className="w-4 h-4" /> Interview Hub
              </button>
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="py-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>LIVE SELECTION PIPELINE (STAGE 4 OF 6)</span>
            </div>

            <div className="relative flex items-center justify-between w-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 w-full z-0"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 w-[60%] z-0"></div>

              {/* Step 1: Applied */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 mt-1">Applied</span>
                <span className="text-[10px] text-slate-400">Oct 28</span>
              </div>

              {/* Step 2: TPO Verified */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 mt-1">TPO Verified</span>
                <span className="text-[10px] text-emerald-600 font-bold">Oct 30 • CGPA Met</span>
              </div>

              {/* Step 3: Online Test */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 mt-1">Online Test</span>
                <span className="text-[10px] text-emerald-600 font-bold">Cleared • 94%</span>
              </div>

              {/* Step 4: Tech Round 1 (Active) */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow-md ring-4 ring-blue-100">
                  <Video className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-blue-700 mt-1">Tech Round 1</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded mt-0.5">
                  Nov 14, 10:00 AM
                </span>
              </div>

              {/* Step 5: HR Round */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs">
                  5
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-1">HR Round</span>
                <span className="text-[10px] text-slate-400">Pending</span>
              </div>

              {/* Step 6: Offer Release */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs">
                  6
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-1">Offer Release</span>
                <span className="text-[10px] text-slate-400">Est. Nov 22</span>
              </div>
            </div>
          </div>

          {/* Scheduled Session Alert Card */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-900">Scheduled Session: Virtual Technical Discussion • Round 1</p>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    Slot Confirmed
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Panelist: Dr. V. Kulkarni (Principal Cloud Architect, OCI) • Platform: Microsoft Teams • Duration: 60 mins
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Download Hall Ticket
              </button>
              <button className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1">
                Prep Dossier
              </button>
              <button className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> Join MS Teams Meeting
              </button>
            </div>
          </div>
        </div>

        {/* CARD 2: SAP Labs India (Selected & Offer Released) */}
        <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 font-bold rounded-2xl flex items-center justify-center text-xl shrink-0 border border-emerald-200">
                SAP
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-900">SAP Labs India</h3>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                    Core FTE Drive
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3" /> Selected • Official Offer Released
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Associate Developer (ABAP & Cloud Platform) • Whitefield, Bengaluru
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400 font-bold uppercase">OFFICIAL CTC OFFER</p>
                <p className="text-2xl font-black text-emerald-800">₹16.8 <span className="text-xs font-bold">LPA</span></p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-red-600 uppercase">Decision Window</p>
                <p className="text-xs font-extrabold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md mt-0.5">
                  Deadline: Nov 20, 2024
                </p>
              </div>
            </div>
          </div>

          {/* Offer Letter Box & Decision Bar */}
          <div className="bg-white border border-emerald-200 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Offer Letter Issued: Reference #SAP-IN-2025-BLR-0941
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Includes ₹1.5L Joining Bonus, Health Cover ₹7.5L, and 6-month pre-placement internship starting January 2025.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
              <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> View & Download Offer (PDF)
              </button>
              <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer">
                Request Extension
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Accept Offer & Notify TPO
              </button>
            </div>
          </div>
        </div>

        {/* CARD 3: Goldman Sachs (Live Assessment) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 font-bold rounded-2xl flex items-center justify-center text-xl shrink-0 border border-amber-100">
                GS
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-900">Goldman Sachs</h3>
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                    Super Dream
                  </span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> HackerRank Assessment Live
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Technology Analyst • Global Markets Tech • Bengaluru
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400 font-bold uppercase">OFFERED CTC</p>
                <p className="text-2xl font-black text-slate-900">₹28.5 <span className="text-xs font-bold">LPA</span></p>
              </div>
              <button className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs">
                Start Assessment (120 Mins)
              </button>
            </div>
          </div>

          <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
            <span className="text-slate-600 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Validity: <span className="font-bold text-slate-800">Valid until Nov 15, 2024 • 11:59 PM IST</span> • Sections: 2 Data Structures & Algorithms + 1 CS Core (OS/DBMS)
            </span>
            <button className="text-blue-600 font-bold hover:underline flex items-center gap-1 text-xs cursor-pointer">
              System Compatibility Check <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Two Grid Cards: Cisco Systems & Barclays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Grid Card 1: Cisco Systems */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center justify-center text-lg shrink-0">
                    CS
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Cisco Systems</h3>
                    <p className="text-xs text-slate-500">Software Engineer • Cloud & Networking</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">₹18.0 <span className="text-xs font-bold">LPA</span></p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Resume Shortlisted by Recruiter
                </span>
                <span className="text-[10px] text-slate-400">Applied Nov 01</span>
              </div>

              <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <p className="font-bold text-slate-800">
                  Next Step: <span className="font-normal text-slate-600">Mandatory Pre-Placement Talk (PPT) scheduled for </span>Nov 17, 04:30 PM <span className="font-normal text-slate-600">at Main Auditorium. Attendance linked to drive eligibility.</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button className="text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer">
                Job Description
              </button>
              <button className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer">
                Add PPT to Calendar
              </button>
            </div>
          </div>

          {/* Grid Card 2: Barclays (Archived) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center justify-center text-lg shrink-0">
                    BC
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Barclays</h3>
                    <p className="text-xs text-slate-500">Graduate Technology Analyst • Pune</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">₹14.0 <span className="text-xs font-bold">LPA</span></p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Not Shortlisted in Round 1
                </span>
                <span className="text-[10px] text-slate-400">Evaluated Oct 29</span>
              </div>

              <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">Feedback Summary: </span>
                Online Cognitive & Coding test percentile: 78.5% (Cutoff was 84.0%). Profile archived for placement cycle 2024-25. Re-application restricted for 6 months.
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">Status: Archived</span>
              <button className="text-blue-600 hover:underline text-xs font-bold cursor-pointer">
                View Detailed Scorecard
              </button>
            </div>
          </div>

        </div>

        {/* 6. University TPO Policy Mandate Footer Section */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 flex items-start gap-4 shadow-xs">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                UNIVERSITY TPO POLICY MANDATE • ONE STUDENT, ONE DREAM OFFER
              </h4>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                Statutory Rule #4.2
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Per the Central Placement Cell regulations for the 2024-2025 cohort: <span className="font-bold text-slate-900">Once an offer above ₹20.0 LPA (Dream Tier) is officially accepted via PlaceCraft</span>, your profile will automatically transition to restricted eligibility. Students with a confirmed Dream Offer may only register for and attempt <span className="font-bold text-slate-900">Super Dream roles exceeding ₹35.0 LPA</span>. Multiple active offer retentions without TPO declaration within 72 hours attract formal de-registration.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your SAP Labs offer (₹16.8 LPA) is categorized under Core FTE.</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-700">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>You retain full eligibility to contest Oracle Cloud (₹22.5 LPA) and Goldman Sachs (₹28.5 LPA).</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyApplicationView;