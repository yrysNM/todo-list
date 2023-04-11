import React from "react";
import { useLottie } from "lottie-react";

import spinnerAnimation from "./loading.json";

export const Spinner = () => {
  const options = {
    animationData: spinnerAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  const style = {
    spinner: {
      display: "grid",
      placeItems: "center",
      height: "50vh",
    },
  };

  return (
    <div style={style.spinner}>
      <div style={{ height: 100, width: 100 }}>{View}</div>
    </div>
  );
};
