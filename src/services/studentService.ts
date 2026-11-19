import api from "./api";
import type { ApiResponse, IStudentProfile } from "../utils/types";
import { API_ENDPOINTS } from "./endPoints";

export const getStudentDataApi = async (
  userId?: string,
): Promise<ApiResponse<IStudentProfile>> => {
  const response = await api.get(API_ENDPOINTS.STUDENT.GET_DATA, {
    params: userId ? { userId } : undefined,
  });
  return response.data;
};

export const editStudentDataApi = async (
  data: FormData,
): Promise<ApiResponse<IStudentProfile>> => {
  const response = await api.post(API_ENDPOINTS.STUDENT.EDIT_PROFILE, data);
  return response.data;
};