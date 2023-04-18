import React, { useState } from "react";
import { useLottie } from "lottie-react";

import { Modal } from "../Modal";
import { useAppSelector } from "../../hooks/redux.hook";

import porfileAnimation from "../../assets/json/profile.json";
import "./header.scss";
import { UserTemplate } from "../UserTemplate";

const Header = () => {
  const { user, avatar } = useAppSelector((state) => state.user);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const options = {
    animationData: porfileAnimation,
    loop: false,
  };
  const { View } = useLottie(options);
  return (
    <>
      <header className="header">
        <h1 className="title title-600">Simple Todo-list</h1>

        <div className="userInfo">
          <span
            className="title title-500"
            onClick={() => {
              setIsOpenUserModal(true);
            }}
          >
            {user.full_name.length > 5 && window.innerWidth < 575
              ? `${user.full_name.slice(0, 5)}...`
              : user.full_name}
          </span>

          <span
            onClick={() => {
              setIsOpenUserModal(true);
            }}
            className="icon userProfile"
            style={{ cursor: "pointer", marginTop: 5 }}
          >
            {avatar ? (
              <img src={URL.createObjectURL(avatar)} alt="avator" />
            ) : (
              View
            )}
          </span>
        </div>
      </header>
      {isOpenUserModal && (
        <Modal onClose={() => setIsOpenUserModal(false)}>
          <UserTemplate onCloseModal={() => setIsOpenUserModal(false)} />
        </Modal>
      )}
    </>
  );
};

export { Header };
