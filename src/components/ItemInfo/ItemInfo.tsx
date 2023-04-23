import React from "react";
import classNames from "classnames";

import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import {
  setItems,
  updateCompletedItems,
  toggleComplteItems,
} from "../../redux/tool/ItemsSlice";
import { toggleCompleteBtn } from "../../redux/tool/isCompletedBtnSlice";
import { IViewComponent } from "../../Interfaces";
import { useToken } from "../../hooks/token.hook";

import { ReactComponent as CompletedIcon } from "../../assets/icons/completed.svg";

import "./itemInfo.scss";

export const ItemInfo = ({
  content,
  description,
  is_completed,
  id,
}: IViewComponent) => {
  const { items, completedItems, searchValue } = useAppSelector(
    (state) => state.items
  );
  const { valBtn } = useAppSelector((state) => state.isCompletedBtn);
  const { token } = useToken();
  const dispatch = useAppDispatch();

  /**
   * @param id -> item
   * @param value -> is completed or not
   * @Feture -> --cache request or create logic for filter items-- kinda done
   */
  const isCompletedClick = async (id: string, value: boolean) => {
    dispatch(toggleCompleteBtn({ id, value }));

    if (value) {
      console.log("close");
      const filterItems = items.filter((item) => item.id !== id);
      dispatch(setItems(filterItems));

      const getCompltedItem = items.filter((item) => item.id === id)[0];
      dispatch(toggleComplteItems({ isItem: false, data: getCompltedItem }));

      await fetch(`${import.meta.env.VITE_APP_BASE_URL}/tasks/${id}/close`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } else {
      const filterCompleted = completedItems.items.filter(
        (item) => item.id !== id
      );
      dispatch(updateCompletedItems(filterCompleted));

      const getItem = completedItems.items.filter((item) => item.id === id)[0];
      dispatch(
        toggleComplteItems({
          isItem: true,
          data: getItem,
        })
      );

      await fetch(`${import.meta.env.VITE_APP_BASE_URL}/tasks/${id}/reopen`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    }
  };

  const RenderHTML = (props: { HTML: string }) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const spilitMatchedText = (str: string, content: string) => {
    const regExp = new RegExp(str, "gi");
    return content.replace(
      regExp,
      (match) => `<span style="color: red;">${match}</span>`
    );
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
          <RenderHTML HTML={spilitMatchedText(searchValue, content)} />
          {/* {content} */}
        </p>
        <p
          className={classNames("sub-title", {
            "title-done": is_completed,
          })}
          style={{ marginTop: 4, lineHeight: "16px" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
