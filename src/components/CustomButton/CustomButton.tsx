import React from "react";

import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import "./customBtn.scss";

interface ICustomBtn extends IGeneralChildren {
  clazz: string;
  type: "submit" | "button";
  onPressButton: (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  isPrevent?: boolean;
}

const CustomButton = ({
  clazz,
  type,
  onPressButton,
  isPrevent = false,
  children,
}: ICustomBtn): JSX.Element => {
  return (
    <button
      className={`btn ${isPrevent ? "prevent " : ""}` + clazz}
      type={type}
      disabled={isPrevent}
      onClick={onPressButton}
    >
      {children}
    </button>
  );
};

export { CustomButton };
