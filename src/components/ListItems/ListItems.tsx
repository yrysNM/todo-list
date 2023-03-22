import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { ListItemsLayout } from "../layouts/ListItemsLayout";
import { ITodoistData, IViewComponent } from "../../Interfaces";
import { useHttp } from "../../hooks/http.hook";

import "./listItems.scss";

import { ReactComponent as CompletedIcon } from "../../assets/icons/completed.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { CustomButton } from "../CustomButton";

export const ListItems = () => {
  const [listItems, setListItems] = useState<ITodoistData[]>([]);
  const { request } = useHttp();

  useEffect(() => {
    request<ITodoistData[]>({
      url: `${process.env.REACT_APP_BASE_URL}/tasks`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
    }).then((r) => setListItems(r));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCompletedClick = (id: string, value: boolean) => {
    const updateItems = listItems.map((item) => {
      if (item.id === id) {
        item.is_completed = value;
        return { ...item };
      }
      return item;
    });

    setListItems(updateItems);

    // request<ITodoistData>({
    //   url: `${process.env.REACT_APP_BASE_URL}/tasks/${id}/close`,
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
    //     "Content-Type": "application/json",
    //   },
    // }).then((r) => console.log(r));
  };

  const ViewComponent = ({
    content,
    description,
    is_completed,
    id,
  }: IViewComponent): JSX.Element => {
    return (
      <div className="list-wrapper">
        <div className="item-info">
          <span
            className={classNames("completedCircle", {
              icon_completedActive: is_completed,
            })}
            onClick={() => isCompletedClick(id, !is_completed)}
          >
            <CompletedIcon className={classNames("icon")} />
          </span>

          <div className="taskDescr">
            <p className="title">{content}</p>
            <p className="sub-title">{description}</p>
          </div>
        </div>
        <div className="item-methods">
          <CustomButton
            clazz="btn-icon"
            type="button"
            onPressButton={() => console.log("edit")}
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
      </div>
    );
  };

  return (
    <div>
      {listItems.map((item) => (
        <ListItemsLayout key={item.id}>
          <ViewComponent
            content={item.content}
            description={item.description}
            is_completed={item.is_completed}
            id={item.id}
          />
        </ListItemsLayout>
      ))}
    </div>
  );
};
