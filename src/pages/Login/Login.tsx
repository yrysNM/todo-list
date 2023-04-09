import React from "react";

import { AuthTemplate } from "../../components/AuthTemplate";
import { AuthLayout } from "../../components/layouts/AuthLayout";

import TodoImg from "../../assets/img/todoImg.png";

const Login = () => {
  function confirmLogin(value: { email: string; password: string }) {
    console.log(value);
  }

  return (
    <AuthLayout image={TodoImg}>
      <AuthTemplate isLogin={true} getValueInput={confirmLogin} />;
    </AuthLayout>
  );
};

export { Login };
