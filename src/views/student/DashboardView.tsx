import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  ChevronRight,
  Megaphone,
  Award,
  Bell,
  FileText,
  ShieldCheck,
  AlertCircle,
  Loader2,
  MapPin,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Drive } from "../../utils/types";
import { AcademicVerificationStatus } from "../../utils/enums";
import { useAuth } from "../../context/AuthContext";
import { useStudent } from "../../context/StudentContext";
import { getPlacementDrivesApi } from "../../services/driveService";

const MS_PER_DAY = 86_400_000;

const formatDeadline = (isoDate: string): string => {
  const deadline = new Date(isoDate);
  if (Number.isNaN(deadline.getTime())) return "N/A";
  const diffDays = Math.ceil((deadline.getTime() - Date.now()) / MS_PER_DAY);
  if (diffDays < 0) return "Closed";
  if (diffDays === 0) return "Closes today";
  if (diffDays === 1) return "Closes in 1 day";
  if (diffDays <= 7) return `Closes in ${diffDays} days`;
  return deadline.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loadingProfile: profileLoading } = useStudent();

  const [drives, setDrives] = useState<Drive[]>([]);
  const [drivesLoading, setDrivesLoading] = useState<boolean>(true);
  const [driveFilter, setDriveFilter] = useState<"eligible" | "all">("eligible");
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    let isMounted = true;

    const fetchDrives = async () => {
      try {
        setDrivesLoading(true);
        const res = await getPlacementDrivesApi();
        if (isMounted && res.success) {
          setDrives(res.data || []);
        }
      } catch {
        // Keep empty drives list gracefully on dashboard
      } finally {
        if (isMounted) setDrivesLoading(false);
      }
    };

    fetchDrives();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000); // har 1 minute mein reference time update

    return () => window.clearInterval(intervalId);
  }, []);

  // 1. Dynamic Placement Readiness Score (100% total)
  const isProfileComplete = Boolean(profile?.course && profile?.cgpa !== undefined && profile?.graduationYear);
  const isResumeUploaded = Boolean(profile?.resume?.url);
  const isSkillsAdded = (profile?.skills?.length ?? 0) >= 3;
  const isTpoCleared = profile?.academicVerification?.status === AcademicVerificationStatus.VERIFIED;

  const overallReadiness = (isProfileComplete ? 30 : 0) + (isResumeUploaded ? 30 : 0) + (isSkillsAdded ? 20 : 0) + (isTpoCleared ? 20 : 0);

  const radius = 28;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallReadiness / 100) * circumference;

  // 2. Derived Drive Metrics
  const eligibleDrives = useMemo(() => drives.filter((d) => d.isEligible), [drives]);

  // const closingSoonDrives = useMemo(() => {
  //   const now = Date.now();
  //   return drives.filter((d) => {
  //     const diff = new Date(d.registrationDeadline).getTime() - now;
  //     return diff >= 0 && diff <= 7 * MS_PER_DAY;
  //   });
  // }, [drives]);

  const closingSoonDrives = useMemo(() => {
    return drives.filter((d) => {
      const deadlineMs = new Date(d.registrationDeadline).getTime();
      if (Number.isNaN(deadlineMs)) return false;
      const diff = deadlineMs - now;
      return diff >= 0 && diff <= 7 * MS_PER_DAY;
    });
  }, [drives, now]);

  const highestCtc = useMemo(() => {
    if (drives.length === 0) return 0;
    return Math.max(...drives.map((d) => d.ctcTotal || 0));
  }, [drives]);

  const highestEligibleCtc = useMemo(() => {
    if (eligibleDrives.length === 0) return 0;
    return Math.max(...eligibleDrives.map((d) => d.ctcTotal || 0));
  }, [eligibleDrives]);

  const displayedDrives = useMemo(() => {
    const list = driveFilter === "eligible" ? eligibleDrives : drives;
    return list.slice(0, 4);
  }, [driveFilter, eligibleDrives, drives]);

  const firstName = (user?.name || "Student").split(" ")[0];
  const currentSem = profile?.semesterRecords?.length
    ? `Sem ${Math.max(...profile.semesterRecords.map((s) => s.semesterNumber))}`
    : profile?.graduationYear
      ? `Batch ${profile.graduationYear}`
      : "";

  if (profileLoading && drivesLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold">Loading your placement dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section 1: Integrated Welcome Banner & Placement Readiness Card */}
      <div className="w-full bg-[#edf2ff] border border-blue-100 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col lg:flex-row items-stretch justify-between gap-6">
        {/* Left Welcome Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-white px-2.5 py-1 rounded-xl border border-blue-100">
              <span className={`w-2 h-2 rounded-full shrink-0 ${isTpoCleared ? "bg-green-600" : "bg-amber-500"}`} />
              {isTpoCleared ? "OFFICIAL TPO CLEARANCE: VERIFIED & ACTIVE" : "TPO PROFILE VERIFICATION: PENDING"}
            </span>
            <h1 className="text-3xl font-bold mt-3 text-slate-900 tracking-wide">Welcome back, {firstName}!</h1>
            <p className="text-sm text-slate-500 mt-1.5 flex flex-wrap items-center gap-2">
              <span>
                {profile?.course || "Student"}
                {profile?.field ? ` (${profile.field})` : ""}
                {currentSem ? ` • ${currentSem}` : ""}
              </span>
              {profile?.cgpa !== undefined && (
                <span
                  className={`font-semibold px-2 py-0.5 rounded border text-xs ${
                    isTpoCleared ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-slate-700 bg-white border-slate-200"
                  }`}>
                  CGPA: {profile.cgpa} {isTpoCleared ? "(Verified)" : "(Unverified)"}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/student/profile")}
              className="bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
              {isResumeUploaded ? "Manage Profile & Resume" : "Upload Resume"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/student/drives")}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
              View Eligible Drives ({eligibleDrives.length})
            </button>
          </div>
        </div>

        {/* Right Placement Readiness Card */}
        <div className="w-full lg:w-95 bg-white rounded-2xl p-5 shadow-xs flex flex-col justify-between border border-blue-100/80 shrink-0">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm">Placement Readiness</h3>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                overallReadiness === 100 ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
              }`}>
              {overallReadiness === 100 ? "DRIVE READY" : "ACTION NEEDED"}
            </span>
          </div>

          <div className="flex items-center gap-4 my-3">
            <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
              <svg className="w-18 h-18 transform -rotate-90">
                <circle cx="36" cy="36" r={radius} stroke="#e2e8f0" strokeWidth={strokeWidth} fill="transparent" />
                <circle
                  cx="36"
                  cy="36"
                  r={radius}
                  stroke="#2563eb"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <span className="absolute text-base font-extrabold text-blue-600">{overallReadiness}%</span>
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                  <span>Academic Verification</span>
                  <span className={isTpoCleared ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                    {isTpoCleared ? "Verified" : "Pending"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${isTpoCleared ? "bg-emerald-500 w-full" : "bg-amber-400 w-1/2"}`} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                  <span>Resume &amp; Skills ({profile?.skills?.length ?? 0})</span>
                  <span className="text-blue-600 font-bold">{isResumeUploaded ? "Uploaded" : "Missing"}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`bg-blue-600 h-full rounded-full ${
                      isResumeUploaded && isSkillsAdded ? "w-full" : isResumeUploaded || isSkillsAdded ? "w-1/2" : "w-1/6"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${overallReadiness === 100 ? "text-emerald-600" : "text-slate-400"}`} />
            <span>
              {overallReadiness === 100 ? "Full Access to Campus Placement Drives" : "Complete profile, resume & 3+ skills for 100% readiness"}
            </span>
          </p>
        </div>
      </div>

      {/* Section 2: 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Eligible Drives */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{drives.length} Active</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Eligible Drives</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">{eligibleDrives.length}</span>
              <span className="text-xs text-slate-500 font-medium">of {drives.length} Total</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {closingSoonDrives.length} Closing within 7 days
            </p>
          </div>
        </div>

        {/* Card 2: Academic Standing */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                isTpoCleared ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
              {isTpoCleared ? "Verified" : "Pending"}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Standing</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">{profile?.cgpa ?? "N/A"}</span>
              <span className="text-xs text-slate-500 font-medium">CGPA</span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-2">
              Active Backlogs: <span className="font-bold text-slate-800">{profile?.backlogCount ?? 0}</span>
            </p>
          </div>
        </div>

        {/* Card 3: Skills & Resume */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {isResumeUploaded ? "Resume Ready" : "No Resume"}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mapped Skills</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">{profile?.skills?.length ?? 0}</span>
              <span className="text-xs text-slate-500 font-medium">Skills</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2 truncate">
              {profile?.skills?.slice(0, 3).join(", ") || "Add skills in your profile"}
            </p>
          </div>
        </div>

        {/* Card 4: Top Package Available */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Campus Peak</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highest Drive CTC</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-blue-700">₹{highestCtc}</span>
              <span className="text-xs text-blue-900 font-bold">LPA</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2">
              Your Eligible Peak: <span className="font-bold text-slate-800">₹{highestEligibleCtc} LPA</span>
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Main Split Grid (Drives List + Action Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Upcoming Placement Drives */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Campus Placement Drives</h2>
              <p className="text-xs text-slate-500 mt-0.5">Live recruiter drives matched against your academic profile.</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setDriveFilter("eligible")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  driveFilter === "eligible" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}>
                Eligible Only ({eligibleDrives.length})
              </button>
              <button
                type="button"
                onClick={() => setDriveFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  driveFilter === "all" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}>
                All Active ({drives.length})
              </button>
            </div>
          </div>

          {displayedDrives.length === 0 ? (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-10 text-center">
              <p className="text-sm font-bold text-slate-700">
                {driveFilter === "eligible" ? "No eligible drives found right now." : "No active placement drives posted yet."}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {driveFilter === "eligible"
                  ? "Switch to 'All Active' to inspect criteria for other drives."
                  : "Check back soon for new TPO announcements."}
              </p>
            </div>
          ) : (
            displayedDrives.map((drive) => (
              <div key={drive._id} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 uppercase">
                      {drive.companyName?.[0] || "C"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{drive.companyName}</h3>
                        <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md uppercase">{drive.jobType}</span>
                        {drive.workMode && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md uppercase">{drive.workMode}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{drive.roleTitle}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{drive.ctcTotal} <span className="text-sm font-bold">LPA</span>
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Batch &apos;{String(drive.batchYear).slice(-2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 bg-slate-50 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">ELIGIBILITY</span>
                    {drive.isEligible ? (
                      <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Eligible (≥ {drive.eligibilityCriteria?.minCgpa ?? 0})
                      </span>
                    ) : (
                      <span className="font-bold text-rose-600 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Min CGPA {drive.eligibilityCriteria?.minCgpa ?? 0}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">LOCATION</span>
                    <span className="font-medium text-slate-700 mt-0.5 flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {drive.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">SKILL MATCH</span>
                    <span className="font-bold text-blue-700 mt-0.5 block">{drive.skillMatchPercent ?? 100}% Fit</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">DEADLINE</span>
                    <span className="font-bold text-red-600 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" /> {formatDeadline(drive.registrationDeadline)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-1">
                  <span className="text-xs text-slate-500 font-medium truncate">
                    {drive.requiredSkills?.length ? `Skills: ${drive.requiredSkills.slice(0, 4).join(", ")}` : "Open to all eligible candidates"}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate("/student/drives")}
                    className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1">
                    View Drive &amp; Apply <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right 1 Column: Action Alerts & Checklist */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" />
                <h3 className="text-base font-bold text-slate-900">Action Alerts</h3>
              </div>
              <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full uppercase">Live Status</span>
            </div>

            <div className="space-y-3">
              {closingSoonDrives[0] && (
                <div className="p-3.5 bg-red-50/80 border-l-4 border-red-500 rounded-r-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">UPCOMING DEADLINE</span>
                    <span className="text-[10px] text-red-600 font-bold">{formatDeadline(closingSoonDrives[0].registrationDeadline)}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-1.5">
                    {closingSoonDrives[0].companyName} • {closingSoonDrives[0].roleTitle}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/student/drives")}
                    className="text-xs font-bold text-red-700 hover:underline mt-2 flex items-center gap-1 cursor-pointer">
                    Open Drive Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {!isResumeUploaded && (
                <div className="p-3.5 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">PROFILE ACTION</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">Upload Your Latest Resume</p>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    A PDF resume is required before submitting applications to campus placement drives.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/student/profile")}
                    className="text-xs font-bold text-amber-800 hover:underline mt-2 flex items-center gap-1 cursor-pointer">
                    Go to Profile <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="p-3.5 bg-blue-50/80 border-l-4 border-blue-500 rounded-r-xl">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">TPO VERIFICATION</span>
                <p className="text-xs font-bold text-slate-900 mt-1">{isTpoCleared ? "Academic Records Verified" : "Awaiting TPO Verification"}</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {isTpoCleared
                    ? "Your CGPA, branch, and graduation year are cleared for automated drive eligibility checks."
                    : "Ensure your CGPA, semester records, and course details are accurate for TPO review."}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border-l-4 border-slate-400 rounded-r-xl">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" /> PLACEMENT POLICY
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Applications close automatically at the drive registration cutoff. Keep your skills list updated for accurate role matching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
