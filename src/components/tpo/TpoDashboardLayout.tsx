import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Award,
  Settings,
  PlusCircle,
  FileSpreadsheet,
  Bell,
  Search,
  Menu,
  LifeBuoy
} from "lucide-react";
import Header from "../Header";
import Sidebar from "../Sidebar";

const TPO_NAV_ITEMS = [
  { label: "TPO Dashboard", path: "/tpo/dashboard", icon: LayoutDashboard },
  { label: "Companies & Drives", path: "/tpo/manage-drives", icon: Building2 },
  { label: "Students Management", path: "/tpo/student-approvals", icon: Users },
  { label: "Career Roles & Skill Matrix", path: "/tpo/career-matrix", icon: Award },
  { label: "Settings & Access", path: "/tpo/settings", icon: Settings }
];

const TpoDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8f9ff] text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Unified Top Header */}
        <Header />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8f9ff]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TpoDashboardLayout;