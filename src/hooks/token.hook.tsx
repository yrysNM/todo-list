import { useState } from "react";
import { setItem, getItem } from "../utils/PresistanceStorage";

export const useToken = () => {
  const getToken = () => {
    const tokenString = getItem<string>("token");

    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    setItem<string>("token", userToken);

    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};
