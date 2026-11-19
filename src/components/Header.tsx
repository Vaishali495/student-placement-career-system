import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, HelpCircle, LogOut, Search } from "lucide-react";
import PlaceCraftLogo from "../assets/PlaceCraft-logo.png";
import VerifiedIcon from "../assets/verified-icon.png";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../utils/enums";
import QuickSupportModal from "./student/QuickSupportModal";
import { getInitials } from "../utils/helpers";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="w-full h-16 flex justify-between items-center bg-white border-b border-slate-200 px-6 shrink-0 z-30">
        {/* Left Section: Logo & Badge */}
        <div className="flex items-center gap-4">
          <div className="w-36 flex items-center">
            <img className="w-full h-auto object-contain" src={PlaceCraftLogo} alt="PlaceCraft Logo" />
          </div>

          {isAuthenticated ? (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {user?.role === UserRole.STUDENT
                ? "2025-2026 PLACEMENT SESSION • ACTIVE"
                : "2025-2026 PLACEMENT SESSION • TPO Command Center"}
            </span>
          ) : (
            <div className="flex items-center bg-[#eff4ff] rounded-full px-2.5 py-1 gap-1">
              <img className="w-3.5 h-3.5 object-contain" src={VerifiedIcon} alt="Verified Icon" />
              <p className="text-[10px] tracking-widest font-medium">Institutional Trust Tier-1</p>
            </div>
          )}
        </div>

        {/* Right Section: Authenticated Controls vs Quick Support */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search companies, roles..."
                className="w-full bg-slate-100 text-sm pl-9 pr-4 py-1.5 rounded-lg border-none outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <button type="button" className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile Menu Dropdown */}
            <div ref={profileMenuRef} className="relative border-l pl-4 border-slate-200">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold leading-tight">{user?.name || "User Account"}</p>
                  <p className="text-xs text-slate-500 capitalize">
                    {user?.role === UserRole.STUDENT
                      ? `${user.course || "Student"}${user.rollNumber ? ` • ${user.rollNumber}` : ""}`
                      : `${user?.designation || "TPO Officer"}${user?.organization ? ` • ${user.organization}` : ""}`}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm select-none">
                  {getInitials(user?.name)}
                </div>
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsSupportOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer bg-blue-50 hover:bg-blue-100 text-[#2563eb] border border-blue-200 shadow-xs"
          >
            <HelpCircle className="w-4 h-4 text-[#2563eb]" />
            <span>Quick Support</span>
          </button>
        )}
      </header>

      <QuickSupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
};

export default Header;