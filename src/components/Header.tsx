import { useState } from "react";
import PlaceCraftLogo from "../assets/PlaceCraft-logo.png";
import VerifiedIcon from "../assets/verified-icon.png";

const NAV_ITEMS = [
  { id: "candidate", label: "Candidate Login" },
  { id: "recruiter", label: "Recruiter Portal" },
] as const;

const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("candidate");

  return (
    <header className="w-full flex justify-between items-center bg-white shadow-sm px-6 py-2">
      {/* Left Section: Logo & Badge */}
      <div className="flex items-center gap-4">
        <div className="w-36 flex items-center">
          <img className="w-full h-auto object-contain" src={PlaceCraftLogo} alt="PlaceCraft Logo" />
        </div>
        <div className="flex items-center bg-[#eff4ff] rounded-full px-2.5 py-1 gap-1">
          <img className="w-3.5 h-3.5 object-contain" src={VerifiedIcon} alt="Verified Icon" />
          <p className="text-[10px] tracking-widest font-medium">Institutional Trust Tier-1</p>
        </div>
      </div>

      {/* Right Section: Navigation Tabs */}
      <div className="flex justify-center items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`px-4 py-2 rounded-lg font-medium text-[15px] transition-all duration-200 cursor-pointer ${
              activeTab === item.id ? "bg-[#2563eb] text-white shadow-sm" : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}>
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
