import React from "react";
import { useLottie } from "lottie-react";

import defaultAnimation from "./default.json";

export const Default = ({ text }: { text: string }) => {
  const options = {
    animationData: defaultAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  const style = {
    blockS: {
      display: "grid",
      placeItems: "center",
    },
    textError: {
      marginTop: "20px",
    },
  };

  return (
    <div style={style.blockS}>
      <div style={{ height: "auto", width: 300 }}>{View}</div>
      <p style={style.textError}>{text}</p>
    </div>
  );
};
