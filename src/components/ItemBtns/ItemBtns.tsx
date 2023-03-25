import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/redux.hook";

import { AddTaskForm } from "../AddTaskForm";
import { Modal } from "../Modal";
import { fetchItem } from "../../redux/tool/ItemsSlice";

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { CustomButton } from "../CustomButton";

export const ItemBtns = ({ task_id }: { task_id: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const editIconClick = () => {
    dispatch(fetchItem(task_id));
    setIsOpen(true);
  };

  return (
    <>
      <div className="item-methods">
        <CustomButton
          clazz="btn-icon"
          type="button"
          onPressButton={() => editIconClick()}
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
          <AddTaskForm setIsAddTask={(value) => setIsOpen(value)} />
        </Modal>
      )}
    </>
  );
};
