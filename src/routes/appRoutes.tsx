import React from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { UserRole } from "../types/auth";

// Student Views
import DashboardView from "../views/student/DashboardView";
import PlacementDrivesView from "../views/student/PlacementDrivesView";
import ProfileView from "../views/student/ProfileView";

// TPO Views
import CreateDriveView from "../views/tpo/CreateDriveView";
import { ProtectedRoute, PublicOnlyRoute } from "../components/RouteGuards";
import LoginView from "../views/auth/LoginView";
import RegisterView from "../views/auth/RegisterView";
import VerifyEmailNotice from "../views/auth/VerifyEmailNotice";
import VerifyEmailView from "../views/auth/VerifyEmailView";
import DashboardLayout from "../components/DashboardLayout";
import MyApplicationView from "../views/student/MyApplicationsView";
import TpoDashboardLayout from "../components/tpo/TpoDashboardLayout";
import TpoDashboardView from "../views/tpo/DashboardView";
import ManageDriveView from "../views/tpo/ManageDriveView";
import StudentApprovalView from "../views/tpo/StudentApprovalView";
import LearningResourcesView from "../views/student/LearningResourcesView";
import CareerManagementView from "../views/student/CareerManagementView";

export const appRoutes: RouteObject[] = [
  // 1. PUBLIC / GUEST ONLY ROUTES
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/login", element: <LoginView /> },
      { path: "/register", element: <RegisterView /> },
      { path: "/verify-email-notice", element: <VerifyEmailNotice /> },
      { path: "/verify-email", element: <VerifyEmailView /> },
    ],
  },

  // 2. PROTECTED STUDENT ROUTES
  {
    element: <ProtectedRoute allowedRoles={[UserRole.STUDENT]} />,
    children: [
      {
        path: "/student",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardView /> },
          { path: "drives", element: <PlacementDrivesView /> },
          { path: "applications", element: <MyApplicationView /> },
          { path: "profile", element: <ProfileView /> },
          { path: "career", element: <CareerManagementView /> },
          { path: "learning", element: <LearningResourcesView /> },
        ],
      },
    ],
  },

  // 3. PROTECTED TPO ROUTES
  {
    element: <ProtectedRoute allowedRoles={[UserRole.TPO]} />,
    children: [
      {
        path: "/tpo",
        element: <TpoDashboardLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <TpoDashboardView /> },
          { path: "create-drive", element: <CreateDriveView /> },
          { path: "manage-drives", element: <ManageDriveView /> },
          { path: "student-approvals", element: <StudentApprovalView /> },
        ],
      },
    ],
  },

  // 4. FALLBACK ROUTE
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];