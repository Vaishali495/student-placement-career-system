import type { LucideIcon } from "lucide-react";
import type { AcademicVerificationStatus, BTechField, DriveFilterTab, DriveStatus, SemesterStandingStatus, UserRole, WorkMode } from "./enums";

// Generic Backend API Response Wrapper
export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data: T;
}

// Auth & User Types
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNumber?: string;
  course?: string;
  organization?: string;
  designation?: string;
}

export interface StudentRegisterPayload {
  name: string;
  email: string;
  rollNumber: string;
  password: string;
  course: string;
  role: UserRole;
}

export interface TpoRegisterPayload {
  name: string;
  email: string;
  password: string;
  organization: string;
  designation: string;
  role: UserRole;
}

export interface LoginPayload {
  identifier: string;
  password: string;
  activeTab?: string;
}

export interface LoginResponseData {
  token: string;
  user: AuthUser;
}

// Student Profile Types
export interface IPopulatedUser {
  _id: string;
  name: string;
  email: string;
  rollNumber?: string;
  role: UserRole | "student" | "tpo";
  organization?: string;
  designation?: string;
  isEmailVerified: boolean;
}

export interface ISemesterRecord {
  semesterNumber: number;
  sgpa: number;
  status: SemesterStandingStatus;
}

export interface ISchooling {
  tenthPercentage?: number;
  tenthBoard?: string;
  twelfthPercentage?: number;
  twelfthBoard?: string;
}

export interface IStudentProfile {
  _id?: string;
  userId: IPopulatedUser | string;
  studentId: string;
  course: string;
  field?: BTechField | string;
  graduationYear?: number;
  cgpa?: number;
  backlogCount: number;
  skills: string[];
  schooling?: ISchooling;
  semesterRecords?: ISemesterRecord[];
  academicVerification: {
    status: AcademicVerificationStatus | "pending" | "verified" | "rejected";
    verifiedBy?: string | null;
    verifiedAt?: string | null;
  };
  resume?: {
    url: string;
    publicId: string;
    updatedAt?: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

// Placement Drive Types
export interface Drive {
  _id: string;
  companyName: string;
  roleTitle: string;
  jobType: string;
  location: string;
  batchYear: number;
  ctcTotal: number;
  eligibilityCriteria: {
    minCgpa: number;
    allowedCourses: string[];
    allowedFields: string[];
    maxBacklogsAllowed: number;
  };
  requiredSkills: string[];
  registrationDeadline: string;
  description: string;
  shiftTimings?: string;
  workMode?: WorkMode | string;
  status: DriveStatus | string;
  isEligible?: boolean;
  eligibilityChecks?: {
    cgpaMet: boolean;
    backlogsMet: boolean;
    courseMet: boolean;
    fieldMet: boolean;
    batchMet: boolean;
  };
  matchedSkills?: string[];
  missingSkills?: string[];
  skillMatchPercent?: number;
  createdAt?: string
  updatedAt?: string
}

export interface CreateDrivePayload {
  companyName: string;
  roleTitle: string;
  jobType: string;
  location: string;
  batchYear: number;
  ctcTotal: number;
  eligibilityCriteria: {
    minCgpa: number;
    allowedCourses: string[];
    allowedFields: string[];
    maxBacklogsAllowed: number;
  };
  requiredSkills: string[];
  registrationDeadline: string;
  description: string;
  shiftTimings?: string;
  workMode?: WorkMode;
  status?: DriveStatus;
}

export interface IDriveTabItem {
  id: DriveFilterTab;
  label: string;
}

export interface INavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  badge: string | null;
}

export interface IFaqItem {
  icon: LucideIcon;
  question: string;
  answer: string;
}

export type UpdateDrivePayload = Partial<CreateDrivePayload>;