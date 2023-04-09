import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { RouteLayout } from "../layouts/RouteLayout";

import PrivateRoutes from "../../utils/PrivateRoutes";

import "./app.scss";

const LoginPage = lazy(() =>
  import("../../pages/Login").then((module) => ({
    default: module.Login,
  }))
);

const MainPage = lazy(() =>
  import("../../pages/Main").then((module) => ({
    default: module.Main,
  }))
);

export const App = (): JSX.Element => {
  return (
    <RouteLayout>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </RouteLayout>
  );
};
