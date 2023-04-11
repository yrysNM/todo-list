import React from "react";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

export const RouteLayout = ({ children }: IGeneralChildren) => {
  return <div className="container">{children}</div>;
};
