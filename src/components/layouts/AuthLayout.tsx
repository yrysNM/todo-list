import React from "react";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

interface IAuthLayout extends IGeneralChildren {
  image: string;
}

export const AuthLayout = ({ image, children }: IAuthLayout) => {
  return (
    <div className="auth">
      <div className="auth-block">
        <div className="todoImg">
          <img src={image} alt="todo img" />
        </div>
        {children}
      </div>
    </div>
  );
};
