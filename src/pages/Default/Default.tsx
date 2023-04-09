import React from "react";
import { useLottie } from "lottie-react";

import defaultAnimation from "./default.json";

export const Default = () => {
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
      <p style={style.textError}>Sorry this page is not ready yet</p>
    </div>
  );
};
