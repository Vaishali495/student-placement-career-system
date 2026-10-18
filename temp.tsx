import React from "react";

const temp = () => {
  return (
    <>
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

      <button
        type="button"
        className="px-4 py-2 rounded-lg font-medium text-[15px] transition-all duration-200 cursor-pointer bg-[#2563eb] hover:bg-[#3064d6] text-white shadow-sm">
        Placement Guidelines
      </button>
    </>
  );
};

export default temp;
