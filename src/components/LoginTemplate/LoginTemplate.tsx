import React, { useState } from "react";
import classNames from "classnames";

import { CustomButton } from "../CustomButton";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import "./loginTemplate.scss";

type blur = {
  active: boolean;
  typeInput: string;
};

const LoginTemplate = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isBlur, setIsBlur] = useState<blur>({
    active: false,
    typeInput: "",
  });

  return (
    <div className="login">
      <div className="login-wrapper">
        <h3 className="loginText">Simple Todo-list</h3>
        <form className="form form-login">
          <LoginLayout labelText="Email" htmlFor="email" isBlur={isBlur}>
            <input
              name="email"
              id="email"
              type="email"
              className="input"
              value={email}
              onFocus={() => setIsBlur({ active: true, typeInput: "email" })}
              onBlur={() => setIsBlur({ active: false, typeInput: "email" })}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email-address..."
            />
          </LoginLayout>

          <LoginLayout labelText="Password" htmlFor="password" isBlur={isBlur}>
            <input
              name="password"
              id="password"
              className="input"
              type="password"
              value={password}
              onFocus={() => setIsBlur({ active: true, typeInput: "password" })}
              onBlur={() => setIsBlur({ active: false, typeInput: "password" })}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password…"
            />
          </LoginLayout>

          <CustomButton
            type="submit"
            clazz="btn-form"
            onPressButton={(e) => e.preventDefault()}
          >
            <span className="signInBtnSpan">Sign in</span>
          </CustomButton>
        </form>

        <div className="bottomTexts">
          <span className="sub-title">Forgot your password?</span>

          <p className="textSignUp">Don't have an account yet? Sign up</p>
        </div>
      </div>
    </div>
  );
};

interface ILoginLayout extends IGeneralChildren {
  labelText: string;
  htmlFor: string;
  isBlur: blur;
}

const LoginLayout = ({
  labelText,
  htmlFor,
  isBlur,
  children,
}: ILoginLayout) => {
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

export { LoginTemplate };
