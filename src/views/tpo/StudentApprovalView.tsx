import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  GraduationCap,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import type { IPopulatedUser } from "../../utils/types";
import { AcademicVerificationStatus } from "../../utils/enums";
import {
  getAllStudentsForTpoApi,
  verifyStudentProfileApi,
  type TpoStudentRecord,
} from "../../services/studentService";

const getPopulatedUser = (record: TpoStudentRecord): Partial<IPopulatedUser> => {
  if (record.userId && typeof record.userId === "object") {
    return record.userId as IPopulatedUser;
  }
  return {};
};

const normalizeVerificationStatus = (status?: string): AcademicVerificationStatus => {
  switch ((status || "").toLowerCase()) {
    case "verified":
      return AcademicVerificationStatus.VERIFIED;
    case "rejected":
      return AcademicVerificationStatus.REJECTED;
    default:
      return AcademicVerificationStatus.PENDING;
  }
};

const getStatusBadgeStyle = (status?: string): string => {
  switch (normalizeVerificationStatus(status)) {
    case AcademicVerificationStatus.VERIFIED:
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case AcademicVerificationStatus.REJECTED:
      return "bg-rose-100 text-rose-800 border border-rose-200";
    default:
      return "bg-amber-100 text-amber-800 border border-amber-200";
  }
};

const extractErrorMessage = (err: unknown, fallback: string): string => {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
};

const StudentApprovalView: React.FC = () => {
  const [students, setStudents] = useState<TpoStudentRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [actionMsg, setActionMsg] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string>("");
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    let isMounted = true;

    const fetchStudents = async () => {
      try {
        const res = await getAllStudentsForTpoApi();
        if (!isMounted) return;

        if (!res.success) {
          setError(res.message || "Failed to fetch student profiles.");
        } else {
          const list = res.data || [];
          setError("");
          setStudents(list);
          setSelectedId((prev) => prev ?? list[0]?._id ?? null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(extractErrorMessage(err, "Something went wrong while loading students."));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchStudents();

    return () => {
      isMounted = false;
    };
  }, [reloadNonce]);

  const handleRetry = () => {
    setLoading(true);
    setError("");
    setReloadNonce((prev) => prev + 1);
  };

  const handleVerificationAction = async (
    profile: TpoStudentRecord,
    nextStatus: AcademicVerificationStatus,
  ) => {
    try {
      setUpdatingId(profile._id);
      setActionMsg("");

      const res = await verifyStudentProfileApi(profile._id, nextStatus);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to update verification status.");
      }

      setStudents((prev) =>
        prev.map((item) => (item._id === profile._id ? res.data! : item)),
      );

      const u = getPopulatedUser(profile);
      setActionMsg(
        `Marked ${u.name || profile.studentId} as ${nextStatus}.`,
      );
    } catch (err: unknown) {
      setActionMsg(extractErrorMessage(err, "Could not update verification status."));
    } finally {
      setUpdatingId("");
    }
  };

  const filteredStudents = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    return students.filter((record) => {
      const currentStatus = normalizeVerificationStatus(record.academicVerification?.status);
      if (statusFilter !== "ALL" && currentStatus !== statusFilter) {
        return false;
      }

      if (!q) return true;

      const u = getPopulatedUser(record);
      return (
        (u.name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (record.studentId || "").toLowerCase().includes(q) ||
        (record.course || "").toLowerCase().includes(q) ||
        (record.field || "").toLowerCase().includes(q)
      );
    });
  }, [students, statusFilter, deferredQuery]);

  const selectedStudent = useMemo(
    () =>
      filteredStudents.find((s) => s._id === selectedId) ||
      students.find((s) => s._id === selectedId) ||
      filteredStudents[0] ||
      null,
    [filteredStudents, students, selectedId],
  );

  const pendingCount = useMemo(
    () =>
      students.filter(
        (s) =>
          normalizeVerificationStatus(s.academicVerification?.status) ===
          AcademicVerificationStatus.PENDING,
      ).length,
    [students],
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold">Loading student profiles...</p>
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

  const selectedUser = selectedStudent ? getPopulatedUser(selectedStudent) : null;
  const selectedStatus = normalizeVerificationStatus(
    selectedStudent?.academicVerification?.status,
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            TPO STUDENT VERIFICATION
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Student Academic Approvals
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review student CGPA, backlogs, skills, and resumes to approve or reject profiles.
          </p>
        </div>

        <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3.5 py-2 rounded-xl shrink-0">
          Pending Verification: {pendingCount}
        </span>
      </div>

      {actionMsg && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{actionMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns: Student Directory & Filters */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, roll/student ID, course, or field..."
                className="w-full text-xs bg-slate-100 pl-9 pr-3 py-2.5 rounded-xl outline-none text-slate-800 font-medium"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-100 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl outline-none cursor-pointer"
            >
              <option value="ALL">All ({students.length})</option>
              {Object.values(AcademicVerificationStatus).map((st) => (
                <option key={st} value={st} className="capitalize">
                  {st}
                </option>
              ))}
            </select>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl">
              <p className="text-sm font-bold text-slate-700">No student records found.</p>
              <p className="text-xs text-slate-400 mt-1">
                Try changing the status filter or clearing the search input.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStudents.map((record) => {
                const u = getPopulatedUser(record);
                const name = u.name || "Student";
                const st = normalizeVerificationStatus(record.academicVerification?.status);
                const isSelected = selectedStudent?._id === record._id;

                return (
                  <div
                    key={record._id}
                    onClick={() => setSelectedId(record._id)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/30"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0 uppercase">
                        {name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{name}</p>
                        <p className="text-xs text-slate-500 truncate">
                          ID: {record.studentId} • {record.course || "N/A"}
                          {record.field ? ` (${record.field})` : ""}
                          {record.graduationYear ? ` • Batch ${record.graduationYear}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto text-xs shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="font-bold text-slate-900 block">
                          CGPA: {record.cgpa !== undefined ? Number(record.cgpa).toFixed(2) : "N/A"}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Backlogs: {record.backlogCount ?? 0}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${getStatusBadgeStyle(
                          st,
                        )}`}
                      >
                        {st}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 1 Column: Selected Student Review & Approval Panel */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
          {!selectedStudent ? (
            <div className="py-10 text-center text-xs text-slate-500 font-medium">
              Select a student to inspect academic details and resume.
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 ${getStatusBadgeStyle(
                    selectedStatus,
                  )}`}
                >
                  {selectedStatus === AcademicVerificationStatus.VERIFIED ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : selectedStatus === AcademicVerificationStatus.REJECTED ? (
                    <XCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {selectedStatus}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  ID: {selectedStudent.studentId}
                </span>
              </div>

              <div className="text-center py-1">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto uppercase">
                  {(selectedUser?.name || "S").charAt(0)}
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {selectedUser?.name || "Student Name"}
                </h3>
                <p className="text-xs text-slate-500">{selectedUser?.email || "Not Provided"}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 text-xs border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Course &amp; Field</span>
                  <span className="font-bold text-slate-800 text-right">
                    {selectedStudent.course || "N/A"}
                    {selectedStudent.field ? ` • ${selectedStudent.field}` : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">CGPA</span>
                  <span className="font-bold text-blue-600">
                    {selectedStudent.cgpa !== undefined
                      ? `${Number(selectedStudent.cgpa).toFixed(2)} / 10`
                      : "Not Set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Active Backlogs</span>
                  <span className="font-bold text-slate-800">
                    {selectedStudent.backlogCount ?? 0}
                  </span>
                </div>
                {selectedStudent.graduationYear && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Graduation Year</span>
                    <span className="font-bold text-slate-800">
                      {selectedStudent.graduationYear}
                    </span>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> Skills
                </span>
                {(selectedStudent.skills?.length ?? 0) > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedStudent.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No skills added.</p>
                )}
              </div>

              {/* Resume Link */}
              <div>
                {selectedStudent.resume?.url ? (
                  <a
                    href={selectedStudent.resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>View Resume</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                ) : (
                  <div className="w-full bg-slate-50 border border-dashed border-slate-200 text-slate-400 font-semibold text-xs py-2.5 px-3 rounded-xl text-center">
                    No Resume Uploaded
                  </div>
                )}
              </div>

              {/* Approve / Reject Actions */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={updatingId === selectedStudent._id}
                  onClick={() =>
                    void handleVerificationAction(
                      selectedStudent,
                      AcademicVerificationStatus.VERIFIED,
                    )
                  }
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {updatingId === selectedStudent._id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  Approve
                </button>

                <button
                  type="button"
                  disabled={updatingId === selectedStudent._id}
                  onClick={() =>
                    void handleVerificationAction(
                      selectedStudent,
                      AcademicVerificationStatus.REJECTED,
                    )
                  }
                  className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {updatingId === selectedStudent._id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  Reject
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentApprovalView;