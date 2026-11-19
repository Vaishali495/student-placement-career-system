import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../utils/enums";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    // If User is not logged In -> Redirect to Login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar specific role allowed missing hai ya unauthorized access attempt ho
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Student TPO dashboard access karne ki koshish kare ya vice-versa
    const defaultRedirect = user.role === UserRole.TPO ? "/tpo/dashboard" : "/student/dashboard";
    return <Navigate to={defaultRedirect} replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Logged-in user ke role ke hisab se exact dashboard redirect
    const redirectUrl = user?.role === UserRole.TPO ? "/tpo/dashboard" : "/student/dashboard";
    return <Navigate to={redirectUrl} replace />;
  }

  return <Outlet />;
};