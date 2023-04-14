import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import { useToken } from "../../hooks/token.hook";

import loqOutAnimation from "../../assets/json/logout.json";
import "./logout.scss";

export const Logout = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();

  return (
    <span
      className="logout"
      onClick={() => {
        setToken("");
        navigate("/login", { replace: false });
      }}
    >
      Logout
      <Lottie animationData={loqOutAnimation} className="logOut" />
    </span>
  );
};
