import React, { useState, useEffect } from "react";
import { useLottie } from "lottie-react";

import { CustomInputLayout } from "../CustomInputLayout";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import {
  fetchUpdateUser,
  typeUser,
  updateUserValue,
} from "../../redux/tool/UserSlice";
import { typeBlur } from "../../../types/customTypes";
import { CustomButton } from "../CustomButton";

import porfileAnimation from "../../assets/json/profile.json";
import "./userTemplate.scss";

export const UserTemplate = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<Partial<typeUser>>();
  const [isBlur, setIsBlur] = useState<typeBlur>({
    active: false,
    typeInput: "",
  });
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
    dispatch(
      updateUserValue({
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchUpdateUser(userData));
    onCloseModal();
  };

  useEffect(() => {
    if (user.id) {
      setUserData({
        full_name: user.full_name,
        email: user.email,
        id: user.id,
      });
    }
  }, [user]);

  return (
    <div className="userInformation">
      <div className="userAvatar-block">
        <span className="userAvatarView">{View}</span>
        <CustomButton
          clazz="btn-uploadUserAvatar"
          type="button"
          onPressButton={() => console.log("upload image")}
        >
          <p className="title">Upload image</p>
        </CustomButton>
      </div>
      <div className="userInformation-inputs">
        <form className="form form-user" onSubmit={handleSubmit}>
          <CustomInputLayout
            labelText="Full name"
            htmlFor="full_name"
            isBlur={isBlur}
          >
            <input
              type="text"
              name="full_name"
              id="full_name"
              className="input"
              value={userData?.full_name ?? ""}
              onChange={handleChange}
              onFocus={() =>
                setIsBlur({ active: true, typeInput: "full_name" })
              }
              onBlur={() =>
                setIsBlur({ active: false, typeInput: "full_name" })
              }
              placeholder="Enter the name"
            />
          </CustomInputLayout>

          <CustomInputLayout labelText="Email" htmlFor="email" isBlur={isBlur}>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              value={userData?.email ?? ""}
              onChange={handleChange}
              onFocus={() => setIsBlur({ active: true, typeInput: "email" })}
              onBlur={() => setIsBlur({ active: false, typeInput: "email" })}
              placeholder="Enter the email"
            />
          </CustomInputLayout>

          <CustomButton
            type="submit"
            clazz="btn-form btn-userUpdate"
            onPressButton={handleSubmit}
          >
            <span className="title title-addTask">Update</span>
          </CustomButton>
        </form>
      </div>
    </div>
  );
};
