import React from "react";
import classNames from "classnames";

import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import {
  updateItems,
  setItems,
  updateCompletedItems,
  fetchCompletedItems,
  fetchItems,
} from "../../redux/tool/ItemsSlice";
import { toggleCompleteBtn } from "../../redux/tool/isCompletedBtnSlice";
import { IViewComponent } from "../../Interfaces";

import { ReactComponent as CompletedIcon } from "../../assets/icons/completed.svg";

import "./itemInfo.scss";

export const ItemInfo = ({
  content,
  description,
  is_completed,
  id,
}: IViewComponent) => {
  const { items, completedItems } = useAppSelector((state) => state.items);
  const { valBtn } = useAppSelector((state) => state.isCompletedBtn);
  const dispatch = useAppDispatch();

  const isCompletedClick = (id: string, value: boolean) => {
    dispatch(toggleCompleteBtn({ id, value }));

    if (value) {
      fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}/close`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        },
      }).then(() => {
        dispatch(updateItems({ id, is_completed }));

        const filterItems = items.filter((item) => item.id !== id);
        dispatch(setItems(filterItems));
      });

      dispatch(fetchCompletedItems());
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}/reopen`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
      }).then(() => {
        const filterCompleted = completedItems.items.filter(
          (item) => item.id !== id
        );

        dispatch(updateCompletedItems(filterCompleted));
      });

      dispatch(fetchItems());
    }
  };

  return (
    <div className="item-info">
      <span
        className={classNames(`completedCircle`, {
          icon_completedActive:
            is_completed || (valBtn.value && id === valBtn.id),
          completedCircleAnimation: !valBtn.value && id === valBtn.id,
        })}
        onClick={() => isCompletedClick(id, !is_completed)}
      >
        <CompletedIcon className="icon" />
      </span>

      <div className="taskDescr">
        <p
          className={classNames("title", {
            "title-done": is_completed,
          })}
        >
          {content}
        </p>
        <p
          className={classNames("sub-title", {
            "title-done": is_completed,
          })}
          style={{ marginTop: 4 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
