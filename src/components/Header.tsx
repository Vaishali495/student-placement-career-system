import { useState } from "react";
import PlaceCraftLogo from "../assets/PlaceCraft-logo.png";
import VerifiedIcon from "../assets/verified-icon.png";
import { Bell, ChevronRight, HelpCircle, KeyRound, LogOut, Mail, MapPin, Phone, Search, ShieldAlert, UserCheck, X } from "lucide-react";
import { UserRole } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Helper function to extract user initials (e.g. "Arjun Sharma" -> "AS")
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const loginFaqs = [
    {
      icon: KeyRound,
      question: "Forgot Passcode or Password?",
      answer:
        "Use the 'Forgot Password?' link on the login form. An OTP or password reset link will be sent to your registered institutional email (@campus.edu).",
    },
    {
      icon: UserCheck,
      question: "Roll Number / Institutional Email Not Recognized?",
      answer:
        "Ensure you are entering your complete roll number without dashes or your official university seat email. First-year or lateral entry students must be verified by the TPO cell before first login.",
    },
    {
      icon: ShieldAlert,
      question: "Account Locked or 'Session Unauthorized' Error?",
      answer:
        "Accounts automatically lock for 15 minutes after 5 consecutive failed authentication attempts in compliance with campus security policy.",
    },
  ];

  return (
    <>
      <header className="w-full h-16 flex justify-between items-center bg-white shadow-sm px-6">
        {/* Left Section: Logo & Badge */}
        <div className="flex items-center gap-4">
          <div className="w-36 flex items-center">
            <img className="w-full h-auto object-contain" src={PlaceCraftLogo} alt="PlaceCraft Logo" />
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {user?.role === UserRole.STUDENT ? "2025-2026 PLACEMENT SESSION • ACTIVE" : "2025-2026 PLACEMENT SESSION • TPO Command Center"}
              </span>
            </div>
          ) : (
            <div className="flex items-center bg-[#eff4ff] rounded-full px-2.5 py-1 gap-1">
              <img className="w-3.5 h-3.5 object-contain" src={VerifiedIcon} alt="Verified Icon" />
              <p className="text-[10px] tracking-widest font-medium">Institutional Trust Tier-1</p>
            </div>
          )}
        </div>

        {/* Right Section: Buttons */}
        {isAuthenticated ? (
          <div>
            {/* Search Bar & User Controls */}
            <div className="flex items-center gap-4">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search companies, roles..."
                  className="w-full bg-slate-100 text-sm pl-9 pr-4 py-1.5 rounded-lg border-none outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>

              <button className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Avatar */}
              {/* <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold leading-tight">Arjun Sharma</p>
                  <p className="text-xs text-slate-500">CSE • Sem 7 | CGPA 8.84</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">AS</div>
              </div> */}

              {/* Profile Menu Dropdown */}
              <div className="relative border-l pl-4 border-slate-200">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold leading-tight">{user?.name || "User Account"}</p>
                    <p className="text-xs text-slate-500 capitalize">
                      {user?.role === UserRole.STUDENT
                        ? `${user.course || "Student"} ${user.rollNumber ? `• ${user.rollNumber}` : ""}`
                        : `${user?.designation || "TPO Officer"} ${user?.organization ? `• ${user.organization}` : ""}`}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm select-none">
                    {getInitials(user?.name)}
                  </div>
                </div>

                {/* Profile Popup Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                      <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer">
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsSupportOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer bg-blue-50 hover:bg-blue-100 text-[#2563eb] border border-blue-200 shadow-xs">
            <HelpCircle className="w-4 h-4 text-[#2563eb]" />
            <span>Quick Support</span>
          </button>
        )}
      </header>

      {/* Quick Support Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#f8f9ff] px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 rounded-lg text-[#2563eb]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Portal Access & Support</h2>
                  <p className="text-xs text-slate-500">Self-help guide & TPO Helpdesk contact</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSupportOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Section 1: Self-Help FAQs */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Common Login Troubleshooting</p>

                <div className="space-y-2">
                  {loginFaqs.map((faq, index) => {
                    const IconComponent = faq.icon;
                    const isOpen = activeFaq === index;

                    return (
                      <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white">
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2.5">
                            <IconComponent className="w-4 h-4 text-[#2563eb] shrink-0" />
                            <span className="text-xs font-semibold text-slate-800">{faq.question}</span>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-90 text-[#2563eb]" : ""}`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Contact TPO Desk if unresolved */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Issue Still Unresolved? Contact TPO Cell</p>

                <div className="bg-[#eff4ff] border border-blue-100 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                    <Mail className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>tpo-support@campus.edu</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                    <Phone className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>+91 (0171) 289-4500 (Ext. 104)</span>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                    <MapPin className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                    <span>Training & Placement Cell, Block B, Room 204</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSupportOpen(false)}
                className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer">
                Close Helpdesk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
