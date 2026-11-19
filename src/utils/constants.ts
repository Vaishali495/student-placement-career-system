import { BookOpen, Briefcase, FileText, GraduationCap, KeyRound, LayoutDashboard, PlusCircle, ShieldAlert, User, UserCheck, Users } from "lucide-react";
import type { IFaqItem, INavItem } from "./types";
import type { CareerRoleOption } from "../views/student/CareerManagementView";

export const STUDENT_NAV_ITEMS: INavItem[] = [
  { id: "dashboard", label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard, badge: null },
  { id: "drives", label: "Job & Placement Drives", path: "/student/drives", icon: Briefcase, badge: "14 Active" },
  { id: "applications", label: "My Applications", path: "/student/applications", icon: FileText, badge: "3 In Progress" },
  { id: "profile", label: "Student Profile & Resume", path: "/student/profile", icon: User, badge: null },
  { id: "career", label: "Career Management", path: "/student/career", icon: GraduationCap, badge: null },
  { id: "learning", label: "Learning Resources", path: "/student/learning", icon: BookOpen, badge: null },
];

export const TPO_NAV_ITEMS: INavItem[] = [
  { id: "tpo-dashboard", label: "TPO Overview", path: "/tpo/dashboard", icon: LayoutDashboard, badge: null },
  { id: "create-drive", label: "Create Drives", path: "/tpo/create-drive", icon: PlusCircle, badge: null },
  { id: "manage-drives", label: "Manage Drives", path: "/tpo/manage-drives", icon: Briefcase, badge: "8 Live" },
  { id: "student-approval", label: "Students Approval", path: "/tpo/student-approvals", icon: Users, badge: "1.2k Total" },
];

export const LOGIN_FAQS: IFaqItem[] = [
  {
    icon: KeyRound,
    question: "Forgot Passcode or Password?",
    answer:
      "Use the 'Forgot Password?' link on the login form. An OTP or password reset link will be sent to your registered institutional email (@campus.edu).",
  },
  {
    icon: UserCheck,
    question: "Roll Number / Institutional Email Not Recognized?",
    answer:
      "Ensure you are entering your complete roll number without dashes or your official university seat email. First-year or lateral entry students must be verified by the TPO cell before first login.",
  },
  {
    icon: ShieldAlert,
    question: "Account Locked or 'Session Unauthorized' Error?",
    answer:
      "Accounts automatically lock for 15 minutes after 5 consecutive failed authentication attempts in compliance with campus security policy.",
  },
];


export const CAREER_ROLES: CareerRoleOption[] = [
  {
    id: "full-stack",
    roleTitle: "Full Stack Developer",
    packageRange: "₹6L – ₹14L",
    minCgpa: 7.0,
    requiredSkills: ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "SQL", "Git"],
  },
  {
    id: "frontend",
    roleTitle: "Frontend Engineer",
    packageRange: "₹5L – ₹12L",
    minCgpa: 7.0,
    requiredSkills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Git"],
  },
  {
    id: "backend",
    roleTitle: "Backend Engineer",
    packageRange: "₹6L – ₹15L",
    minCgpa: 7.0,
    requiredSkills: ["Node.js", "TypeScript", "SQL", "MongoDB", "REST APIs", "Git", "Docker"],
  },
  {
    id: "software-engineer",
    roleTitle: "Software Engineer (SDE)",
    packageRange: "₹7L – ₹18L",
    minCgpa: 7.5,
    requiredSkills: ["Data Structures", "Algorithms", "Java", "C++", "SQL", "OOP", "Git"],
  },
];