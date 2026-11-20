import api from "./api";
import type {
  ApiResponse,
  CreateDrivePayload,
  Drive,
  UpdateDrivePayload,
} from "../utils/types";
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

const resolveEndpoint = (template: string, id: string) =>
  template.replace(":id", encodeURIComponent(id));

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

export const updateDriveApi = async (
  driveId: string,
  data: UpdateDrivePayload,
): Promise<ApiResponse<Drive>> => {
  const url = resolveEndpoint(API_ENDPOINTS.DRIVES.UPDATE, driveId);
  const response = await api.patch(url, data);
  return response.data;
};

export const deleteDriveApi = async (
  driveId: string,
): Promise<ApiResponse<{ _id: string }>> => {
  const url = resolveEndpoint(API_ENDPOINTS.DRIVES.DELETE, driveId);
  const response = await api.delete(url);
  return response.data;
};

export const applyToDriveApi = async (
  driveId: string,
): Promise<ApiResponse<DriveApplication>> => {
  const response = await api.post(API_ENDPOINTS.APPLICATIONS.APPLY, { driveId });
  return response.data;
};