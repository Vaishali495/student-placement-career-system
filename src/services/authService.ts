import api from "./api";
import type {
  ApiResponse,
  AuthUser,
  LoginPayload,
  LoginResponseData,
  StudentRegisterPayload,
  TpoRegisterPayload,
} from "../utils/types";
import { API_ENDPOINTS } from "./endPoints";

export const registerStudentApi = async (
  data: StudentRegisterPayload,
): Promise<ApiResponse<{ user: AuthUser }>> => {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER_STUDENT, data);
  return response.data;
};

export const registerTpoApi = async (
  data: TpoRegisterPayload,
): Promise<ApiResponse<{ user: AuthUser }>> => {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER_TPO, data);
  return response.data;
};

export const loginApi = async (
  data: LoginPayload,
): Promise<ApiResponse<LoginResponseData>> => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

export const verifyEmailApi = async (token: string): Promise<ApiResponse> => {
  const response = await api.get(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
    params: { token },
  });
  return response.data;
};

export const resendVerificationApi = async (email: string): Promise<ApiResponse> => {
  const response = await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
  return response.data;
};