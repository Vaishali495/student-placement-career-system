import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Briefcase, FileText, GraduationCap, LayoutDashboard, Menu, PlusCircle, User, Users } from "lucide-react";
import { UserRole } from "../types/auth";

// Navigation Items Array inside Sidebar Component
const STUDENT_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard, badge: null },
  { id: "drives", label: "Job & Placement Drives", path: "/student/drives", icon: Briefcase, badge: "14 Active" },
  { id: "applications", label: "My Applications", path: "/student/applications", icon: FileText, badge: "3 In Progress" },
  { id: "profile", label: "Student Profile & Resume", path: "/student/profile", icon: User, badge: null },
  { id: "career", label: "Career Management", path: "/student/career", icon: GraduationCap, badge: null },
  { id: "learning", label: "Learning Resources", path: "/student/learning", icon: BookOpen, badge: null },
];

const TPO_NAV_ITEMS = [
  {
    id: "tpo-dashboard",
    label: "TPO Overview",
    path: "/tpo/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    id: "create-drive",
    label: "Create Drives",
    path: "/tpo/create-drive",
    icon: PlusCircle,
    badge: null,
  },
  {
    id: "manage-drives",
    label: "Manage Drives",
    path: "/tpo/manage-drives",
    icon: Briefcase,
    badge: "8 Live",
  },
  {
    id: "student-approval",
    label: "Students Approval",
    path: "/tpo/student-approvals",
    icon: Users,
    badge: "1.2k Total",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState({ role: UserRole.STUDENT });
  const navigationItems = user?.role === UserRole.STUDENT ? STUDENT_NAV_ITEMS : TPO_NAV_ITEMS;

  return (
    <aside
      className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col justify-between z-30 select-none ${
        isCollapsed ? "w-64" : "w-16"
      }`}>
      <div>
        {/* Top Header - Menu Icon Toggle */}
        <div className={`flex h-16 items-center justify-between px-4  border-b border-slate-100`}>
          {isCollapsed && (
            <div>
              <span className="text-xl font-extrabold text-blue-600 tracking-tight">PlaceCraft</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {user.role === UserRole.STUDENT ? "Student Placement Portal" : "TPO Authority Portal"}
              </span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
            title={isCollapsed ? "Collapse Sidebar" : "Expand Sidebar"}>
            <Menu className="w-5 h-5" />
            {/* {isCollapsed && (
              <span className="text-lg font-extrabold tracking-tight text-slate-900 transition-opacity duration-200">PlaceCraft</span>
            )} */}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 flex flex-col gap-1.5 mt-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}>
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  {isCollapsed && (
                    <div className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap">
                      <span className="truncate">{item.label}</span>
                      {item.badge && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{item.badge}</span>}
                    </div>
                  )}
                </button>

                {/* Tooltip on Collapsed State */}
                {!isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.4 rounded-full font-bold">{item.badge}</span>}
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
