import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { CustomButton } from "../CustomButton";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import "./authTemplate.scss";

type blur = {
  active: boolean;
  typeInput: string;
};

interface IAuthTemplate {
  isLogin: boolean;
  getValueInput: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
}

const AuthTemplate = ({ isLogin, getValueInput }: IAuthTemplate) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isBlur, setIsBlur] = useState<blur>({
    active: false,
    typeInput: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getValueInput({
      email,
      password,
    });

    console.log(
      JSON.stringify(
        {
          email,
          password,
        },
        null,
        2
      )
    );
  }

  return (
    <div className="auth-wrapper">
      <h3 className="authText">Simple Todo-list</h3>
      <form className="form form-auth" onSubmit={handleSubmit}>
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
            autoComplete="on"
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
          onPressButton={handleSubmit}
        >
          {isLogin ? (
            <span className="signInUpBtnSpan">Sign in</span>
          ) : (
            <span className="signInUpBtnSpan">Sign up via Email</span>
          )}
        </CustomButton>
      </form>

      <div className="bottomTexts">
        {isLogin && (
          <span
            className="sub-title navigateSpan"
            onClick={() => navigate("/changePassword", { replace: true })}
          >
            Forgot your password?
          </span>
        )}

        {isLogin ? (
          <p className="textSignUpIn">
            Don't have an account yet?{" "}
            <span
              className="navigateSpan"
              onClick={() => navigate("/register", { replace: true })}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="textSignUpIn">
            Already have an account?{" "}
            <span
              className="navigateSpan"
              onClick={() => navigate("/login", { replace: true })}
            >
              Then sign in
            </span>
          </p>
        )}
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

export { AuthTemplate };
