export const UserRole = {
  STUDENT: "student",
  TPO: "tpo",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const Course = {
  BTECH: "Btech",
  BCA: "BCA",
  MCA: "MCA",
  BBA: "BBA",
  MBA: "MBA",
} as const;

export type Course = (typeof Course)[keyof typeof Course];

export const BTechField = {
  CSE: "Computer Science and Engineering",
  IT: "Information Technology",
  ECE: "Electronics and Communication Engineering",
  MECH: "Mechanical Engineering",
  CIVIL: "Civil Engineering",
  AI_ML: "Artificial Intelligence and Machine Learning",
  OTHER: "Other / General Engineering",
};

export type BTechField = (typeof BTechField)[keyof typeof BTechField];

export const BTechFieldCode = {
  CSE: "CSE",
  IT: "IT",
  ECE: "ECE",
  MECH: "MECH",
  CIVIL: "CIVIL",
  AI_ML: "AI/ML",
  OTHER: "OTHER",
};

export type BTechFieldCode = (typeof BTechFieldCode)[keyof typeof BTechFieldCode];

// Semester Academic Standing Status
export const SemesterStandingStatus = {
  CLEARED: "Cleared",
  BACKLOG: "Backlog",
  ONGOING: "Ongoing",
};

export type SemesterStandingStatus = (typeof SemesterStandingStatus)[keyof typeof SemesterStandingStatus];

export const AcademicVerificationStatus = {
  PENDING: "Pending",
  VERIFIED: "Verified",
  REJECTED: "Rejected",
};

export type AcademicVerificationStatus = (typeof AcademicVerificationStatus)[keyof typeof AcademicVerificationStatus];

export const DriveFilterTab = {
  ALL: "all",
  ELIGIBLE: "eligible",
  NOT_ELIGIBLE: "not_eligible",
  FULL_TIME: "full_time",
  INTERNSHIP: "internship",
} as const;

export type DriveFilterTab = (typeof DriveFilterTab)[keyof typeof DriveFilterTab];

export const DriveStatus = {
  OPEN: "Open",
  CLOSED: "Closed",
  ARCHIVED: "Archived",
};

export type DriveStatus = (typeof DriveStatus)[keyof typeof DriveStatus];

export const WorkMode = {
  ON_SITE: "Work from Office",
  REMOTE: "Work from Home",
  HYBRID: "Hybrid",
};

export type WorkMode = (typeof WorkMode)[keyof typeof WorkMode];

export const ApplicationStatus = {
  APPLIED: "Applied",
  OA_PENDING: "OA Pending",
  SHORTLISTED: "Shortlisted",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  OFFERED: "Offered",
  REJECTED: "Rejected",
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
