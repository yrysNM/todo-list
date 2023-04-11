import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useToken } from "../hooks/token.hook";

const PrivateRoutes = () => {
  const { token } = useToken();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
