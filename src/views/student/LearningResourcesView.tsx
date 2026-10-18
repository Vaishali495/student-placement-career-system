import React, { useState } from "react";
import {
  BookOpen,
  Terminal,
  Bookmark,
  Play,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  Calendar,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Download,
  Video,
  Layers,
  ChevronRight,
  Check,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Clean JSON structure for easy API / Backend integration
const RESOURCES_DATA = {
  sprint: {
    title: "Active 14-Day Sprint: High-Level System Design for Tier-1 Super Dream Drives",
    currentModule: "Designing Distributed Rate Limiters & Cache Invalidation Patterns",
    moduleNote: "Token Bucket vs Leaky Bucket • Redis Cluster Failover • 35 min read",
    progressPercent: 42,
    completedModules: "6 / 14 modules",
    currentModuleNum: 7,
    streak: "5-Day Study Streak",
  },
  roleMatch: {
    percent: 78,
    targetRole: "Full Stack Cloud Engineer",
    missingGaps: "System Architecture and Kubernetes",
  },
  resourcesList: [
    {
      id: 1,
      badge: "ADVANCED HLD",
      subBadge: "TPO VERIFIED",
      title: "System Design Placement Primer 2025",
      desc: "Comprehensive HLD notes, scalable architecture blueprints, and deep-dive case studies covering System Design concepts.",
      tags: ["Horizontal Scaling", "CAP Theorem", "Consistent Hashing", "Kafka Event Queues"],
      duration: "12 Hrs • PDF & Video",
      actionText: "Start Track",
    },
    {
      id: 2,
      badge: "CODE RUNNER READY",
      subBadge: "Updated Nov 2024",
      title: "Company-Wise Past Coding & OA Question Bank",
      desc: "250+ real campus questions asked in Microsoft, Google, Goldman Sachs, Amazon, and Atlassian.",
      tags: ["Microsoft (38)", "Amazon (52)", "Google (29)", "Goldman Sachs (24)"],
      duration: "250+ Problems • Real OA",
      actionText: "Launch Interactive Runner",
    },
    {
      id: 3,
      badge: "DEVOPS & CLOUD LAB",
      subBadge: "CRITICAL ROLE",
      title: "Hands-on Docker & Kubernetes for College Grads",
      desc: "Practical laboratory track to containerize full-stack React/Node apps, manage multi-pod ingress with K8s.",
      tags: ["Lab Progress: 3 of 6 completed", "Includes Pre-configured DevContainer"],
      duration: "18 hrs total effort",
      actionText: "Open Lab 4",
    },
    {
      id: 4,
      badge: "CAMPUS CLEARANCE ESSENTIAL",
      subBadge: "CORE CS",
      title: "Core CS Fundamentals Revision Dossier",
      desc: "Curated high-yield cheat sheets for Operating Systems (paging, virtual memory), DBMS, and Computer Networks.",
      tags: ["Process Scheduling", "SQL vs NoSQL Engine Internals", "HTTP/2 vs HTTP/3 (QUIC)"],
      duration: "Read time: 4.5 hrs",
      actionText: "Download Dossier",
    },
    {
      id: 5,
      badge: "PANEL SIMULATOR",
      subBadge: "1-on-1 Feedback Loop",
      title: "Mock Technical Interview Simulator & MS Teams Panel Records",
      desc: "Simulated AI mock interviews with voice analysis plus recorded technical mock sessions from alumni.",
      tags: ["Data Structures Round", "Live Whiteboard & Architecture", "STAR Method HR Evaluation"],
      duration: "18 Recorded Debriefs",
      actionText: "Book Practice Slot",
    },
  ],
  webinars: [
    {
      id: 1,
      time: "Tomorrow, 6:00 PM • 90 Mins",
      title: "How to Ace Goldman Sachs Technical Round",
      speaker: "Alum Rahul Verma (SDE-2 at Goldman Sachs, Class of '22). Focus: Math, Caches, & Dynamic Programming.",
      registeredCount: 142,
      isLiveSoon: true,
    },
    {
      id: 2,
      time: "Saturday, 11:00 AM • Mandatory",
      title: "TPO Special: Behavioral & HR Round Dos and Don'ts",
      speaker: "Led by Prof. K. Sridhar (Head of Placements) & guest HR Director. Live mock questions and etiquette briefing.",
      isMandatory: true,
    },
  ],
  checklists: [
    { title: "AWS Cloud Practitioner (CLF-C02)", note: "Target voucher available with 50% university rebate.", status: "Completed & Uploaded", isDone: true },
    { title: "LeetCode Blind 75 Essentials", note: "Core DSA pattern recognition list for tech interviews.", status: "58 / 75 Solved (77%)", isDone: false },
    { title: "Designing Data-Intensive Applications", note: "By Martin Kleppmann (Chapters 1, 3, 5, 7 required reading).", status: "Reading in progress", isDone: false },
  ],
};

const LearningResourcesView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            PREPARATION MATRIX • Cohort 2025 Tier-1 Dream Track
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.2 rounded">
              Verified Syllabus
            </span>
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            Placement Learning & Preparation Hub
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Curated study materials, coding mock tracks, company interview archives, and skill development roadmaps tailored to your target role:{" "}
            <span className="font-bold text-blue-700">Full Stack Cloud Engineer</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
            <Bookmark className="w-4 h-4 text-blue-600" /> Saved Modules (14)
          </button>
          <button className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
            <Terminal className="w-4 h-4" /> Launch Mock Terminal
          </button>
        </div>
      </div>

      {/* 2. Active 14-Day Sprint Banner Widget */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row items-stretch justify-between gap-6">
        
        {/* Left Sprint Info */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> SPRINT IN PROGRESS
              </span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                ⚡ {RESOURCES_DATA.sprint.streak}
              </span>
              <span className="text-xs text-slate-400 font-medium">Ends in 8 days</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">{RESOURCES_DATA.sprint.title}</h3>
            
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 fill-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  <span className="text-blue-600 uppercase text-[10px] block font-extrabold">NEXT UP TODAY:</span>
                  {RESOURCES_DATA.sprint.currentModule}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{RESOURCES_DATA.sprint.moduleNote}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5">
              Resume Practice (Module {RESOURCES_DATA.sprint.currentModuleNum}) <ChevronRight className="w-4 h-4" />
            </button>
            <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
              Take Daily 20-min Quiz
            </button>
          </div>
        </div>

        {/* Right Sprint Pace Tracker */}
        <div className="w-full lg:w-[360px] bg-slate-50/80 border border-slate-100 rounded-2xl p-5 shrink-0 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OVERALL PACE</span>
              <span className="text-2xl font-black text-slate-900">{RESOURCES_DATA.sprint.progressPercent}%</span>
              <span className="text-xs text-emerald-600 font-bold ml-1.5">On Schedule</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">COMPLETED</span>
              <span className="text-xs font-extrabold text-blue-700">{RESOURCES_DATA.sprint.completedModules}</span>
            </div>
          </div>

          {/* Module Days Grid */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>Kickoff (Day 1)</span>
              <span>Mid-Review (Day 7)</span>
              <span>Final Mock (Day 14)</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`py-1.5 rounded-lg text-center text-xs font-bold ${
                    day <= 6
                      ? "bg-emerald-600 text-white"
                      : day === 7
                      ? "bg-blue-600 text-white ring-2 ring-blue-200"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  ✓{day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {[8, 9, 10, 11, 12, 13, 14].map((day) => (
                <div key={day} className="py-1.5 rounded-lg text-center text-xs font-bold bg-slate-200 text-slate-500">
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Resource Filters Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "All Resources" },
            { id: "role", label: "Target Role Prep (Full Stack Cloud)" },
            { id: "packs", label: "Company Interview Packs" },
            { id: "dsa", label: "System Design & DSA" },
            { id: "tests", label: "TPO Mock Tests & Archives" },
            { id: "soft", label: "Aptitude & Soft Skills" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-slate-400 pr-3">Showing: 5 Recommended Tracks</span>
      </div>

      {/* 4. Main Split Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2/3 Width): Course Modules List */}
        <div className="lg:col-span-2 space-y-4">
          {RESOURCES_DATA.resourcesList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                    {item.badge}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {item.subBadge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Column */}
              <div className="flex sm:flex-col justify-between sm:justify-end items-end gap-3 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="text-[11px] font-bold text-slate-400">{item.duration}</span>
                <button className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer">
                  {item.actionText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (1/3 Width): Widgets Stack */}
        <div className="space-y-6">
          
          {/* Widget 1: Personalized Readiness Card */}
          <div className="bg-[#2563eb] text-white rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-800/80 px-2.5 py-0.5 rounded-md">
                PERSONALIZED READINESS
              </span>
            </div>

            <div>
              <p className="text-2xl font-black">Role Skill Match: {RESOURCES_DATA.roleMatch.percent}%</p>
              <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                Your profile matches 9 of 12 critical skills for <span className="font-bold text-white">{RESOURCES_DATA.roleMatch.targetRole}</span>. Close the remaining gaps in {RESOURCES_DATA.roleMatch.missingGaps}.
              </p>
            </div>

            <button
              onClick={() => navigate("/student/career")}
              className="w-full bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Check Skill Gap in Career Management
            </button>
          </div>

          {/* Widget 2: Campus Webinars & Masterclasses */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-blue-600" /> Campus Webinars & Masterclasses
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                LIVE SLOTS
              </span>
            </div>

            <div className="space-y-3">
              {RESOURCES_DATA.webinars.map((web) => (
                <div key={web.id} className="bg-slate-50/80 border border-slate-100 p-3.5 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {web.time}
                  </span>
                  <p className="text-xs font-bold text-slate-900">{web.title}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{web.speaker}</p>

                  <div className="pt-1 flex justify-between items-center">
                    {web.registeredCount && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {web.registeredCount} Students Registered
                      </span>
                    )}
                    <button className="bg-[#2563eb] text-white text-[10px] font-bold px-3 py-1 rounded-lg ml-auto cursor-pointer">
                      RSVP Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 3: Recommended External Checklists */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Recommended External Checklists</h3>

            <div className="space-y-3">
              {RESOURCES_DATA.checklists.map((chk, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex items-start gap-2.5">
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center text-white shrink-0 ${
                    chk.isDone ? "bg-emerald-600" : "border border-slate-300 bg-white"
                  }`}>
                    {chk.isDone && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{chk.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{chk.note}</p>
                    <span className={`text-[10px] font-bold mt-1 inline-block ${
                      chk.isDone ? "text-emerald-700" : "text-blue-600"
                    }`}>
                      {chk.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LearningResourcesView;