import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../utils/enums";
import { STUDENT_NAV_ITEMS, TPO_NAV_ITEMS } from "../utils/constants";
import { Menu } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const isStudent = user?.role === UserRole.STUDENT;
  const navigationItems = isStudent ? STUDENT_NAV_ITEMS : TPO_NAV_ITEMS;

  return (
    <aside
      className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col justify-between z-30 select-none ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div>
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100">
          {isExpanded && (
            <div>
              <span className="text-xl font-extrabold text-blue-600 tracking-tight">PlaceCraft</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {isStudent ? "Student Placement Portal" : "TPO Authority Portal"}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
            title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-2 flex flex-col gap-1.5 mt-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div key={item.id} className="relative group">
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  {isExpanded && (
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

                {!isExpanded && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
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