import api from "./api";
import type { ApiResponse } from "../utils/types";
import { API_ENDPOINTS } from "./endPoints";

export interface PopulatedApplicationDrive {
  _id: string;
  companyName: string;
  roleTitle: string;
  jobType: string;
  location: string;
  batchYear: number;
  ctcTotal: number;
  registrationDeadline: string;
  workMode?: string;
  status: string;
}

export interface StudentApplicationItem {
  _id: string;
  studentId: string;
  driveId: PopulatedApplicationDrive | string;
  appliedResumeUrl: string;
  currentStage: number;
  status: string;
  tpoRemarks?: string;
  createdAt: string;
  updatedAt: string;
}

export const getMyApplicationsApi = async (): Promise<
  ApiResponse<StudentApplicationItem[]>
> => {
  const response = await api.get(API_ENDPOINTS.APPLICATIONS.MY_APPLICATIONS);
  return response.data;
};