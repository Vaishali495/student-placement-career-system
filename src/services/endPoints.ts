export const API_ENDPOINTS = {
  AUTH: {
    REGISTER_STUDENT: "/auth/register-student",
    REGISTER_TPO: "/auth/register-tpo",
    LOGIN: "/auth/login",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
  },
  STUDENT: {
    GET_DATA: "/student/get-data",
    EDIT_PROFILE: "/student/edit-profile",
  },
  DRIVES: {
    GET_ALL: "/drive",
    CREATE: "/drive/create",
  },
} as const;