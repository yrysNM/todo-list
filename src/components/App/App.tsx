import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { RouteLayout } from "../layouts/RouteLayout";
import PrivateRoutes from "../../utils/PrivateRoutes";
import { Spinner } from "../../pages/Sprinner";
import {
  LoginPage,
  Page404,
  MainPage,
  RegisterPage,
  DefaultPage,
} from "../../pages";

import "./app.scss";

export const App = (): JSX.Element => {
  return (
    <Suspense fallback={<Spinner />}>
      <RouteLayout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/changePassword" element={<DefaultPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </RouteLayout>
    </Suspense>
  );
};
