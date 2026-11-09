import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Clock,
  ChevronRight,
  ExternalLink,
  Zap,
  BarChart3
} from "lucide-react";

const TpoDashboardView = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Heading */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            ACADEMIC COHORT 2024-2025 • CENTRAL TPO COMMAND ACTIVE
          </p>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Placement Officer Command Center</h1>
        </div>
        <button
          onClick={() => navigate("/tpo/create-drive")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
        >
          + Create Placement Drive
        </button>
      </div>

      {/* 4 Core KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">REGISTERED BATCH</span>
          <p className="text-3xl font-black text-slate-900 mt-1">1,424</p>
          <span className="text-xs text-blue-600 font-semibold mt-1 block">98.2% ERP Verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">PARTNER CORPORATE SUITE</span>
          <p className="text-3xl font-black text-slate-900 mt-1">38 <span className="text-xs font-normal text-slate-500">Active Partners</span></p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">14 Drives Live Now</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">COHORT CLEARANCE</span>
          <p className="text-3xl font-black text-emerald-600 mt-1">78.4%</p>
          <span className="text-xs text-emerald-700 font-bold mt-1 block">+12.6% YoY Growth</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">COMPENSATION SPREAD</span>
          <p className="text-3xl font-black text-blue-700 mt-1">₹14.8 <span className="text-sm font-bold">LPA Avg</span></p>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Highest Package: ₹52.0 LPA</span>
        </div>
      </div>

      {/* Main Section: Operations + Urgent Actions Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Active Operations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
            <h2 className="text-sm font-bold text-slate-900">Active &amp; Upcoming Drives Operations</h2>
            <div className="flex gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">All Active (14)</span>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">OA Ongoing (4)</span>
            </div>
          </div>

          {/* Operation Drive Card 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded uppercase">TIER-1 SUPER DREAM</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Microsoft Corporation</h3>
                <p className="text-xs text-slate-500">Software Development Engineer (Core Cloud Platform)</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">₹44.0 <span className="text-xs font-bold">LPA</span></span>
                <p className="text-[11px] text-slate-400">Portal Close: Today, 04:00 PM</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">APPLICANTS</span>
                <span className="font-bold text-slate-800">182 Eligible Candidates</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CURRENT STAGE</span>
                <span className="font-bold text-blue-600">Round 3 Technical</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CUTOFF RULE</span>
                <span className="font-bold text-emerald-700">CGPA ≥ 8.5 (No Backlogs)</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500 font-mono">Coordinator: Prof. S. Sen</span>
              <button
                onClick={() => navigate("/tpo/manage-drives")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
              >
                Manage Shortlist (42)
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Urgent Queue & Toolkit */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Urgent Actions Queue
              </h3>
              <span className="text-[10px] bg-red-100 text-red-700 font-extrabold px-2 py-0.5 rounded-full">2 High Priority</span>
            </div>

            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-red-700">
                <span>POLICY EXCEPTION FLAG</span>
                <span>12m ago</span>
              </div>
              <p className="font-bold text-slate-800">Multiple Dream Offers Holding Conflict</p>
              <p className="text-[11px] text-slate-600">
                Candidate Aryan Mehta holds active offer with Amazon and accepted Microsoft interview slot.
              </p>
            </div>

            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-amber-800">
                <span>SLOT APPROVAL REQUIRED</span>
                <span>45m ago</span>
              </div>
              <p className="font-bold text-slate-800">Adobe Systems Pre-Placement Talk</p>
              <p className="text-[11px] text-slate-600">Requesting Central Auditorium for Nov 18 (Capacity: 450).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpoDashboardView;