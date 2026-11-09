import React, { useState } from "react";
import { Search, CheckCircle2, ShieldCheck, FileText, Lock, X } from "lucide-react";

const StudentApprovalView = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Students Management &amp; Candidate Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">Verify academic records, manage ATS resumes, and issue TPO clearances.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition">
            Export Master (XLSX)
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
            Attestation Queue (48)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Table List */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search student by name or PRN..."
                className="w-full text-xs bg-slate-100 pl-9 pr-3 py-2 rounded-lg outline-none"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">Showing 1-5 of 1,424</span>
          </div>

          <div className="space-y-3">
            {/* Student Row Card 1 */}
            <div
              onClick={() => setSelectedCandidate(1)}
              className={`p-4 rounded-xl border transition cursor-pointer flex justify-between items-center ${
                selectedCandidate === 1 ? "border-blue-500 bg-blue-50/30" : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  AS
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Arjun Sharma</p>
                  <p className="text-xs text-slate-500">PRN: 21BCE1042 • CSE-A • Sem 7</p>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="font-bold text-slate-900">CGPA: 8.84</span>
                <span className="block text-emerald-600 font-semibold">Clean (0 Backlogs)</span>
              </div>

              <div className="text-right text-xs">
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                  OFFERED: SAP Labs
                </span>
                <span className="block text-slate-400 text-[10px] mt-0.5">16.8 LPA • Dream Tier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Candidate Attestation Drawer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              ACTIVE SELECTION
            </span>
            <span className="text-xs font-bold text-slate-400">PRN: 21BCE1042</span>
          </div>

          <div className="text-center py-2">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto">
              AS
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-2">Arjun Sharma</h3>
            <p className="text-xs text-slate-500">arjun.sharma@placecraft.edu.in</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between font-bold text-slate-700">
              <span>PLACEMENT POLICY COMPLIANCE</span>
              <span className="text-emerald-600">Compliant (100%)</span>
            </div>
            <p className="text-[11px] text-slate-500">✓ Minimum 75% Attendance: 88.4%</p>
            <p className="text-[11px] text-slate-500">✓ Zero Active Backlogs Verified</p>
            <p className="text-[11px] text-emerald-700 font-bold">✓ Eligible for &gt;25 LPA Super Dream</p>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-xs cursor-pointer">
              Issue Official TPO Endorsement
            </button>
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition cursor-pointer">
              Full Dossier &amp; Resume PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApprovalView;