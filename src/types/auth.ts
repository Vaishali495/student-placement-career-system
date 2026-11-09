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
