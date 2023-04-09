import { useState } from "react";

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken: string = JSON.parse(tokenString);

    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", JSON.stringify(userToken));

    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};
