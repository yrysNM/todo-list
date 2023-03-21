import React, { useEffect } from "react";

import "./listItems.scss";

import { ReactComponent as CompletedIcon } from "../../assets/icons/completed.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { CustomButton } from "../CustomButton";

export const ListItems = () => {
  // const api = new TodoistApi(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/tasks`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
      },
    })
      .then((r) => r.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <div className="list">
      <div className="list-wrapper">
        <div className="item-info">
          <span className="completedCircle">
            <CompletedIcon className="icon" />
          </span>

          <div className="taskDescr">
            <p className="title">Read book</p>
            <p className="sub-title">Alhimik</p>
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
    </div>
  );
};
