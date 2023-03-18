import React from "react";

import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";
import { Header } from "../Header";

export const PageLayout = ({ children }: IGeneralChildren) => {
  return (
    <React.Fragment>
      <Header />
      <div className="mainContent">{children}</div>
    </React.Fragment>
  );
};
