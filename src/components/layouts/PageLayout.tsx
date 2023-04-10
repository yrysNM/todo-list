import React from "react";
import Lottie from "lottie-react";

import backgroundAnimation from "../../assets/json/backgroundAnimation.json";

import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";
import { Header } from "../Header";

export const PageLayout = ({ children }: IGeneralChildren) => {
  return (
    <React.Fragment>
      <Header />
      <div className="mainContent">{children}</div>
      <Lottie
        animationData={backgroundAnimation}
        className="templateAnimation"
      />
    </React.Fragment>
  );
};
