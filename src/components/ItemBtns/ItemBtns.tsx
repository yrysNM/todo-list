import React, { useState } from "react";

import { AddTaskForm } from "../AddTaskForm";
import { Modal } from "../Modal";

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { CustomButton } from "../CustomButton";

export const ItemBtns = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="item-methods">
        <CustomButton
          clazz="btn-icon"
          type="button"
          onPressButton={() => setIsOpen(true)}
        >
          <EditIcon />
        </CustomButton>
        <CustomButton
          clazz="btn-icon"
          type="button"
          onPressButton={() => console.log("trash")}
        >
          <TrashIcon className="iconRed" />
        </CustomButton>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <AddTaskForm setIsAddTask={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
};
