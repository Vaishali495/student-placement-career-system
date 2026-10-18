import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-[#f8f9ff] overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Fixed Header */}
        <Header />

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-6 bg-gray-50">
          {/* Active route ka component Outlet ki jagah render hoga */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
