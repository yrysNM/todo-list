import React from "react";

import { Header } from "../Header";
import { Today } from "../Today";

export const App = (): JSX.Element => {
  return (
    <div className="container">
      <Header />
      <Today />
    </div>
  );
}