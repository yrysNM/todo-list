import React from "react";
import { useNavigate } from "react-router-dom";

import { fetchUserLogin } from "../../redux/tool/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useToken } from "../../hooks/token.hook";
import { AuthTemplate } from "../../components/AuthTemplate";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { Spinner } from "../Sprinner";
import { ErrorMessage } from "../../components/ErrorMessage";

import TodoImg from "../../assets/img/todoImg.png";

type tLogin = { token: string };

const Login = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userLoading } = useAppSelector((state) => state.user);

  function confirmLogin(value: { email: string; password: string }) {
    dispatch(fetchUserLogin(value))
      .then((res) => {
        const { token } = res.payload as tLogin;

        setToken(token);
        navigate("/", { replace: false });
      })
      .catch((err) => console.log(err));
  }

  const initialContent = () => {
    if (userLoading === "loading") {
      return <Spinner />;
    } else if (userLoading === "error") {
      return <ErrorMessage errorText="Something went wrong" />;
    }

    return (
      <AuthLayout image={TodoImg} isLogin={true}>
        <AuthTemplate isLogin={true} getValueInput={confirmLogin} />
      </AuthLayout>
    );
  };

  const render = initialContent();

  return <>{render}</>;
};

export { Login };
