import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

import { CustomButton } from "../CustomButton";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import "./authTemplate.scss";

type blur = {
  active: boolean;
  typeInput: string;
};

type inputValues = {
  email: string;
  password: string;
};

interface IAuthTemplate {
  isLogin: boolean;
  getValueInput: ({ email, password }: inputValues) => void;
}

const AuthTemplate = ({ isLogin, getValueInput }: IAuthTemplate) => {
  const [isBlur, setIsBlur] = useState<blur>({
    active: false,
    typeInput: "",
  });

  // const validate = (values: inputValues) => {
  //   const errors: inputValues = {
  //     email: "",
  //     password: "",
  //   };

  //   if (!values.email) {
  //     errors.email = "Obligatory field!";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Wrong email address";
  //   }

  //   if (!values.password) {
  //     errors.password = "Obligatory field!";
  //   } else if (values.password.length < 8) {
  //     errors.password = "At least 8 characters";
  //   } else if (
  //     // eslint-disable-next-line no-useless-escape
  //     /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
  //       values.password
  //     )
  //   ) {
  //     errors.password =
  //       "Must consist of Latin letters, special characters, and single digits.";
  //   }

  //   return errors;
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Wrong email address.")
        .required("Obligatory field!"),
      password: Yup.string()
        .required("Obligatory field!")
        .min(8, "At least 8 characters.")
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must consist of Latin letters, special characters, and single digits."
        ),
    }),
    onSubmit: (values) => {
      getValueInput(values);
    },
  });

  return (
    <div className="auth-wrapper">
      <h3 className="authText">Simple Todo-list</h3>

      <form className="form form-auth" onSubmit={formik.handleSubmit}>
        <LoginLayout labelText="Email" htmlFor="email" isBlur={isBlur}>
          <input
            name="email"
            id="email"
            type="email"
            className="input"
            value={formik.values.email}
            onFocus={() => setIsBlur({ active: true, typeInput: "email" })}
            onBlur={(e) => {
              setIsBlur({ active: false, typeInput: "email" });
              formik.handleBlur(e);
            }}
            onChange={formik.handleChange}
            placeholder="Enter Email-address..."
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="sub-title errorText">{formik.errors.email}</p>
          ) : null}
        </LoginLayout>

        <LoginLayout labelText="Password" htmlFor="password" isBlur={isBlur}>
          <input
            name="password"
            id="password"
            className="input"
            type="password"
            autoComplete="on"
            value={formik.values.password}
            onFocus={() => setIsBlur({ active: true, typeInput: "password" })}
            onBlur={(e) => {
              formik.handleBlur(e);
              setIsBlur({ active: false, typeInput: "password" });
            }}
            onChange={formik.handleChange}
            placeholder="Enter password…"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="sub-title errorText">{formik.errors.password}</p>
          ) : null}
        </LoginLayout>

        <CustomButton
          type="submit"
          clazz="btn-form"
          onPressButton={formik.handleSubmit}
        >
          {isLogin ? (
            <span className="signInUpBtnSpan">Sign in</span>
          ) : (
            <span className="signInUpBtnSpan">Sign up via Email</span>
          )}
        </CustomButton>
      </form>

      <BottomTexts isLogin={isLogin} />
    </div>
  );
};

const BottomTexts: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const navigate = useNavigate();

  return (
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
