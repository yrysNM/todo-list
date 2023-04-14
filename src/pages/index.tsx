import { lazy } from "react";

const Page404 = lazy(() =>
  import("./404").then((page) => ({
    default: page.Page404,
  }))
);

const DefaultPage = lazy(() =>
  import("./Default").then((page) => ({
    default: page.Default,
  }))
);

const LoginPage = lazy(() =>
  import("./Login").then((module) => ({
    default: module.Login,
  }))
);

const MainPage = lazy(() =>
  import("./Main").then((module) => ({
    default: module.Main,
  }))
);

const RegisterPage = lazy(() =>
  import("../pages/Register").then((module) => ({
    default: module.Register,
  }))
);

export { Page404, LoginPage, MainPage, RegisterPage, DefaultPage };
