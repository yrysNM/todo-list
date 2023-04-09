import React from "react";

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { AuthTemplate } from "../../components/AuthTemplate";

import TodoImg from "../../assets/img/todoImg.png";

const Register = () => {
  const registerUser = (value: { email: string; password: string }) => {
    console.log(value);
  };

  return (
    <AuthLayout image={TodoImg}>
      <AuthTemplate isLogin={false} getValueInput={registerUser} />
    </AuthLayout>
  );
};

export { Register };
