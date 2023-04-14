import React, { useState, useEffect } from "react";
import { useLottie } from "lottie-react";

import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { typeUser } from "../../redux/tool/UserSlice";

import porfileAnimation from "../../assets/json/profile.json";
import "./userTemplate.scss";

export const UserTemplate = () => {
  const { user } = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<typeUser>();
  const dispatch = useAppDispatch();
  const options = {
    animationData: porfileAnimation,
    loop: false,
  };
  const { View } = useLottie(options);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    if (user.id) {
      setUserData(user);
    }
  }, [user]);

  return (
    <div className="userInformation">
      <div className="userAvatar">{View}</div>
      <div className="userInformation_texts">
        <form className="form form-user">
          <input
            type="text"
            name="full_name"
            id="full_name"
            className="input input-user"
            value={userData?.full_name ?? ""}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};
