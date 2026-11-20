import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Award,
  Plus,
  ChevronRight,
  Clock,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { Drive } from "../../utils/types";
import { getPlacementDrivesApi } from "../../services/driveService";

const formatDate = (isoDate?: string): string => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const extractErrorMessage = (err: unknown, fallback: string): string => {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
};

const TpoDashboardView: React.FC = () => {
  const navigate = useNavigate();

  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    const fetchDrives = async () => {
      try {
        const res = await getPlacementDrivesApi();
        if (!isMounted) return;

        if (!res.success) {
          setError(res.message || "Failed to fetch placement drives.");
        } else {
          setError("");
          setDrives(res.data || []);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(extractErrorMessage(err, "Something went wrong while loading dashboard data."));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchDrives();

    return () => {
      isMounted = false;
    };
  }, [reloadNonce]);

  const handleRetry = () => {
    setLoading(true);
    setError("");
    setReloadNonce((prev) => prev + 1);
  };

  const openDrives = useMemo(
    () => drives.filter((d) => (d.status || "").toLowerCase() === "open"),
    [drives],
  );

  const closedDrives = useMemo(
    () => drives.filter((d) => (d.status || "").toLowerCase() === "closed"),
    [drives],
  );

  const highestCtc = useMemo(() => {
    if (drives.length === 0) return 0;
    return Math.max(...drives.map((d) => Number(d.ctcTotal) || 0));
  }, [drives]);

  const recentDrives = useMemo(() => drives.slice(0, 5), [drives]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold">Loading TPO dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-3 text-red-600">
        <AlertCircle className="w-8 h-8" />
        <p className="text-sm font-bold">{error}</p>
        <button
          type="button"
          onClick={handleRetry}
          className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Banner Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            TPO PORTAL • PLACEMENT OVERVIEW
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">TPO Dashboard</h1>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => navigate("/tpo/manage-drives")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            Manage Drives
          </button>
          <button
            type="button"
            onClick={() => navigate("/tpo/create-drive")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Placement Drive
          </button>
        </div>
      </div>

      {/* 4 Core KPI Summary Cards (Derived from Real Drive Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              TOTAL DRIVES
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-3">{drives.length}</p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            All created campus drives
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              OPEN DRIVES
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-600 mt-3">{openDrives.length}</p>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">
            Accepting student applications
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              CLOSED DRIVES
            </span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-3">{closedDrives.length}</p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Registrations closed
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              HIGHEST CTC
            </span>
            <div className="p-2 bg-blue-600 text-white rounded-xl">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-blue-700 mt-3">
            ₹{highestCtc} <span className="text-sm font-bold">LPA</span>
          </p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Top offered package across drives
          </span>
        </div>
      </div>

      {/* Recent Placement Drives Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Placement Drives</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest drives configured in the placement portal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/tpo/manage-drives")}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            View All ({drives.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {recentDrives.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <p className="text-sm font-bold text-slate-700">No placement drives created yet.</p>
            <p className="text-xs text-slate-400">
              Click &ldquo;Create Placement Drive&rdquo; to post your first campus drive.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentDrives.map((drive) => {
              const isOpen = (drive.status || "").toLowerCase() === "open";
              return (
                <div
                  key={drive._id}
                  className="border border-slate-200/80 hover:border-blue-300 rounded-xl p-4 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">{drive.companyName}</h3>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                          isOpen
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {drive.status || "Open"}
                      </span>
                      {drive.workMode && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                          {drive.workMode}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      {drive.roleTitle} • {drive.jobType || "Full Time"} • Batch {drive.batchYear}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {drive.location}
                      </span>
                      <span className="flex items-center gap-1 text-rose-600 font-semibold">
                        <Clock className="w-3.5 h-3.5" /> Deadline: {formatDate(drive.registrationDeadline)}
                      </span>
                      <span>
                        Min CGPA: <strong className="text-slate-700">{drive.eligibilityCriteria?.minCgpa ?? 0}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-xl font-black text-slate-900">
                        ₹{drive.ctcTotal} <span className="text-xs font-bold">LPA</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("/tpo/manage-drives")}
                      className="bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TpoDashboardView;