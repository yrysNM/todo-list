import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = false;
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
