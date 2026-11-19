import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  RotateCw,
  Search,
  CheckCircle2,
  Clock,
  FileText,
  XCircle,
  Award,
  AlertCircle,
  Loader2,
  MapPin,
  ExternalLink,
  MessageSquareText,
} from "lucide-react";
import {
  getMyApplicationsApi,
  type PopulatedApplicationDrive,
  type StudentApplicationItem,
} from "../../services/applicationService";

type StatusFilter = "all" | "active" | "offered" | "rejected";

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

const getDriveObj = (app: StudentApplicationItem): PopulatedApplicationDrive | null => {
  if (app.driveId && typeof app.driveId === "object") {
    return app.driveId;
  }
  return null;
};

const getStatusBadgeStyle = (status: string): string => {
  const normalized = status.toLowerCase();
  if (normalized.includes("offer")) {
    return "bg-emerald-100 text-emerald-800 border border-emerald-200";
  }
  if (normalized.includes("reject")) {
    return "bg-rose-100 text-rose-800 border border-rose-200";
  }
  if (normalized.includes("shortlist") || normalized.includes("interview")) {
    return "bg-indigo-100 text-indigo-800 border border-indigo-200";
  }
  return "bg-blue-100 text-blue-800 border border-blue-200";
};

const extractErrorMessage = (err: unknown, fallback: string): string => {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
};

const MyApplicationsView: React.FC = () => {
  const [applications, setApplications] = useState<StudentApplicationItem[]>([]);
  const [activeTab, setActiveTab] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    let isMounted = true;

    const runFetch = async () => {
      try {
        setError("");
        const res = await getMyApplicationsApi();
        if (!res.success) {
          throw new Error(res.message || "Failed to fetch applications.");
        }
        if (isMounted) {
          setApplications(res.data || []);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(extractErrorMessage(err, "Something went wrong while loading applications."));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    void runFetch();

    return () => {
      isMounted = false;
    };
  }, [reloadNonce]);

  const handleRefresh = () => {
    setRefreshing(true);
    setReloadNonce((prev) => prev + 1);
  };

  const handleRetry = () => {
    setLoading(true);
    setReloadNonce((prev) => prev + 1);
  };

  const stats = useMemo(() => {
    const total = applications.length;
    const offered = applications.filter((a) =>
      a.status.toLowerCase().includes("offer"),
    ).length;
    const rejected = applications.filter((a) =>
      a.status.toLowerCase().includes("reject"),
    ).length;
    const inProgress = applications.filter(
      (a) =>
        !a.status.toLowerCase().includes("offer") &&
        !a.status.toLowerCase().includes("reject"),
    ).length;

    return { total, inProgress, offered, rejected };
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    return applications.filter((app) => {
      const statusLower = app.status.toLowerCase();
      const isOffered = statusLower.includes("offer");
      const isRejected = statusLower.includes("reject");
      const isActive = !isOffered && !isRejected;

      if (activeTab === "active" && !isActive) return false;
      if (activeTab === "offered" && !isOffered) return false;
      if (activeTab === "rejected" && !isRejected) return false;

      if (!q) return true;

      const drive = getDriveObj(app);
      const company = drive?.companyName?.toLowerCase() || "";
      const role = drive?.roleTitle?.toLowerCase() || "";
      const location = drive?.location?.toLowerCase() || "";

      return (
        company.includes(q) ||
        role.includes(q) ||
        location.includes(q) ||
        statusLower.includes(q)
      );
    });
  }, [applications, activeTab, deferredQuery]);

  const filterTabs: Array<{ id: StatusFilter; label: string }> = useMemo(
    () => [
      { id: "all", label: `All (${stats.total})` },
      { id: "active", label: `Active (${stats.inProgress})` },
      { id: "offered", label: `Offered (${stats.offered})` },
      { id: "rejected", label: `Rejected (${stats.rejected})` },
    ],
    [stats],
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold">Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-red-600">
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
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            STUDENT PLACEMENT PORTAL
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            My Applications
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track submitted placement drives, current stage, application status, and TPO remarks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 disabled:opacity-70 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
        >
          <RotateCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Status"}
        </button>
      </div>

      {/* 2. Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              TOTAL APPLIED
            </span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{stats.total}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              IN PROGRESS
            </span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-blue-700 mt-2">{stats.inProgress}</p>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
              OFFERED
            </span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-900 mt-2">{stats.offered}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              REJECTED
            </span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">{stats.rejected}</p>
        </div>
      </div>

      {/* 3. Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 flex items-center gap-2 rounded-xl text-xs w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search company, role, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-slate-800 placeholder-slate-400 text-xs"
          />
        </div>
      </div>

      {/* 4. Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center">
          <p className="text-sm font-bold text-slate-700">No applications found.</p>
          <p className="text-xs text-slate-400 mt-1">
            {applications.length === 0
              ? "You haven't applied to any placement drives yet."
              : "Try changing the filter tab or clearing your search."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredApplications.map((app) => {
            const drive = getDriveObj(app);
            const companyName = drive?.companyName || "Placement Drive";
            const roleTitle = drive?.roleTitle || "Role Details";

            return (
              <div
                key={app._id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-blue-50 text-blue-600 font-bold rounded-xl flex items-center justify-center text-lg shrink-0 border border-blue-100 uppercase">
                      {companyName[0] || "D"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{companyName}</h3>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md ${getStatusBadgeStyle(
                            app.status,
                          )}`}
                        >
                          {app.status}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          Stage {app.currentStage ?? 1}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {roleTitle}
                        {drive?.location ? ` • ${drive.location}` : ""}
                        {drive?.jobType ? ` • ${drive.jobType}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {drive?.ctcTotal !== undefined && (
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">CTC</p>
                        <p className="text-xl font-black text-slate-900">
                          ₹{drive.ctcTotal} <span className="text-xs font-bold">LPA</span>
                        </p>
                      </div>
                    )}

                    {app.appliedResumeUrl && (
                      <a
                        href={app.appliedResumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        Resume
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Metadata Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Applied on: <strong className="text-slate-700">{formatDate(app.createdAt)}</strong>
                    </span>
                    {drive?.batchYear && (
                      <span>
                        Batch: <strong className="text-slate-700">{drive.batchYear}</strong>
                      </span>
                    )}
                    {drive?.workMode && (
                      <span>
                        Mode: <strong className="text-slate-700">{drive.workMode}</strong>
                      </span>
                    )}
                  </div>
                  {drive?.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {drive.location}
                    </span>
                  )}
                </div>

                {/* TPO Remarks */}
                {app.tpoRemarks && (
                  <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 text-xs">
                    <MessageSquareText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">TPO Remarks: </span>
                      <span className="text-slate-600">{app.tpoRemarks}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsView;