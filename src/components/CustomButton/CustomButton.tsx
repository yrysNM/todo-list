import React from "react";

import "./customBtn.scss";

interface ICustomBtn {
  clazz: string;
  type: "submit" | "button";
  onPressButton: () => void;
  children: React.ReactNode;
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
