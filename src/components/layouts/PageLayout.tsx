import React from "react";
import Lottie from "lottie-react";

import { useAppSelector } from "../../hooks/redux.hook";
import backgroundAnimation from "../../assets/json/backgroundAnimation.json";

import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";
import { Header } from "../Header";

export const PageLayout = ({ children }: IGeneralChildren) => {
  const { items } = useAppSelector((state) => state.items);

  return (
    <React.Fragment>
      <Header />
      <div className="mainContent">{children}</div>
      <Lottie
        animationData={backgroundAnimation}
        className="templateAnimation"
        style={{ top: items.length < 4 && items.length !== 0 ? "100%" : "50%" }}
      />
    </React.Fragment>
  );
};
