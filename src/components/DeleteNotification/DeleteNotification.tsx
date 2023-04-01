import React from "react";

import { CustomButton } from "../CustomButton";
import { setItems, updateCompletedItems } from "../../redux/tool/ItemsSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";

import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import "./deleteNotification.scss";

const DeleteNotification: React.FC<{
  task_id: string;
  content: string;
  onCancelButton: (value: boolean) => void;
}> = ({ task_id, content, onCancelButton }) => {
  const { items, completedItems } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  const deleteIconClick = async () => {
    dispatch(setItems(items.filter((item) => item.id !== task_id)));

    dispatch(
      updateCompletedItems(
        completedItems.items.filter((item) => item.id !== task_id)
      )
    );
    onCancelButton(false);
    await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${task_id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <InfoIcon className="icon infoModalIcon" />
      <div className="removeItem">
        <p className="title" style={{ marginTop: 20 }}>
          Are you sure you want to delete <b>{content}</b>?
        </p>

        <div className="form-btns">
          <CustomButton
            clazz="btn-cancel"
            type="button"
            onPressButton={() => onCancelButton(false)}
          >
            <span className="title title-cancel">Cancel</span>
          </CustomButton>
          <CustomButton
            clazz="btn-addTask"
            type="submit"
            isPrevent={false}
            onPressButton={deleteIconClick}
          >
            <span className="title title-addTask">Delete</span>
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export { DeleteNotification };
