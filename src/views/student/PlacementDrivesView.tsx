import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  Search,
  MapPin,
  BadgeCheck,
  XCircle,
  FileText,
  CheckCircle2,
  Clock,
  ChevronRight,
  Check,
  Sparkles,
  Briefcase,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import type { Drive, IDriveTabItem } from "../../utils/types";
import { useStudent } from "../../context/StudentContext";
import { AcademicVerificationStatus, DriveFilterTab } from "../../utils/enums";
import { applyToDriveApi, getPlacementDrivesApi } from "../../services/driveService";

interface DriveCardProps {
  drive: Drive;
  isActive: boolean;
  isApplied: boolean;
  onSelect: (id: string) => void;
}

const MS_PER_DAY = 86_400_000;

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDeadline = (isoDate: string): string => {
  const deadline = new Date(isoDate);
  if (Number.isNaN(deadline.getTime())) return "N/A";
  const diffDays = Math.ceil((deadline.getTime() - Date.now()) / MS_PER_DAY);
  if (diffDays < 0) return "Closed";
  if (diffDays === 0) return "Closes today";
  if (diffDays === 1) return "1 day left";
  if (diffDays <= 7) return `${diffDays} days left`;
  return formatDate(isoDate);
};

const matchesTab = (drive: Drive, tab: DriveFilterTab): boolean => {
  switch (tab) {
    case DriveFilterTab.ELIGIBLE:
      return Boolean(drive.isEligible);
    case DriveFilterTab.NOT_ELIGIBLE:
      return !drive.isEligible;
    case DriveFilterTab.FULL_TIME:
      return Boolean(drive.jobType?.toLowerCase().includes("full"));
    case DriveFilterTab.INTERNSHIP:
      return Boolean(drive.jobType?.toLowerCase().includes("intern"));
    default:
      return true;
  }
};

const extractErrorMessage = (err: unknown, fallback: string): string => {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
};

const DriveCard = React.memo(({ drive, isActive, isApplied, onSelect }: DriveCardProps) => (
  <button
    type="button"
    onClick={() => onSelect(drive._id)}
    className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3 relative ${
      isActive
        ? "bg-blue-50/70 border-blue-400 shadow-md ring-1 ring-blue-400"
        : "bg-white border-slate-200/80 hover:border-slate-300 shadow-xs"
    }`}
  >
    {/* Company & Role Header */}
    <div className="flex justify-between items-start gap-2">
      <div className="flex gap-3 items-center min-w-0">
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 shadow-xs uppercase">
          {drive.companyName?.[0] || "C"}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-slate-900 truncate">{drive.companyName}</h3>
            {drive.workMode && (
              <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md uppercase shrink-0">
                {drive.workMode}
              </span>
            )}
            {isApplied && (
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md uppercase shrink-0">
                Applied
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium truncate">{drive.roleTitle}</p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-xl font-black text-slate-900">₹{drive.ctcTotal}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase">LPA CTC</p>
      </div>
    </div>

    {/* Location & Deadline */}
    <div
      className={`flex justify-between items-center p-2.5 rounded-xl text-xs font-medium ${
        isActive ? "bg-white/80 border border-blue-100" : "bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-1.5 text-slate-600 truncate">
        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="truncate">{drive.location}</span>
      </div>
      <span className="text-red-600 font-bold flex items-center gap-1 shrink-0">
        <Clock className="w-3 h-3" /> {formatDeadline(drive.registrationDeadline)}
      </span>
    </div>

    {/* Badges & Status */}
    <div className="flex items-center justify-between gap-2 pt-1">
      {drive.isEligible ? (
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-700">
          <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Eligible • Min CGPA {drive.eligibilityCriteria?.minCgpa ?? 0}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-xs font-bold text-rose-600">
          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Not Eligible • Min CGPA {drive.eligibilityCriteria?.minCgpa ?? 0}</span>
        </div>
      )}

      <div className="flex gap-1.5 text-[10px] font-bold shrink-0">
        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">{drive.jobType}</span>
        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
          Batch &apos;{String(drive.batchYear).slice(-2)}
        </span>
      </div>
    </div>
  </button>
));
DriveCard.displayName = "DriveCard";

const PlacementDrivesView: React.FC = () => {
  const { profile: studentProfile } = useStudent();

  const [drives, setDrives] = useState<Drive[]>([]);
  const [selectedDriveId, setSelectedDriveId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<DriveFilterTab>(DriveFilterTab.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [applyingDriveId, setApplyingDriveId] = useState<string>("");
  const [appliedDriveIds, setAppliedDriveIds] = useState<string[]>([]);
  const [applyFeedback, setApplyFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    let isMounted = true;

    const fetchDrives = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getPlacementDrivesApi();
        if (!res.success) {
          throw new Error(res.message || "Failed to fetch placement drives.");
        }

        if (!isMounted) return;

        const fetchedDrives = res.data || [];
        setDrives(fetchedDrives);

        const preAppliedIds = fetchedDrives
          .filter((d) => Boolean((d as Drive & { hasApplied?: boolean }).hasApplied))
          .map((d) => d._id);
        if (preAppliedIds.length > 0) {
          setAppliedDriveIds(preAppliedIds);
        }

        if (fetchedDrives.length > 0) {
          setSelectedDriveId(fetchedDrives[0]._id);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(extractErrorMessage(err, "Something went wrong while loading drives."));
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
  }, []);

  const handleApply = async (drive: Drive) => {
    const alreadyApplied =
      appliedDriveIds.includes(drive._id) ||
      Boolean((drive as Drive & { hasApplied?: boolean }).hasApplied);

    if (!drive.isEligible || alreadyApplied || applyingDriveId === drive._id) {
      return;
    }

    setApplyFeedback(null);
    setApplyingDriveId(drive._id);

    try {
      const res = await applyToDriveApi(drive._id);
      if (!res.success) {
        throw new Error(res.message || "Failed to submit application.");
      }

      setAppliedDriveIds((prev) => (prev.includes(drive._id) ? prev : [...prev, drive._id]));
      setApplyFeedback({
        type: "success",
        message:
          res.message || `Application submitted for ${drive.companyName} (${drive.roleTitle}).`,
      });
    } catch (err: unknown) {
      setApplyFeedback({
        type: "error",
        message: extractErrorMessage(err, "Could not apply to this drive."),
      });
    } finally {
      setApplyingDriveId("");
    }
  };

  const filteredDrives = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    return drives.filter((drive) => {
      if (!matchesTab(drive, activeTab)) return false;
      if (!q) return true;

      return (
        drive.companyName.toLowerCase().includes(q) ||
        drive.roleTitle.toLowerCase().includes(q) ||
        drive.location.toLowerCase().includes(q) ||
        Boolean(drive.requiredSkills?.some((s) => s.toLowerCase().includes(q)))
      );
    });
  }, [drives, activeTab, deferredQuery]);

  const activeDrive = useMemo(
    () => filteredDrives.find((d) => d._id === selectedDriveId) || filteredDrives[0] || null,
    [filteredDrives, selectedDriveId],
  );

  const eligibleCount = useMemo(() => drives.filter((d) => d.isEligible).length, [drives]);
  const notEligibleCount = drives.length - eligibleCount;

  const filterTabs: IDriveTabItem[] = useMemo(
    () => [
      { id: DriveFilterTab.ALL, label: `All Drives (${drives.length})` },
      { id: DriveFilterTab.ELIGIBLE, label: `Eligible for Me (${eligibleCount})` },
      { id: DriveFilterTab.NOT_ELIGIBLE, label: `Not Eligible (${notEligibleCount})` },
      { id: DriveFilterTab.FULL_TIME, label: "Full Time" },
      { id: DriveFilterTab.INTERNSHIP, label: "Internship" },
    ],
    [drives.length, eligibleCount, notEligibleCount],
  );

  const handleSelectDrive = useCallback((id: string) => {
    setSelectedDriveId(id);
    setApplyFeedback(null);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold">Loading active placement drives...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-red-600">
        <AlertCircle className="w-8 h-8" />
        <p className="text-sm font-bold">{error}</p>
      </div>
    );
  }

  const resumeName =
    studentProfile?.resume?.publicId ||
    (studentProfile?.resume?.url ? "Uploaded_Resume.pdf" : "No resume uploaded");
  const isVerified =
    studentProfile?.academicVerification?.status === AcademicVerificationStatus.VERIFIED;

  return (
    <div className="flex flex-col gap-5 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            UNIVERSITY CAREER PORTAL{" "}
            {studentProfile?.graduationYear ? `• Cohort of ${studentProfile.graduationYear}` : ""}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            Campus Placement Drives
          </h2>
        </div>

        <div className="flex bg-white border border-slate-200/80 shadow-xs justify-between items-center rounded-2xl px-4 py-2.5 gap-3">
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Profile Clearance
            </p>
            <p className="text-xs font-bold text-emerald-700">
              Eligible for {eligibleCount} of {drives.length} Active Drives
            </p>
          </div>
          <div className="flex justify-center items-center bg-emerald-600 w-9 h-9 rounded-xl shadow-xs">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Apply Feedback Banner */}
      {applyFeedback && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 ${
            applyFeedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {applyFeedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{applyFeedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setApplyFeedback(null)}
            className="text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Bar & Filter Tabs */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="bg-slate-50 border border-slate-100 p-2.5 flex items-center gap-2 rounded-xl text-slate-500 text-xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, role, location, or required skills (e.g. C++, Java, Python, React...)"
            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-400 text-xs font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredDrives.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <p className="text-sm font-bold text-slate-700">
            No placement drives match your current filters.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Try switching tabs or clearing the search query.
          </p>
        </div>
      ) : (
        /* Main Split Body Layout */
        <div className="w-full flex flex-col lg:flex-row items-start gap-6">
          {/* Left Column: Active Drives List (40% width) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                ACTIVE RECRUITER PIPELINES
              </span>
              <span className="text-xs font-bold text-blue-600">
                Showing {filteredDrives.length} of {drives.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {filteredDrives.map((drive) => {
                const driveApplied =
                  appliedDriveIds.includes(drive._id) ||
                  Boolean((drive as Drive & { hasApplied?: boolean }).hasApplied);
                return (
                  <DriveCard
                    key={drive._id}
                    drive={drive}
                    isActive={drive._id === activeDrive?._id}
                    isApplied={driveApplied}
                    onSelect={handleSelectDrive}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Column: Complete Detailed Company Panel (60% width) */}
          {activeDrive && (
            <div className="w-full lg:w-[60%] bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0 shadow-xs uppercase">
                    {activeDrive.companyName?.[0] || "C"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">{activeDrive.companyName}</h2>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {activeDrive.roleTitle} • {activeDrive.location}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-blue-700">
                    ₹{activeDrive.ctcTotal} LPA
                  </span>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    {activeDrive.jobType}
                  </p>
                </div>
              </div>

              {/* Active Resume & Quick Apply Card */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Active Resume: <span className="text-blue-700">{resumeName}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {isVerified ? "Verified by TPO" : "Pending TPO verification"}
                    </p>
                  </div>
                </div>

                {(() => {
                  const isAlreadyApplied =
                    appliedDriveIds.includes(activeDrive._id) ||
                    Boolean((activeDrive as Drive & { hasApplied?: boolean }).hasApplied);
                  const isSubmitting = applyingDriveId === activeDrive._id;
                  const isDisabled = !activeDrive.isEligible || isAlreadyApplied || isSubmitting;

                  return (
                    <button
                      type="button"
                      disabled={isDisabled}
                      onClick={() => void handleApply(activeDrive)}
                      className={`w-full sm:w-auto text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 ${
                        isAlreadyApplied
                          ? "bg-emerald-600 text-white cursor-default"
                          : activeDrive.isEligible
                            ? "bg-[#2563eb] hover:bg-blue-700 disabled:opacity-60 text-white cursor-pointer"
                            : "bg-slate-200 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Applying...
                        </>
                      ) : isAlreadyApplied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Applied
                        </>
                      ) : activeDrive.isEligible ? (
                        <>
                          Apply Now <ChevronRight className="w-4 h-4" />
                        </>
                      ) : (
                        "Criteria Not Met"
                      )}
                    </button>
                  );
                })()}
              </div>

              {/* Drive Key Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Total CTC
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    ₹{activeDrive.ctcTotal} LPA
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Work Mode
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    {activeDrive.workMode || "On-Site"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Shift Timings
                  </span>
                  <span className="text-sm font-black text-slate-900 mt-1 block">
                    {activeDrive.shiftTimings || "Standard Day"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-500 block uppercase">
                    Apply By
                  </span>
                  <span className="text-sm font-black text-red-600 mt-1 block">
                    {formatDate(activeDrive.registrationDeadline)}
                  </span>
                </div>
              </div>

              {/* TPO Official Eligibility Clearance */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    TPO OFFICIAL ELIGIBILITY CLEARANCE
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      activeDrive.isEligible
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {activeDrive.isEligible ? "ELIGIBLE" : "NOT ELIGIBLE"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex items-start gap-2.5">
                    {activeDrive.eligibilityChecks?.cgpaMet ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-800">CGPA Requirement</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Required: ≥ {activeDrive.eligibilityCriteria?.minCgpa ?? 0}{" "}
                        {studentProfile?.cgpa !== undefined && (
                          <span className="font-bold text-slate-700">
                            • Yours: {studentProfile.cgpa}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex items-start gap-2.5">
                    {activeDrive.eligibilityChecks?.backlogsMet ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-800">Active Backlogs</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Max Allowed: {activeDrive.eligibilityCriteria?.maxBacklogsAllowed ?? 0}
                        {studentProfile?.backlogCount !== undefined && (
                          <span className="font-bold text-slate-700">
                            • Yours: {studentProfile.backlogCount}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex items-start gap-2.5">
                    {activeDrive.eligibilityChecks?.courseMet &&
                    activeDrive.eligibilityChecks?.fieldMet ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-800">Course &amp; Stream</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Allowed:{" "}
                        {[
                          ...(activeDrive.eligibilityCriteria?.allowedCourses || []),
                          ...(activeDrive.eligibilityCriteria?.allowedFields || []),
                        ].join(", ") || "All Courses & Streams"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex items-start gap-2.5">
                    {activeDrive.eligibilityChecks?.batchMet ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-800">Graduating Batch</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Eligible up to Batch {activeDrive.batchYear}
                        {studentProfile?.graduationYear && (
                          <span className="font-bold text-slate-700">
                            • Yours: {studentProfile.graduationYear}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill Match Analysis */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    SKILL MATCH ANALYSIS
                  </h4>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {activeDrive.skillMatchPercent ?? 100}% Profile Fit
                  </span>
                </div>

                {(activeDrive.requiredSkills?.length ?? 0) > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {(activeDrive.matchedSkills || []).map((skill) => (
                      <span
                        key={`m-${skill}`}
                        className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-blue-600" /> {skill}
                      </span>
                    ))}
                    {(activeDrive.missingSkills || []).map((skill) => (
                      <span
                        key={`u-${skill}`}
                        className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" /> {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    No specific technical skills listed for this drive.
                  </p>
                )}
              </div>

              {/* Role Description */}
              <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> ROLE DESCRIPTION
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {activeDrive.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlacementDrivesView;