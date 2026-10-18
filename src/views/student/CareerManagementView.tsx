import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Download,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Normalized JSON structure for easy future Backend / API Integration
const CAREER_DATA = {
  targetProfile: {
    role: "Full Stack Cloud Engineer",
    packageRange: "₹24L – ₹45L",
    category: "Super Dream Category",
    goalMatchPercent: 76,
    liveOpenDrives: 8,
    shortlistProb: "96%",
    atsBaselineScore: 94,
    cgpa: "8.84",
  },
  acquiredSkills: [
    { name: "Data Structures & Algorithms", level: "Expert", detail: "Score: 94% on Codility / HackerRank" },
    { name: "Core Java & Spring Boot", level: "Proficient", detail: "Verified via Semester 5 Capstone" },
    { name: "Modern React & TypeScript", level: "Proficient", detail: "Production app deployed • Component score 86%" },
    { name: "PostgreSQL & Relational DBs", level: "Proficient", detail: "Academic Grade: 9.1 CGPA in DBMS" },
    { name: "REST APIs & Microservices", level: "Competent", detail: "API security & contract testing validated" },
  ],
  skillGaps: [
    { name: "System Design (HLD & LLD)", priority: "Urgent", risk: "Tier 1 Risk", desc: "Mandatory for Google, Atlassian, Oracle Cloud" },
    { name: "Kubernetes & Container Orchestration", priority: "High", risk: "High", desc: "Needs production Helm/K8s deployment artifact" },
    { name: "gRPC & Message Queues (Kafka)", priority: "Medium", risk: "Medium", desc: "Required for async microservices at Goldman Sachs" },
    { name: "Distributed Caching (Redis)", priority: "Moderate", risk: "Moderate", desc: "Cache invalidation policies & write-through evaluation" },
  ],
  aiSprintTasks: [
    {
      id: 1,
      title: "Bridge System Design Gap",
      desc: "Your Oracle Cloud interview is in 5 days. Complete 2-week sprint on High-Level Microservice partitioning.",
      matchBoost: "+14% Target Match",
      actionText: "Start Sprint",
    },
    {
      id: 2,
      title: "Dockerize Semester 6 Project",
      desc: "Add multi-stage Dockerfile and Docker Compose setup to your Capstone repo.",
      matchBoost: "+8% Target Match",
      actionText: "View Quick Guide",
    },
  ],
  companyBenchmarks: [
    { company: "Microsoft", role: "Software Development Engineer • ₹44.5L", score: 88, stage: "OA Cleared", gap: "Needs System Design Review (LLD)", action: "View Requirements" },
    { company: "Oracle Cloud (OCI)", role: "Cloud Infrastructure Engineer • ₹36.0L", score: 92, stage: "Tech Round 1 Scheduled", gap: "Distributed storage & Raft consensus basics", action: "Prep Checklist" },
    { company: "Goldman Sachs", role: "Engineering Analyst • ₹32.0L", score: 81, stage: "Aptitude & Math Cleared", gap: "Needs C++ / Low-latency concurrency review", action: "View Requirements" },
    { company: "Atlassian", role: "Software Engineer • ₹48.0L", score: 74, stage: "OA Window: 24 Oct", gap: "Needs System Design & Kafka Event-Driven Architecture", action: "View Requirements" },
  ],
};

const CareerManagementView = () => {
  const navigate = useNavigate();
  const [data] = useState(CAREER_DATA);

  return (
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      
      {/* 1. Page Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            PLACEMENT READINESS INTELLIGENCE • Live Audit Synced
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            Career Pathways & Skill Gap Analysis
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Set your target placement ambition, benchmark against hiring criteria for top tier tech firms, and bridge critical skill gaps.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
            <Download className="w-4 h-4 text-slate-500" /> Download Gap Audit
          </button>
          <button
            onClick={() => navigate("/student/learning")}
            className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4" /> Explore Learning Resources
          </button>
        </div>
      </div>

      {/* 2. Target Goal Banner Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
        
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
              ACTIVE GOAL PROFILE
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
              {data.targetProfile.category}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900">
              {data.targetProfile.role}{" "}
              <span className="text-blue-600">{data.targetProfile.packageRange}</span>
            </h1>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">LIVE OPEN DRIVES</span>
              <p className="text-lg font-black text-slate-900 mt-0.5">
                {data.targetProfile.liveOpenDrives} <span className="text-xs font-normal text-emerald-600">Active now</span>
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">SHORTLIST PROB.</span>
              <p className="text-lg font-black text-emerald-600 mt-0.5">{data.targetProfile.shortlistProb}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">ATS BASELINE SCORE</span>
              <p className="text-lg font-black text-slate-900 mt-0.5">{data.targetProfile.atsBaselineScore} / 100</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">ACADEMIC CLEARANCE</span>
              <p className="text-lg font-black text-blue-600 mt-0.5">{data.targetProfile.cgpa} CGPA</p>
            </div>
          </div>
        </div>

        {/* Goal Match Circular Donut */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 flex items-center gap-5 shrink-0 w-full lg:w-auto">
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="#cbd5e1" strokeWidth="6" fill="transparent" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#2563eb"
                strokeWidth="6"
                strokeDasharray="201"
                strokeDashoffset={201 - (201 * data.targetProfile.goalMatchPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-lg font-black text-blue-700">
              {data.targetProfile.goalMatchPercent}%
            </span>
          </div>

          <div className="space-y-1">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              High Competency
            </span>
            <p className="text-xs font-bold text-slate-900 mt-1">
              Satisfies 11 of 14 hiring criteria
            </p>
            <p className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline flex items-center gap-1">
              3 Critical gaps detected <ChevronRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </div>

      {/* 3. Three-Column Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Acquired Skills */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Acquired Skills</h3>
            </div>
            <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md">
              OA Vetted
            </span>
          </div>

          <div className="space-y-3">
            {data.acquiredSkills.map((skill, idx) => (
              <div key={idx} className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded">
                    {skill.level}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{skill.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Critical Skill Gaps */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Critical Skill Gaps</h3>
            </div>
            <span className="text-[10px] font-extrabold bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-md uppercase">
              Tier 1 Risk
            </span>
          </div>

          <div className="space-y-3">
            {data.skillGaps.map((gap, idx) => (
              <div key={idx} className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">{gap.name}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.2 rounded uppercase ${
                    gap.priority === "Urgent" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                  }`}>
                    {gap.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{gap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: AI Career Recommendations */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">AI Career Advisor</h3>
            </div>
            <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md">
              Targeted Sprints
            </span>
          </div>

          <div className="space-y-3">
            {data.aiSprintTasks.map((task) => (
              <div key={task.id} className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {task.id}
                  </span>
                  <p className="text-xs font-bold text-slate-900">{task.title}</p>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">{task.desc}</p>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {task.matchBoost}
                  </span>
                  <button
                    onClick={() => navigate("/student/learning")}
                    className="bg-[#2563eb] hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    {task.actionText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Company Hiring Benchmark Matrix Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Company Hiring Benchmark Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed comparison of your candidate credentials against real-time qualifying criteria for visiting recruiters.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
            Drive Window: Oct 2024
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 uppercase text-[10px] font-extrabold tracking-wider">
                <th className="p-3">COMPANY & ROLE</th>
                <th className="p-3">READINESS SCORE</th>
                <th className="p-3">PIPELINE STAGE</th>
                <th className="p-3">CRITICAL SHORTFALL</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {data.companyBenchmarks.map((bm, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{bm.company}</p>
                    <p className="text-[11px] text-slate-500">{bm.role}</p>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-blue-700">{bm.score}%</span>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${bm.score}%` }}
                          className="bg-blue-600 h-full rounded-full"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                      {bm.stage}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-[11px]">{bm.gap}</td>
                  <td className="p-3 text-right">
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer">
                      {bm.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Bottom CTA Banner */}
      <div className="bg-[#2563eb] rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-blue-800/60 px-2.5 py-0.5 rounded-md">
            PERSONALIZED LEARNING ROADMAP
          </span>
          <h3 className="text-xl font-bold">Ready to turn that 76% Match into 95%+?</h3>
          <p className="text-xs text-blue-100">
            Access curated mock interviews, System Design cheatsheets, curated Codility problem sets, and faculty-approved project boilerplate repositories.
          </p>
        </div>

        <button
          onClick={() => navigate("/student/learning")}
          className="bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm shrink-0 flex items-center gap-1.5"
        >
          Explore Tailored Learning Resources <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default CareerManagementView;