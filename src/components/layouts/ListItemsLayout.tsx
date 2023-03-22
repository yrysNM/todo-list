import React from "react";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

export const ListItemsLayout = ({ children }: IGeneralChildren) => (
  <div className="list">{children}</div>
);
