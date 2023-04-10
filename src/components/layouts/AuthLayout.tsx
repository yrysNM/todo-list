import React from "react";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

interface IAuthLayout extends IGeneralChildren {
  image: string;
  isLogin: boolean;
}

export const AuthLayout = ({ image, children, isLogin }: IAuthLayout) => {
  return (
    <div className="auth">
      <div className="auth-block">
        <div className="todoImg">
          <img
            src={image}
            alt="todo img"
            style={{ transform: isLogin ? "rotateY(180deg)" : "rotateY(0deg)" }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
