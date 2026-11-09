import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

const CreateDriveView = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xs">
      <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">DRIVE PROVISIONING ENGINE</span>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Configure New Corporate Campus Drive</h1>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
          STEP {currentStep} OF 4
        </span>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {["Recruiter & POC", "CTC Architecture", "Rule Eligibility", "Multi-Round Setup"].map((label, idx) => (
          <div
            key={label}
            className={`p-3 rounded-xl border text-xs font-bold transition ${
              currentStep === idx + 1
                ? "bg-blue-50 border-blue-600 text-blue-700"
                : currentStep > idx + 1
                ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                : "bg-slate-50 border-slate-200 text-slate-400"
            }`}
          >
            {idx + 1}. {label}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Company Name *</label>
            <input
              type="text"
              placeholder="e.g. Google India / Microsoft"
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Role Title *</label>
              <input
                type="text"
                placeholder="Software Engineer / Analyst"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Tier Classification *</label>
              <select className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none">
                <option>Tier 1 • Super Dream (≥ ₹20 LPA)</option>
                <option>Tier 1 • Dream (₹10 - ₹20 LPA)</option>
                <option>Mass Core (Standard CTC)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-50"
        >
          Back
        </button>
        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition"
          >
            Next Step →
          </button>
        ) : (
          <button
            onClick={() => navigate("/tpo/manage-drives")}
            className="bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition"
          >
            Deploy Drive to Student Portal
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateDriveView;