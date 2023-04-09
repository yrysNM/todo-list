import React from "react";

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { AuthTemplate } from "../../components/AuthTemplate";

import TodoImg from "../../assets/img/todoImg2.png";

const Register = () => {
  const registerUser = (value: { email: string; password: string }) => {
    console.log(value);
  };

  return (
    <AuthLayout image={TodoImg} isLogin={false}>
      <AuthTemplate isLogin={false} getValueInput={registerUser} />
    </AuthLayout>
  );
};

export { Register };
