import api from "./api";
import type { ApiResponse, IStudentProfile } from "../utils/types";
import { API_ENDPOINTS } from "./endPoints";

export interface TpoStudentRecord extends IStudentProfile {
  _id: string;
}

export const getStudentDataApi = async (userId?: string): Promise<ApiResponse<IStudentProfile>> => {
  const response = await api.get(API_ENDPOINTS.STUDENT.GET_DATA, {
    params: userId ? { userId } : undefined,
  });
  return response.data;
};

export const editStudentDataApi = async (data: FormData): Promise<ApiResponse<IStudentProfile>> => {
  const response = await api.post(API_ENDPOINTS.STUDENT.EDIT_PROFILE, data);
  return response.data;
};

export const getAllStudentsForTpoApi = async (): Promise<ApiResponse<TpoStudentRecord[]>> => {
  const response = await api.get("/tpo/students");
  return response.data;
};

export const verifyStudentProfileApi = async (profileId: string, status: "verified" | "rejected"): Promise<ApiResponse<TpoStudentRecord>> => {
  const response = await api.patch(`/tpo/students/${encodeURIComponent(profileId)}/verify`, {
    status,
  });
  return response.data;
};
