import React, { useMemo, useState } from "react";
import {
  BookOpen,
  ExternalLink,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type ResourceCategory = "all" | "dsa" | "system-design" | "core-cs" | "interview";

interface LearningResourceItem {
  id: string;
  category: Exclude<ResourceCategory, "all">;
  categoryLabel: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
}

const LEARNING_RESOURCES: LearningResourceItem[] = [
  {
    id: "dsa-1",
    category: "dsa",
    categoryLabel: "DSA & Coding",
    title: "Data Structures & Algorithms Patterns",
    description: "Core problem-solving patterns for arrays, trees, graphs, dynamic programming, and online assessments.",
    tags: ["Arrays", "Trees & Graphs", "DP"],
    url: "https://neetcode.io/roadmap",
  },
  {
    id: "sd-1",
    category: "system-design",
    categoryLabel: "System Design",
    title: "System Design Fundamentals",
    description: "Beginner-friendly guide to load balancers, caching, databases, queues, and scaling web apps.",
    tags: ["Caching", "Databases", "Scalability"],
    url: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "cs-1",
    category: "core-cs",
    categoryLabel: "Core CS",
    title: "Operating Systems, DBMS & Networks Notes",
    description: "Quick revision concepts for processes, threads, SQL indexing, normalization, and HTTP/TCP.",
    tags: ["OS", "DBMS", "Networking"],
    url: "https://roadmap.sh/computer-science",
  },
  {
    id: "int-1",
    category: "interview",
    categoryLabel: "Interview Prep",
    title: "Full Stack & Technical Interview Guide",
    description: "Common questions on JavaScript, TypeScript, React, REST APIs, and project walkthroughs.",
    tags: ["JavaScript", "React", "APIs"],
    url: "https://roadmap.sh/full-stack",
  },
];

const FILTER_TABS: Array<{ id: ResourceCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "dsa", label: "DSA & Coding" },
  { id: "system-design", label: "System Design" },
  { id: "core-cs", label: "Core CS" },
  { id: "interview", label: "Interview Prep" },
];

const LearningResourcesView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ResourceCategory>("all");

  const visibleResources = useMemo(() => {
    if (activeTab === "all") return LEARNING_RESOURCES;
    return LEARNING_RESOURCES.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            STUDY MATERIAL & REFERENCE LINKS
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            Learning Resources
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Simple reference guides to help you prepare for coding rounds and interviews.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/career")}
          className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Compass className="w-4 h-4 text-blue-600" /> Career & Skill Check
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#2563eb] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleResources.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                  {item.categoryLabel}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                {item.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5"
              >
                Open Resource <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningResourcesView;