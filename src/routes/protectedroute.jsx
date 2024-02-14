import React from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../helpers/authHelper";

export const Protectedroute = ({ children }) => {
  const authLogin = getSession();

  if (!authLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
