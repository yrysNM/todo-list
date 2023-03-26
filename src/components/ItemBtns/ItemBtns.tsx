import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/redux.hook";

import { DeleteNotification } from "../DeleteNotification";
import { AddTaskForm } from "../AddTaskForm";
import { Modal } from "../Modal";
import { fetchItem } from "../../redux/tool/ItemsSlice";

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { CustomButton } from "../CustomButton";

export const ItemBtns = ({
  task_id,
  content,
}: {
  task_id: string;
  content: string;
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const editIconClick = () => {
    dispatch(fetchItem(task_id));
    setIsOpenEdit(true);
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
          onPressButton={() => setIsOpenDelete(true)}
        >
          <TrashIcon className="iconRed" />
        </CustomButton>
      </div>
      {isOpenEdit && (
        <Modal onClose={() => setIsOpenEdit(false)}>
          <AddTaskForm setIsAddTask={(value) => setIsOpenEdit(value)} />
        </Modal>
      )}

      {isOpenDelete && (
        <Modal onClose={() => setIsOpenDelete(false)}>
          <DeleteNotification
            content={content}
            task_id={task_id}
            onCancelButton={(value) => setIsOpenDelete(value)}
          />
        </Modal>
      )}
    </>
  );
};
