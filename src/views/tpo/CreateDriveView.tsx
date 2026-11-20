import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { createDriveApi } from "../../services/driveService";
import { DriveStatus, WorkMode } from "../../utils/enums";
import type { CreateDrivePayload } from "../../utils/types";

const parseCsvToArray = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const extractErrorMessage = (err: unknown, fallback: string): string => {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
};

const CreateDriveView: React.FC = () => {
  const navigate = useNavigate();
  const errorRef = useRef<HTMLDivElement | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [location, setLocation] = useState("");
  const [batchYear, setBatchYear] = useState<string>("2026");
  const [ctcTotal, setCtcTotal] = useState<string>("");
  const [workMode, setWorkMode] = useState<string>(WorkMode.ON_SITE);
  const [shiftTimings, setShiftTimings] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [status, setStatus] = useState<string>(DriveStatus.OPEN);

  // eligibilityCriteria fields
  const [minCgpa, setMinCgpa] = useState<string>("0");
  const [maxBacklogsAllowed, setMaxBacklogsAllowed] = useState<string>("0");
  const [allowedCoursesText, setAllowedCoursesText] = useState("");
  const [allowedFieldsText, setAllowedFieldsText] = useState("");

  // requiredSkills & description
  const [requiredSkillsText, setRequiredSkillsText] = useState("");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      errorRef.current.focus();
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!companyName.trim() || !roleTitle.trim() || !location.trim() || !description.trim()) {
      setError("Please fill in Company Name, Role Title, Location, and Description.");
      return;
    }

    const parsedBatch = Number(batchYear);
    const parsedCtc = Number(ctcTotal);

    if (Number.isNaN(parsedBatch) || parsedBatch < 2000) {
      setError("Please enter a valid Batch Year.");
      return;
    }

    if (Number.isNaN(parsedCtc) || parsedCtc <= 0) {
      setError("Please enter a valid CTC (in LPA).");
      return;
    }

    if (!registrationDeadline) {
      setError("Please select a Registration Deadline.");
      return;
    }

    const deadlineIso = new Date(registrationDeadline);
    if (Number.isNaN(deadlineIso.getTime()) || deadlineIso <= new Date()) {
      setError("Registration deadline must be a valid future date/time.");
      return;
    }

    const payload: CreateDrivePayload = {
      companyName: companyName.trim(),
      roleTitle: roleTitle.trim(),
      jobType: jobType.trim() || "Full Time",
      location: location.trim(),
      batchYear: parsedBatch,
      ctcTotal: parsedCtc,
      eligibilityCriteria: {
        minCgpa: Number(minCgpa) || 0,
        maxBacklogsAllowed: Number(maxBacklogsAllowed) || 0,
        allowedCourses: parseCsvToArray(allowedCoursesText),
        allowedFields: parseCsvToArray(allowedFieldsText),
      },
      requiredSkills: parseCsvToArray(requiredSkillsText),
      registrationDeadline: deadlineIso.toISOString(),
      description: description.trim(),
      ...(shiftTimings.trim() ? { shiftTimings: shiftTimings.trim() } : {}),
      workMode,
      status,
    };

    try {
      setSubmitting(true);
      const res = await createDriveApi(payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to create placement drive.");
      }

      setSuccessMessage(res.message || "Placement drive created successfully.");
      setTimeout(() => {
        navigate("/tpo/manage-drives");
      }, 700);
    } catch (err: unknown) {
      setError(extractErrorMessage(err, "Something went wrong while creating the drive."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs font-sans">
      <div className="border-b border-slate-100 pb-4 mb-6 flex flex-wrap justify-between items-center gap-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            TPO DRIVE MANAGEMENT
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Create Placement Drive</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate("/tpo/manage-drives")}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
        >
          Back to Drives
        </button>
      </div>

      {error && (
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2 outline-none"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Drive Details */}
        <div className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            DRIVE DETAILS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Microsoft Corporation"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Role Title *
              </label>
              <input
                type="text"
                required
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Software Development Engineer"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Job Type
              </label>
              <input
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                placeholder="Full Time"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                CTC Total (LPA) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={ctcTotal}
                onChange={(e) => setCtcTotal(e.target.value)}
                placeholder="e.g. 12.5"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Batch Year *
              </label>
              <input
                type="number"
                min="2000"
                required
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
                placeholder="2026"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru / Hyderabad"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(WorkMode).map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Drive Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(DriveStatus).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Registration Deadline *
              </label>
              <input
                type="datetime-local"
                required
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Shift Timings (Optional)
              </label>
              <input
                type="text"
                value={shiftTimings}
                onChange={(e) => setShiftTimings(e.target.value)}
                placeholder="e.g. 10:00 AM - 7:00 PM IST"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            ELIGIBILITY CRITERIA
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Minimum CGPA
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={minCgpa}
                onChange={(e) => setMinCgpa(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Max Backlogs Allowed
              </label>
              <input
                type="number"
                min="0"
                value={maxBacklogsAllowed}
                onChange={(e) => setMaxBacklogsAllowed(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Allowed Courses (Comma-separated)
              </label>
              <input
                type="text"
                value={allowedCoursesText}
                onChange={(e) => setAllowedCoursesText(e.target.value)}
                placeholder="e.g. B.Tech, MCA"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Allowed Fields / Streams (Comma-separated)
              </label>
              <input
                type="text"
                value={allowedFieldsText}
                onChange={(e) => setAllowedFieldsText(e.target.value)}
                placeholder="e.g. Computer Science and Engineering, IT"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Skills & Description */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            SKILLS & DESCRIPTION
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Required Skills (Comma-separated)
            </label>
            <input
              type="text"
              value={requiredSkillsText}
              onChange={(e) => setRequiredSkillsText(e.target.value)}
              placeholder="e.g. React, TypeScript, Node.js, SQL"
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Role Description *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter job responsibilities, expectations, and drive details..."
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate("/tpo/manage-drives")}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? "Creating Drive..." : "Create Drive"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDriveView;