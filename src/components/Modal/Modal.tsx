import React from "react";

import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import "./modal.scss";

interface IModal extends IGeneralChildren {
  onClose: () => void;
}

const Modal: React.FC<IModal> = ({ children, onClose }) => {
  return (
    <div className="overlay overlay-modal">
      <div className="popup">
        {children}
        <div className="hamburger hamburger_active" onClick={onClose}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export { Modal };
