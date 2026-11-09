import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../types/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

// 1. Protected Route Guard (Bina login wale user dashboard access nahi kar sakte)
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // If User is not logged In -> Redirect to Login
    return <Navigate to="/login" replace />;
  }

  // Agar specific role allowed missing hai ya unauthorized access attempt ho
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Student TPO dashboard access karne ki koshish kare ya vice-versa
    const defaultRedirect = user.role === UserRole.TPO ? "/tpo/dashboard" : "/student/dashboard";
    return <Navigate to={defaultRedirect} replace />;
  }

  return <Outlet />;
};

// 2. Public Only Route Guard (Logged-in user login/register page open nahi kar sakta)
export const PublicOnlyRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Logged-in user ke role ke hisab se exact dashboard redirect
    const redirectUrl = user?.role === UserRole.TPO ? "/tpo/dashboard" : "/student/dashboard";
    return <Navigate to={redirectUrl} replace />;
  }

  return <Outlet />;
};