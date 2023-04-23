import React from "react";
import classNames from "classnames";

import { typeBlur } from "../../../types/customTypes";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import "./customInputLayout.scss";

interface ICustomInputLayout extends IGeneralChildren {
  labelText: string;
  htmlFor: string;
  isBlur: typeBlur;
}

export const CustomInputLayout: React.FC<ICustomInputLayout> = ({
  labelText,
  htmlFor,
  isBlur,
  children,
}) => {
  return (
    <div
      className={classNames("inputLabel", {
        "inputLabel-active": isBlur.active && htmlFor === isBlur.typeInput,
      })}
    >
      <label htmlFor={htmlFor} className="title-500 label">
        {labelText}
      </label>
      {children}
    </div>
  );
};
