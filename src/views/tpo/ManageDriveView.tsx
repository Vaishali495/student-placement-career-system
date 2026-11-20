import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Clock,
  Plus,
  Loader2,
  AlertCircle,
  Briefcase,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";
import type { Drive, UpdateDrivePayload } from "../../utils/types";
import { DriveStatus, WorkMode } from "../../utils/enums";
import {
  deleteDriveApi,
  getPlacementDrivesApi,
  updateDriveApi
} from "../../services/driveService";

interface EditDriveModalProps {
  drive: Drive;
  onClose: () => void;
  onSaved: (updated: Drive) => void;
}

const parseCsvToArray = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const toDatetimeLocalValue = (isoDate?: string): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
};

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

const getStatusStyle = (status?: string): string => {
  const normalized = (status || "").toLowerCase();
  if (normalized === "open") {
    return "bg-emerald-100 text-emerald-800 border border-emerald-200";
  }
  if (normalized === "closed") {
    return "bg-rose-100 text-rose-800 border border-rose-200";
  }
  return "bg-slate-100 text-slate-700 border border-slate-200";
};

const extractErrorMessage = (err: unknown, fallback: string): string => {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
};

const EditDriveModal: React.FC<EditDriveModalProps> = ({ drive, onClose, onSaved }) => {
  const [companyName, setCompanyName] = useState(drive.companyName || "");
  const [roleTitle, setRoleTitle] = useState(drive.roleTitle || "");
  const [jobType, setJobType] = useState(drive.jobType || "Full Time");
  const [location, setLocation] = useState(drive.location || "");
  const [batchYear, setBatchYear] = useState(String(drive.batchYear ?? "2026"));
  const [ctcTotal, setCtcTotal] = useState(String(drive.ctcTotal ?? ""));
  const [workMode, setWorkMode] = useState<WorkMode>(drive.workMode || WorkMode.ON_SITE);
  const [status, setStatus] = useState<DriveStatus>(drive.status || DriveStatus.OPEN);
  const [shiftTimings, setShiftTimings] = useState(drive.shiftTimings || "");
  const [registrationDeadline, setRegistrationDeadline] = useState(
    toDatetimeLocalValue(drive.registrationDeadline),
  );

  const [minCgpa, setMinCgpa] = useState(String(drive.eligibilityCriteria?.minCgpa ?? 0));
  const [maxBacklogsAllowed, setMaxBacklogsAllowed] = useState(
    String(drive.eligibilityCriteria?.maxBacklogsAllowed ?? 0),
  );
  const [allowedCoursesText, setAllowedCoursesText] = useState(
    (drive.eligibilityCriteria?.allowedCourses || []).join(", "),
  );
  const [allowedFieldsText, setAllowedFieldsText] = useState(
    (drive.eligibilityCriteria?.allowedFields || []).join(", "),
  );
  const [requiredSkillsText, setRequiredSkillsText] = useState(
    (drive.requiredSkills || []).join(", "),
  );
  const [description, setDescription] = useState(drive.description || "");

  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");

    const parsedBatch = Number(batchYear);
    const parsedCtc = Number(ctcTotal);

    if (!companyName.trim() || !roleTitle.trim() || !location.trim() || !description.trim()) {
      setModalError("Company Name, Role Title, Location, and Description are required.");
      return;
    }

    if (Number.isNaN(parsedBatch) || parsedBatch < 2000) {
      setModalError("Please enter a valid Batch Year.");
      return;
    }

    if (Number.isNaN(parsedCtc) || parsedCtc <= 0) {
      setModalError("Please enter a valid CTC (in LPA).");
      return;
    }

    const payload: UpdateDrivePayload = {
      companyName: companyName.trim(),
      roleTitle: roleTitle.trim(),
      jobType: jobType.trim() || "Full Time",
      location: location.trim(),
      batchYear: parsedBatch,
      ctcTotal: parsedCtc,
      workMode,
      status,
      shiftTimings: shiftTimings.trim(),
      eligibilityCriteria: {
        minCgpa: Number(minCgpa) || 0,
        maxBacklogsAllowed: Number(maxBacklogsAllowed) || 0,
        allowedCourses: parseCsvToArray(allowedCoursesText),
        allowedFields: parseCsvToArray(allowedFieldsText),
      },
      requiredSkills: parseCsvToArray(requiredSkillsText),
      description: description.trim(),
      ...(registrationDeadline
        ? { registrationDeadline: new Date(registrationDeadline).toISOString() }
        : {}),
    };

    try {
      setSaving(true);
      const res = await updateDriveApi(drive._id, payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to update placement drive.");
      }
      onSaved(res.data);
      onClose();
    } catch (err: unknown) {
      setModalError(extractErrorMessage(err, "Unable to update drive."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl space-y-5">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              UPDATE DRIVE
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Edit {drive.companyName} — {drive.roleTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {modalError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{modalError}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Role Title *
              </label>
              <input
                type="text"
                required
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                CTC Total (LPA) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={ctcTotal}
                onChange={(e) => setCtcTotal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Batch Year *
              </label>
              <input
                type="number"
                min="2000"
                required
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Job Type
              </label>
              <input
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(WorkMode).map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(DriveStatus).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Registration Deadline
              </label>
              <input
                type="datetime-local"
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Shift Timings
              </label>
              <input
                type="text"
                value={shiftTimings}
                onChange={(e) => setShiftTimings(e.target.value)}
                placeholder="e.g. 10:00 AM - 7:00 PM IST"
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Min CGPA
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={minCgpa}
                onChange={(e) => setMinCgpa(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Max Backlogs Allowed
              </label>
              <input
                type="number"
                min="0"
                value={maxBacklogsAllowed}
                onChange={(e) => setMaxBacklogsAllowed(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Allowed Courses (CSV)
              </label>
              <input
                type="text"
                value={allowedCoursesText}
                onChange={(e) => setAllowedCoursesText(e.target.value)}
                placeholder="B.Tech, MCA"
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Allowed Fields (CSV)
              </label>
              <input
                type="text"
                value={allowedFieldsText}
                onChange={(e) => setAllowedFieldsText(e.target.value)}
                placeholder="Computer Science and Engineering, IT"
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Required Skills (CSV)
            </label>
            <input
              type="text"
              value={requiredSkillsText}
              onChange={(e) => setRequiredSkillsText(e.target.value)}
              placeholder="React, Node.js, SQL"
              className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white text-xs font-bold px-5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManageDriveView: React.FC = () => {
  const navigate = useNavigate();

  const [drives, setDrives] = useState<Drive[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const [editingDrive, setEditingDrive] = useState<Drive | null>(null);
  const [deletingDrive, setDeletingDrive] = useState<Drive | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string>("");
  const [deletingLoading, setDeletingLoading] = useState<boolean>(false);

  const deferredQuery = useDeferredValue(searchQuery);

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
  }, [reloadNonce]);

  const handleRetry = () => {
    setLoading(true);
    setError("");
    setReloadNonce((prev) => prev + 1);
  };

  const handleQuickStatusChange = async (driveId: string, nextStatus: DriveStatus) => {
    try {
      setUpdatingStatusId(driveId);
      setFeedback("");
      const res = await updateDriveApi(driveId, { status: nextStatus });
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to update status.");
      }
      setDrives((prev) => prev.map((d) => (d._id === driveId ? res.data! : d)));
      setFeedback(`Drive status updated to ${nextStatus}.`);
    } catch (err: unknown) {
      setFeedback(extractErrorMessage(err, "Could not update drive status."));
    } finally {
      setUpdatingStatusId("");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingDrive) return;
    try {
      setDeletingLoading(true);
      setFeedback("");
      const res = await deleteDriveApi(deletingDrive._id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete drive.");
      }
      setDrives((prev) => prev.filter((d) => d._id !== deletingDrive._id));
      setFeedback(`Deleted "${deletingDrive.companyName} — ${deletingDrive.roleTitle}".`);
      setDeletingDrive(null);
    } catch (err: unknown) {
      setFeedback(extractErrorMessage(err, "Could not delete drive."));
    } finally {
      setDeletingLoading(false);
    }
  };

  const filteredDrives = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    return drives.filter((drive) => {
      if (statusFilter !== "ALL" && drive.status !== statusFilter) {
        return false;
      }

      if (!q) return true;

      return (
        drive.companyName.toLowerCase().includes(q) ||
        drive.roleTitle.toLowerCase().includes(q) ||
        drive.location.toLowerCase().includes(q) ||
        Boolean(drive.requiredSkills?.some((s) => s.toLowerCase().includes(q)))
      );
    });
  }, [drives, statusFilter, deferredQuery]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold">Loading placement drives...</p>
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Manage Placement Drives</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, update status, or delete campus placement drives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/tpo/create-drive")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Placement Drive
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback("")}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center shadow-xs">
        <div className="flex gap-2 items-center flex-1 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, role, location, or skill..."
            className="w-full text-xs bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-100 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl outline-none cursor-pointer"
        >
          <option value="ALL">All Statuses ({drives.length})</option>
          {Object.values(DriveStatus).map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Drives List */}
      {filteredDrives.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-sm font-bold text-slate-700">No placement drives found.</p>
          <p className="text-xs text-slate-400 mt-1">
            {drives.length === 0
              ? "Click 'Create Placement Drive' to add your first drive."
              : "Try changing the status filter or clearing the search query."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDrives.map((drive) => {
            const criteria = drive.eligibilityCriteria;
            const allowedStreams = [
              ...(criteria?.allowedCourses || []),
              ...(criteria?.allowedFields || []),
            ];

            return (
              <div
                key={drive._id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-blue-300 transition space-y-4"
              >
                {/* Top Row: Company, Role, CTC & Actions */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-black flex items-center justify-center text-lg shrink-0 uppercase">
                      {drive.companyName?.[0] || "C"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{drive.companyName}</h3>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase ${getStatusStyle(
                            drive.status,
                          )}`}
                        >
                          {drive.status || "Open"}
                        </span>
                        {drive.workMode && (
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md">
                            {drive.workMode}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {drive.roleTitle} • {drive.jobType || "Full Time"} • Batch {drive.batchYear}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto justify-between lg:justify-end">
                    <div className="text-left lg:text-right mr-1">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{drive.ctcTotal} <span className="text-xs font-bold">LPA</span>
                      </span>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {drive.shiftTimings || "Standard Shift"}
                      </p>
                    </div>

                    <select
                      aria-label={`Change status for ${drive.companyName}`}
                      disabled={updatingStatusId === drive._id}
                      value={drive.status || DriveStatus.OPEN}
                      onChange={(e) => void handleQuickStatusChange(drive._id, e.target.value as DriveStatus)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer"
                    >
                      {Object.values(DriveStatus).map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => setEditingDrive(drive)}
                      className="bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingDrive(drive)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>

                {/* Eligibility Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">
                      MIN CGPA
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {criteria?.minCgpa ?? 0}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">
                      MAX BACKLOGS
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {criteria?.maxBacklogsAllowed ?? 0}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">
                      COURSES &amp; FIELDS
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block truncate">
                      {allowedStreams.length > 0 ? allowedStreams.join(", ") : "All Eligible"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">
                      REGISTRATION DEADLINE
                    </span>
                    <span className="font-bold text-rose-600 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {formatDate(drive.registrationDeadline)}
                    </span>
                  </div>
                </div>

                {/* Required Skills */}
                {(drive.requiredSkills?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {(drive.requiredSkills || []).map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-50/70 text-blue-700 border border-blue-100 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                {drive.description && (
                  <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5 pt-1 border-t border-slate-100">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{drive.description}</span>
                  </p>
                )}

                {/* Footer Location */}
                <div className="flex items-center text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {drive.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingDrive && (
        <EditDriveModal
          key={editingDrive._id}
          drive={editingDrive}
          onClose={() => setEditingDrive(null)}
          onSaved={(updatedDrive) => {
            setDrives((prev) =>
              prev.map((item) => (item._id === updatedDrive._id ? updatedDrive : item)),
            );
            setFeedback(`Updated "${updatedDrive.companyName} — ${updatedDrive.roleTitle}".`);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingDrive && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Placement Drive?</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-slate-900">
                    {deletingDrive.companyName} ({deletingDrive.roleTitle})
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={deletingLoading}
                onClick={() => setDeletingDrive(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingLoading}
                onClick={() => void handleConfirmDelete()}
                className="bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                {deletingLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {deletingLoading ? "Deleting..." : "Delete Drive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDriveView;