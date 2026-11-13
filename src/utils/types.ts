import { AcademicVerificationStatus, BTechField, SemesterStandingStatus } from "./enums";

export interface IPopulatedUser {
  _id: string;
  name: string;
  email: string;
  rollNumber?: string;
  role: "student" | "tpo";
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
  userId: IPopulatedUser | string; // Populated object aayega get-data API se
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