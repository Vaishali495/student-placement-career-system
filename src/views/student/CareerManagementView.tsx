import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../../context/StudentContext";
import { CAREER_ROLES } from "../../utils/constants";

export interface CareerRoleOption {
  id: string;
  roleTitle: string;
  packageRange: string;
  minCgpa: number;
  requiredSkills: string[];
}

const CareerManagementView: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useStudent();
  const [selectedRoleId, setSelectedRoleId] = useState<string>(CAREER_ROLES[0].id);

  const selectedRole = useMemo(
    () => CAREER_ROLES.find((r) => r.id === selectedRoleId) || CAREER_ROLES[0],
    [selectedRoleId],
  );

  const studentSkillsLower = useMemo(
    () => (profile?.skills || []).map((s) => s.toLowerCase().trim()),
    [profile?.skills],
  );

  const { matchedSkills, missingSkills, matchPercent } = useMemo(() => {
    const matched = selectedRole.requiredSkills.filter((skill) =>
      studentSkillsLower.includes(skill.toLowerCase().trim()),
    );
    const missing = selectedRole.requiredSkills.filter(
      (skill) => !studentSkillsLower.includes(skill.toLowerCase().trim()),
    );
    const percent =
      selectedRole.requiredSkills.length > 0
        ? Math.round((matched.length / selectedRole.requiredSkills.length) * 100)
        : 100;

    return { matchedSkills: matched, missingSkills: missing, matchPercent: percent };
  }, [selectedRole, studentSkillsLower]);

  const studentCgpa = profile?.cgpa;
  const cgpaEligibleForRole =
    studentCgpa === undefined || studentCgpa === null ? null : studentCgpa >= selectedRole.minCgpa;

  return (
    <div className="flex flex-col gap-6 p-1 bg-[#f8f9ff] min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            CAREER EXPLORATION & SKILL CHECK
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            Career Management
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Choose a target role to see which skills you already have and what to learn next.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/learning")}
          className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4" /> Learning Resources
        </button>
      </div>

      {/* Role Selector Pills */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col gap-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          SELECT TARGET CAREER ROLE
        </span>
        <div className="flex flex-wrap gap-2">
          {CAREER_ROLES.map((role) => {
            const isSelected = role.id === selectedRole.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRoleId(role.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {role.roleTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Role Summary */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-black text-slate-900">{selectedRole.roleTitle}</h3>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
              {selectedRole.packageRange}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Typical Benchmark: Min CGPA ≥ {selectedRole.minCgpa}
            {studentCgpa !== undefined && studentCgpa !== null && (
              <span className="font-bold text-slate-700"> • Your CGPA: {studentCgpa}</span>
            )}
          </p>
          {cgpaEligibleForRole !== null && (
            <p
              className={`text-xs font-bold flex items-center gap-1 pt-1 ${
                cgpaEligibleForRole ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {cgpaEligibleForRole ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Meets role CGPA benchmark
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Below role CGPA benchmark (keep improving CGPA)
                </>
              )}
            </p>
          )}
        </div>

        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl px-5 py-3 text-center shrink-0">
          <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">
            SKILL MATCH
          </span>
          <span className="text-2xl font-black text-blue-700">{matchPercent}%</span>
          <p className="text-[11px] text-slate-600 font-medium">
            {matchedSkills.length} of {selectedRole.requiredSkills.length} skills
          </p>
        </div>
      </div>

      {/* Matched vs Missing Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Skills You Have
            </h4>
            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
              {matchedSkills.length} Matched
            </span>
          </div>

          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              No matching skills found in your profile yet. Add skills in your Profile page.
            </p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" /> Skills to Learn
            </h4>
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
              {missingSkills.length} Missing
            </span>
          </div>

          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-xl"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-700 font-semibold">
              Great job! You have all core skills listed for {selectedRole.roleTitle}.
            </p>
          )}
        </div>
      </div>

      {/* Simple Footer Link to Learning Resources */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Want study links for these skills?</h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Browse curated topics and reference guides in Learning Resources.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/student/learning")}
          className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          Go to Learning Resources <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CareerManagementView;