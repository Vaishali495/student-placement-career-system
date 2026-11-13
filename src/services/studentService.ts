import api from "./api";

// Get student Profile data
export const getStudentDataApi = async (userId: string | undefined) => {
  const response = await api.get(`/student/get-data?userId=${userId}`);
  return response.data;
};

// Submit student Profile data
export const editStudentDataApi = async (data: any) => {
  const response = await api.post("/student/edit-profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
