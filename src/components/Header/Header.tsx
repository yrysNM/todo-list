import React from "react";
import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux.hook";

import porfileAnimation from "../../assets/json/profile.json";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { full_name } = useAppSelector((state) => state.user);
  const options = {
    animationData: porfileAnimation,
    loop: false,
  };
  const { View } = useLottie(options);

  return (
    <header className="header">
      <h1 className="title title-600">Simple Todo-list</h1>

      <div className="userInfo">
        <span className="title-500">{full_name}</span>

        <span
          className="icon logOut"
          style={{ cursor: "pointer", marginTop: 5 }}
          onClick={() => {
            navigate("/notReady");
          }}
        >
          {View}
        </span>
      </div>
    </header>
  );
};

export { Header };
