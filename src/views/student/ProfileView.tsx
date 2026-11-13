import { useEffect, useState } from "react";
import { Download, Edit, Mail, ShieldCheck, CheckCircle2, FileText, GraduationCap, Code2, Eye, Loader2, Clock } from "lucide-react";
import EditProfileModal from "../../components/student/EditProfileModal";
import { useAuth } from "../../context/AuthContext";
import { getStudentDataApi } from "../../services/studentService";
import type { IPopulatedUser, ISemesterRecord, IStudentProfile } from "../../utils/types";

const ProfileView = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("academic");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [profileData, setProfileData] = useState<IStudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Reusable function for EditProfileModal (onSaveSuccess)
  const refreshProfile = async () => {
    if (!user?.id) return;
    try {
      const res = await getStudentDataApi(user.id);
      if (res.success) {
        setProfileData(res.data);
      }
    } catch (error) {
      console.error("Error refreshing student profile:", error);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const loadProfile = async () => {
      try {
        const res = await getStudentDataApi(user.id);
        if (isMounted && res.success) {
          setProfileData(res.data);
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const populatedUser = profileData?.userId && typeof profileData.userId === "object" ? (profileData.userId as IPopulatedUser) : null;

  const userInfo = {
    name: populatedUser?.name || user?.name || "Student Name",
    email: populatedUser?.email || user?.email || "Not Provided",
    rollNumber: populatedUser?.rollNumber || user?.rollNumber || "N/A",
    isEmailVerified: populatedUser?.isEmailVerified ?? false,
  };

  const semesterRecords = profileData?.semesterRecords || [];
  const skillsList = profileData?.skills || [];
  const verificationStatus = profileData?.academicVerification?.status || "pending";
  const isVerified = verificationStatus === "verified";

  // Find Peak SGPA for highlighting bar chart
  const maxSgpa = semesterRecords.length > 0 ? Math.max(...semesterRecords.map((s: ISemesterRecord) => Number(s.sgpa) || 0)) : 0;

  return (
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      {/* 1. Main Student Profile Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Avatar & Personal Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-3xl font-black text-blue-700 shadow-xs uppercase">
                {userInfo.name ? userInfo.name.charAt(0) : "S"}
              </div>
              {isVerified && (
                <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-600 text-white p-1 rounded-full border-2 border-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-slate-900">{userInfo.name || "Student Name"}</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-md">
                  {profileData?.studentId || userInfo.rollNumber || "N/A"}
                </span>
                {profileData?.graduationYear && (
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-md uppercase">
                    Cohort {profileData.graduationYear}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-800">
                  {profileData?.course || "Course Not Set"}
                  {profileData?.field ? ` in ${profileData.field}` : ""}
                </span>
              </p>

              {/* Clearance Tags */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span
                  className={`border text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 capitalize ${
                    isVerified
                      ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                      : verificationStatus === "rejected"
                        ? "bg-red-50 text-red-800 border-red-100"
                        : "bg-amber-50 text-amber-800 border-amber-100"
                  }`}>
                  {isVerified ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-amber-600" />}
                  TPO Verification: {verificationStatus}
                </span>

                {userInfo.isEmailVerified && (
                  <span className="bg-blue-50 text-blue-800 border border-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Email Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2.5 w-full lg:w-auto shrink-0">
            {profileData?.resume?.url ? (
              <a
                href={profileData.resume.url}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> View / Download Resume
              </a>
            ) : (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" /> Upload Resume
              </button>
            )}

            <button
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              onClick={() => setIsEditModalOpen(true)}>
              <Edit className="w-3.5 h-3.5 text-slate-500" /> Edit Profile
            </button>

            {/* Edit Profile Modal Integration */}
            {isEditModalOpen && (
              <EditProfileModal
                key={profileData?._id || "edit-profile-modal"}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialData={profileData}
                onSaveSuccess={refreshProfile}
              />
            )}
          </div>
        </div>

        {/* Contact Info Footer Bar inside Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50/80 border border-slate-100 rounded-2xl text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">CAMPUS EMAIL</span>
            <span className="font-bold text-slate-800 mt-1 flex items-center gap-1.5 truncate">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {userInfo.email || "Not Provided"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">STUDENT ROLL ID</span>
            <span className="font-bold text-slate-800 mt-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {profileData?.studentId || userInfo.rollNumber || "Not Added"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">CURRENT CUMULATIVE GPA</span>
            <span className="text-base font-black text-blue-600 mt-0.5 block">
              {profileData?.cgpa ? Number(profileData.cgpa).toFixed(2) : "N/A"}{" "}
              {profileData?.cgpa && <span className="text-xs font-normal text-slate-400">/ 10.0</span>}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">STANDING & DISCIPLINE</span>
            <span className="font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {profileData?.backlogCount ?? 0} Active Backlogs
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sub Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={() => setActiveTab("academic")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "academic" ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
          }`}>
          <GraduationCap className="w-4 h-4" /> Academic Records
        </button>

        <button
          onClick={() => setActiveTab("resume")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "resume" ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
          }`}>
          <FileText className="w-4 h-4" /> Resume & Documents Hub
          {/* {profileData?.resume?.atsScore ? (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                activeTab === "resume" ? "bg-white text-blue-700" : "bg-emerald-100 text-emerald-800"
              }`}>
              ATS {profileData.resume.atsScore}
            </span>
          ) : null} */}
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "skills" ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
          }`}>
          <Code2 className="w-4 h-4" /> Technical & Domain Skills ({skillsList.length})
        </button>
      </div>

      {/* 3. Main Split Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2/3 Width): Dynamic Tab Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "academic" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Semester-wise Grade Trajectory</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Validated against institutional ERP semester marksheet logs</p>
                </div>
                <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1 rounded-xl">
                  CUMULATIVE: {profileData?.cgpa ? `${Number(profileData.cgpa).toFixed(2)} CGPA` : "NOT SET"}
                </span>
              </div>

              {semesterRecords.length > 0 ? (
                <>
                  {/* Bar Chart Visualizer */}
                  <div className="bg-slate-50/80 border border-slate-100 p-6 rounded-2xl">
                    <div className="flex items-end justify-around h-48 pt-6 px-4">
                      {semesterRecords.map((item: ISemesterRecord, idx: number) => {
                        const sgpaVal = Number(item.sgpa) || 0;
                        const isPeak = sgpaVal === maxSgpa && sgpaVal > 0;
                        return (
                          <div key={idx} className="flex flex-col items-center h-full justify-end group">
                            <span className="text-xs font-extrabold text-slate-800 mb-2 opacity-90">{sgpaVal.toFixed(2)}</span>
                            <div
                              style={{ height: `${(sgpaVal / 10) * 100}%` }}
                              className={`w-12 rounded-t-xl transition-all duration-300 ${
                                isPeak ? "bg-emerald-600 group-hover:bg-emerald-700" : "bg-[#2563eb] group-hover:bg-blue-700"
                              }`}></div>
                            <span className={`text-xs font-bold mt-3 ${isPeak ? "text-emerald-700" : "text-slate-600"}`}>
                              Sem {item.semesterNumber}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Transcript Table */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3">
                      <span>SEMESTER</span>
                      <span>SGPA</span>
                      <span className="text-right">STANDING STATUS</span>
                    </div>

                    <div className="space-y-2">
                      {semesterRecords.map((row: ISemesterRecord, idx: number) => (
                        <div
                          key={idx}
                          className="grid grid-cols-3 items-center bg-slate-50/80 border border-slate-100 p-3.5 rounded-xl text-xs font-medium">
                          <span className="font-bold text-slate-800">Semester {row.semesterNumber}</span>
                          <span className="font-black text-blue-600">{Number(row.sgpa).toFixed(2)}</span>
                          <div className="flex justify-end">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">{row.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-slate-50/80 border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">No Semester Records Added Yet</p>
                  <p className="text-[11px] text-slate-500">Click "Edit Profile" to add your semester-wise SGPA and CGPA details.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "resume" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Placement Resume Document</h3>
              {profileData?.resume?.url ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Verified Placement Resume</p>
                      <p className="text-[11px] text-slate-500">
                        {profileData.resume.updatedAt
                          ? `Last updated: ${new Date(profileData.resume.updatedAt).toLocaleDateString()}`
                          : "Ready for campus drives"}
                      </p>
                    </div>
                  </div>
                  <a
                    href={profileData.resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Open PDF
                  </a>
                </div>
              ) : (
                <div className="bg-slate-50/80 border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">No Resume Uploaded</p>
                  <p className="text-[11px] text-slate-500">Upload your latest PDF resume via Edit Profile to apply for drives.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Technical & Domain Skills</h3>
              {skillsList.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3.5 py-1.5 rounded-xl">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50/80 border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">No Skills Listed Yet</p>
                  <p className="text-[11px] text-slate-500">Add your programming languages, frameworks, and tools in Edit Profile.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (1/3 Width): Eligibility & Pre-requisites Widgets */}
        <div className="space-y-6">
          {/* Eligibility & Pre-requisites Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Eligibility & Pre-requisites</h3>

            {/* Backlog Clearance Alert */}
            <div className="bg-emerald-50/80 border border-emerald-100 p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{profileData?.backlogCount ?? 0} Active & Historical Backlogs</span>
              </div>
              <p className="text-[11px] text-emerald-700 leading-relaxed pl-6">
                {(profileData?.backlogCount ?? 0) === 0
                  ? "Eligible for Tier-1 drives with zero-arrear standing."
                  : "Check drive-specific backlog criteria before applying."}
              </p>
            </div>

            {/* 10th Secondary Score */}
            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-900">Class 10th (Secondary)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{profileData?.schooling?.tenthBoard || "Board not added"}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-blue-600">
                  {profileData?.schooling?.tenthPercentage ? `${profileData.schooling.tenthPercentage}%` : "N/A"}
                </span>
              </div>
            </div>

            {/* 12th Sr Secondary Score */}
            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-900">Class 12th (Sr. Secondary)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{profileData?.schooling?.twelfthBoard || "Board not added"}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-blue-600">
                  {profileData?.schooling?.twelfthPercentage ? `${profileData.schooling.twelfthPercentage}%` : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* TPO Verification Seals Widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">TPO VERIFICATION SEALS</h3>

            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${isVerified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 capitalize">Status: {verificationStatus}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {profileData?.academicVerification?.verifiedAt
                    ? `Verified on ${new Date(profileData.academicVerification.verifiedAt).toLocaleDateString()}`
                    : "Awaiting TPO review & approval"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
