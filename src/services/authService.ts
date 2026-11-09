import api from "./api";

// Student Registration
export const registerStudentApi = async (data: any) => {
  const response = await api.post("/auth/register-student", data);
  return response.data;
};

// TPO Registration
export const registerTpoApi = async (data: any) => {
  const response = await api.post("/auth/register-tpo", data);
  return response.data;
};

// User Login (Email or Roll No)
export const loginApi = async (data: { identifier: string; password: string; activeTab?: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const verifyEmailApi = async (token: string) => {
  console.log("in email verify")
  const response = await api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
  console.log("response of verify email: ",response.data);
  return response.data;
};

// Resend Verification Email
export const resendVerificationApi = async (email: string) => {
  const response = await api.post("/auth/resend-verification", { email });
  return response.data;
};