import api from "./api";
import type { ApiResponse, CreateDrivePayload, Drive } from "../utils/types";
import { API_ENDPOINTS } from "./endPoints";

export interface DriveApplication {
  _id: string;
  studentId: string;
  driveId: string;
  appliedResumeUrl: string;
  currentStage: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

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

export const applyToDriveApi = async (
  driveId: string,
): Promise<ApiResponse<DriveApplication>> => {
  const response = await api.post(API_ENDPOINTS.APPLICATIONS.APPLY, { driveId });
  return response.data;
};