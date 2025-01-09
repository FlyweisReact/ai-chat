/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../store/authSlice";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(isAuthenticated);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
