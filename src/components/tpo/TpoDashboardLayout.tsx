import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

const TpoDashboardLayout = () => {
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