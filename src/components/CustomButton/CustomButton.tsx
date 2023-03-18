import React from "react";

import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import "./customBtn.scss";

interface ICustomBtn extends IGeneralChildren {
  clazz: string;
  type: "submit" | "button";
  onPressButton: () => void;
}

const CustomButton = ({
  clazz,
  type,
  onPressButton,
  children,
}: ICustomBtn): JSX.Element => {
  return (
    <button className={"btn " + clazz} type={type} onClick={onPressButton}>
      {children}
    </button>
  );
};

export { CustomButton };
