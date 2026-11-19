import api from "./api";
import type { ApiResponse, CreateDrivePayload, Drive } from "../utils/types";
import { API_ENDPOINTS } from "./endPoints";

export const getPlacementDrivesApi = async (): Promise<ApiResponse<Drive[]>> => {
  const response = await api.get(API_ENDPOINTS.DRIVES.GET_ALL);
  return response.data;
};

export const createDriveApi = async (
  data: CreateDrivePayload,
): Promise<ApiResponse<Drive>> => {
  const response = await api.post(API_ENDPOINTS.DRIVES.CREATE, data);
  return response.data;
};