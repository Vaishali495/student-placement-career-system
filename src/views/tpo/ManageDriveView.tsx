import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";

const ManageDriveView = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Companies &amp; Placement Drives Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure recruitment partners, mandate eligibility gates, and synchronize rounds.</p>
        </div>
        <button
          onClick={() => navigate("/tpo/create-drive")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
        >
          + Add New Company / Drive
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2 items-center flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search company name, drive code (#PC-...), or tech stack..."
            className="w-full text-xs bg-slate-100 p-2 rounded-lg outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-100 text-xs font-bold px-3 py-2 rounded-lg outline-none">
            <option>All Categories</option>
            <option>Super Dream</option>
            <option>Dream</option>
          </select>
          <select className="bg-slate-100 text-xs font-bold px-3 py-2 rounded-lg outline-none">
            <option>Status: All Active</option>
            <option>Live Pipeline</option>
            <option>Concluded</option>
          </select>
        </div>
      </div>

      {/* Drives Cards Grid */}
      <div className="space-y-4">
        {/* Drive Card 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-blue-300 transition">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-black flex items-center justify-center text-lg">
                MS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">Microsoft Corporation</h3>
                  <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Tier-1 Super Dream
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">#PC-2025-012</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Software Development Engineer (Azure Core &amp; Distributed Systems)</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-slate-900">₹44.0 <span className="text-xs font-bold">LPA</span></span>
              <p className="text-[11px] text-slate-400">Base ₹18L + RSUs ₹22L + Bonus</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 my-4 p-3 bg-slate-50 rounded-xl text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">CGPA CUTOFF</span>
              <span className="font-bold text-slate-800">CGPA ≥ 8.5</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">BACKLOG RULE</span>
              <span className="font-bold text-emerald-700">0 Active Backlogs</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">ELIGIBLE BRANCHES</span>
              <span className="font-bold text-slate-800">B.Tech CSE / IT / ECE</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold">INTERVIEW LOCATION</span>
              <span className="font-bold text-slate-800">Hyderabad / Bangalore IDC</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
              Round 3: Technical Whiteboard &amp; Concurrency Panel • 42 Shortlisted of 182 Applicants
            </span>

            <div className="flex gap-2">
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition">
                Drive Settings
              </button>
              <button
                onClick={() => navigate("/tpo/student-approvals")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                Manage Candidates (42)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDriveView;