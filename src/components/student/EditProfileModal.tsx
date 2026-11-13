import React, { useState } from "react";
import { X, Upload, Plus, Trash2, GraduationCap, Award, Code2, FileText, Loader2 } from "lucide-react";
import { editStudentDataApi } from "../../services/studentService";
import { BTechField, Course, SemesterStandingStatus } from "../../utils/enums";
import type { IStudentProfile } from "../../utils/types";
import { useAuth } from "../../context/AuthContext";

interface ISemesterRecord {
  semesterNumber: number;
  sgpa: number;
  status: SemesterStandingStatus;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IStudentProfile | null;
  onSaveSuccess?: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, initialData, onSaveSuccess }) => {
  const { user } = useAuth();
  const resolvedUserId =
    typeof initialData?.userId === "object" && initialData.userId !== null
      ? initialData.userId._id
      : typeof initialData?.userId === "string"
        ? initialData.userId
        : user?.id || "";

  // 1. Basic Academic State
  const [course, setCourse] = useState(initialData?.course || "");
  const [field, setField] = useState<string>(initialData?.field || BTechField.CSE);
  const [graduationYear, setGraduationYear] = useState<string | number>(initialData?.graduationYear || "");
  const [cgpa, setCgpa] = useState<string | number>(initialData?.cgpa ?? "");
  const [backlogCount, setBacklogCount] = useState<number>(initialData?.backlogCount ?? 0);

  // 2. Secondary Schooling State
  const [tenthPercentage, setTenthPercentage] = useState<string | number>(initialData?.schooling?.tenthPercentage ?? "");
  const [tenthBoard, setTenthBoard] = useState(initialData?.schooling?.tenthBoard || "");
  const [twelfthPercentage, setTwelfthPercentage] = useState<string | number>(initialData?.schooling?.twelfthPercentage ?? "");
  const [twelfthBoard, setTwelfthBoard] = useState(initialData?.schooling?.twelfthBoard || "");

  // 3. Technical Skills Management
  const [skills, setSkills] = useState<string[]>(Array.isArray(initialData?.skills) ? initialData.skills : []);
  const [newSkill, setNewSkill] = useState("");

  // Semester Records State
  const [semesterRecords, setSemesterRecords] = useState<ISemesterRecord[]>(
    Array.isArray(initialData?.semesterRecords) && initialData.semesterRecords.length > 0
      ? initialData.semesterRecords
      : [{ semesterNumber: 1, sgpa: 0, status: SemesterStandingStatus.CLEARED }],
  );

  // 5. Resume File & UI State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Semester Row Handlers
  const handleAddSemester = () => {
    const nextSemNo = semesterRecords.length + 1;
    setSemesterRecords([...semesterRecords, { semesterNumber: nextSemNo, sgpa: 0, status: SemesterStandingStatus.CLEARED }]);
  };

  const handleSemesterChange = <K extends keyof ISemesterRecord>(index: number, key: K, value: ISemesterRecord[K]) => {
    const updatedRecords = [...semesterRecords];
    updatedRecords[index] = {
      ...updatedRecords[index],
      [key]: value,
    };
    setSemesterRecords(updatedRecords);
  };

  const handleRemoveSemester = (index: number) => {
    const updatedRecords = semesterRecords.filter((_, i) => i !== index);
    const reIndexed = updatedRecords.map((item, idx) => ({ ...item, semesterNumber: idx + 1 }));
    setSemesterRecords(reIndexed);
  };

  // Skill Add & Remove Handlers
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const isBTech = course?.toLowerCase().replace(/\./g, "").trim() === "btech" || course === Course.BTECH;

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("userId", resolvedUserId);
      formData.append("course", course.trim());
      if (isBTech && field) {
        formData.append("field", field);
      }
      if (graduationYear !== "") formData.append("graduationYear", graduationYear.toString());
      if (cgpa !== "") formData.append("cgpa", cgpa.toString());
      formData.append("backlogCount", backlogCount.toString());

      // Schooling Details
      formData.append(
        "schooling",
        JSON.stringify({
          tenthPercentage: tenthPercentage !== "" ? Number(tenthPercentage) : undefined,
          tenthBoard: tenthBoard.trim(),
          twelfthPercentage: twelfthPercentage !== "" ? Number(twelfthPercentage) : undefined,
          twelfthBoard: twelfthBoard.trim(),
        }),
      );

      // Dynamic Semester Records Array
      formData.append("semesterRecords", JSON.stringify(semesterRecords));

      // Technical Skills
      formData.append("skills", JSON.stringify(skills));

      // Resume File (Optional)
      if (resumeFile) {
        console.log("resumeFile: ",resumeFile);
        formData.append("resume", resumeFile);
      }

      // Call Backend Endpoint
      const response = await editStudentDataApi(formData);

      if (response?.success) {
        if (onSaveSuccess) onSaveSuccess();
        onClose();
      } else {
        setErrorMsg(response?.message || "Failed to update profile.");
      }
    } catch (error: unknown) {
      console.error("Failed to save profile:", error);
      const errMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Something went wrong while saving profile.";
      setErrorMsg(errMessage);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" /> Update Student Profile
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Fill in your verified academic details, skills, and placement resume document.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Banner */}
        {errorMsg && <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">{errorMsg}</div>}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto font-sans">
          {/* SECTION 1: Academic Fundamentals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Academic Program & CGPA</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Degree Course <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  placeholder="e.g. B.Tech"
                  required
                />
              </div>

              {isBTech && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Branch / Field of Study <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium cursor-pointer">
                    {Object.values(BTechField).map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Graduation Cohort Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="2000"
                  max="2035"
                  value={graduationYear}
                  placeholder="e.g. 2026"
                  onChange={(e) => setGraduationYear(e.target.value ? Number(e.target.value) : "")}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Cumulative CGPA <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  placeholder="e.g. 8.84"
                  onChange={(e) => setCgpa(e.target.value ? Number(e.target.value) : "")}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Active Backlogs / Arrears Count <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={backlogCount}
                  placeholder="0"
                  onChange={(e) => setBacklogCount(Number(e.target.value))}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Schooling Background */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-slate-400" /> Secondary & Higher Secondary Scores
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class 10th Score (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={tenthPercentage}
                  onChange={(e) => setTenthPercentage(e.target.value ? Number(e.target.value) : "")}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  placeholder="e.g. 95.2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class 10th Board</label>
                <input
                  type="text"
                  value={tenthBoard}
                  onChange={(e) => setTenthBoard(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  placeholder="e.g. CBSE / ICSE / State Board"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class 12th Score (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={twelfthPercentage}
                  onChange={(e) => setTwelfthPercentage(e.target.value ? Number(e.target.value) : "")}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  placeholder="e.g. 93.8"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class 12th Board</label>
                <input
                  type="text"
                  value={twelfthBoard}
                  onChange={(e) => setTwelfthBoard(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                  placeholder="e.g. CBSE / State Board"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Semester-wise Academic Logs */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Semester Grade Trajectory</h4>
              <button
                type="button"
                onClick={handleAddSemester}
                className="text-xs text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Semester
              </button>
            </div>

            {/* Header Row (12-Column Grid Layout) */}
            <div className="grid grid-cols-12 gap-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3">
              <span className="col-span-3">Semester</span>
              <span className="col-span-4">SGPA (0-10)</span>
              <span className="col-span-4">Status</span>
              <span className="col-span-1 text-center">Action</span>
            </div>

            {/* Dynamic Semester Rows */}
            <div className="space-y-2">
              {semesterRecords.map((sem, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-3 items-center bg-slate-50/80 p-2.5 border border-slate-100 rounded-xl">
                  {/* 1. Semester Label (Col Span 3) */}
                  <div className="col-span-3 text-xs font-bold text-slate-800 px-1">Semester {sem.semesterNumber}</div>

                  {/* 2. SGPA Input Field (Col Span 4) */}
                  <div className="col-span-4">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={sem.sgpa}
                      onChange={(e) => handleSemesterChange(idx, "sgpa", Number(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-semibold text-blue-600 shadow-xs"
                      placeholder="SGPA"
                      required
                    />
                  </div>

                  {/* 3. Standing Status Dropdown (Col Span 4) */}
                  <div className="col-span-4">
                    <select
                      value={sem.status}
                      onChange={(e) => handleSemesterChange(idx, "status", e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-semibold text-slate-800 cursor-pointer shadow-xs">
                      <option value={SemesterStandingStatus.CLEARED}>Cleared</option>
                      <option value={SemesterStandingStatus.BACKLOG}>Backlog</option>
                      <option value={SemesterStandingStatus.ONGOING}>Ongoing</option>
                    </select>
                  </div>

                  {/* 4. Delete Action Button (Col Span 1) */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveSemester(idx)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Remove Semester">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: Technical Skills Array */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-slate-400" /> Technical Skills & Competencies
            </h4>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                placeholder="Add skill (e.g. Docker, React, Python)"
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Skill Badges Display */}
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500 transition-colors cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 5: Placement Resume Upload */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" /> Placement Resume Document
            </h4>

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 text-center transition-all">
              <input
                type="file"
                id="resumeUpload"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label htmlFor="resumeUpload" className="cursor-pointer flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {resumeFile
                      ? resumeFile.name
                      : initialData?.resume?.url
                        ? "Current Resume Uploaded • Click to replace PDF"
                        : "Click to select updated PDF Resume"}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">PDF format up to 5MB (ATS Optimized)</p>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveLoading}
              className="bg-[#2563eb] hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2">
              {saveLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {saveLoading ? "Saving Updates..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
