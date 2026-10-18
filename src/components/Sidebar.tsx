import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  User,
} from "lucide-react";

// Navigation Items Array inside Sidebar Component
const NAVIGATION_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard, badge: null },
  { id: "drives", label: "Job & Placement Drives", path: "/student/drives", icon: Briefcase, badge: "14 Active" },
  { id: "applications", label: "My Applications", path: "/student/applications", icon: FileText, badge: "3 In Progress" },
  { id: "profile", label: "Student Profile & Resume", path: "/student/profile", icon: User, badge: null },
  { id: "career", label: "Career Management", path: "/student/career", icon: GraduationCap, badge: null },
  { id: "learning", label: "Learning Resources", path: "/student/learning", icon: BookOpen, badge: null },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col justify-between z-30 select-none ${
        isSidebarExpanded ? "w-64" : "w-16"
      }`}
    >
      <div>
        {/* Top Header - Menu Icon Toggle */}
        <div className={`h-16 flex items-center border-b border-slate-100 ${isSidebarExpanded ? "px-3.5" : "px-2"}`}>
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="flex items-center gap-3 w-full p-2 transition-colors rounded-xl hover:bg-slate-100 font-bold cursor-pointer outline-none"
            title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-blue-700 transition-colors">
              <Menu className="w-5.5 h-5.5" />
            </div>

            {isSidebarExpanded && (
              <span className="text-lg font-extrabold tracking-tight text-slate-900 transition-opacity duration-200">
                PlaceCraft
              </span>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 flex flex-col gap-1.5 mt-2">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  {isSidebarExpanded && (
                    <div className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>

                {/* Tooltip on Collapsed State */}
                {!isSidebarExpanded && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.4 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;