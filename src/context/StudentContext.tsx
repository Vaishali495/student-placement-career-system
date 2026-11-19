/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getStudentDataApi } from "../services/studentService";
import { UserRole } from "../utils/enums";
import type { IStudentProfile } from "../utils/types";

interface StudentContextType {
  profile: IStudentProfile | null;
  loadingProfile: boolean;
  refreshProfile: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<IStudentProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);

  const studentId = isAuthenticated && user?.role === UserRole.STUDENT ? user.id : undefined;

  // React Compiler automatically memoizes this without manual useCallback
  const refreshProfile = async () => {
    if (!studentId) return;
    try {
      const res = await getStudentDataApi(studentId);
      if (res.success) {
        setProfile(res.data);
      }
    } catch (error) {
      console.error("Error refreshing student profile:", error);
    }
  };

  // Initial fetch on student login / session load
  useEffect(() => {
    if (!studentId) return;

    let isMounted = true;

    const loadInitialProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await getStudentDataApi(studentId);
        if (isMounted && res.success) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        if (isMounted) {
          setLoadingProfile(false);
        }
      }
    };

    loadInitialProfile();

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  const activeProfile = studentId ? profile : null;
  const activeLoading = studentId ? loadingProfile : false;

  return (
    <StudentContext.Provider
      value={{
        profile: activeProfile,
        loadingProfile: activeLoading,
        refreshProfile,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};