import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StoredToken } from "../../types/posts/postsTypes";

type Props = {
  logged: StoredToken | null;
  children: React.ReactElement;
};

export const ProtectedRoute: React.FC<Props> = ({ logged, children }) => {
  if (!logged) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};
